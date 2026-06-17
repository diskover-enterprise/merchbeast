import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { buildOrderConfirmationEmail } from '@/emails/orderConfirmation'
import { buildNewOrderEmail } from '@/emails/newOrderNotification'

export async function POST(req: Request) {
  const { sessionId, customerName } = await req.json()
  if (!sessionId) return Response.json({ error: 'Missing session ID' }, { status: 400 })

  const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
  if (stripeSession.payment_status !== 'paid') {
    return Response.json({ error: 'Payment not completed' }, { status: 400 })
  }

  // Idempotency: don't create duplicate orders for the same Stripe session
  const existing = await prisma.order.findFirst({
    where: { stripePaymentId: stripeSession.payment_intent as string },
  })
  if (existing) return Response.json({ alreadyCreated: true, orderId: existing.id })

  const cartItems: { productId: string; shopId: string; quantity: number; price: number }[] =
    JSON.parse(stripeSession.metadata?.cartItems ?? '[]')

  if (!cartItems.length) return Response.json({ error: 'No items in session' }, { status: 400 })

  const email = stripeSession.customer_details?.email ?? ''
  const name = customerName || stripeSession.customer_details?.name || 'Guest'

  const customer = await prisma.customer.upsert({
    where: { email },
    update: {},
    create: { email, name },
  })

  const shopGroups = cartItems.reduce<Record<string, typeof cartItems>>((acc, item) => {
    if (!acc[item.shopId]) acc[item.shopId] = []
    acc[item.shopId].push(item)
    return acc
  }, {})

  const orders = []
  for (const [shopId, groupItems] of Object.entries(shopGroups)) {
    // Use Stripe's amount_total (in cents) as the authoritative total
    const total = stripeSession.amount_total ?? groupItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        shopId,
        status: 'paid',
        total,
        stripePaymentId: stripeSession.payment_intent as string,
        items: {
          create: groupItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            priceAtPurchase: i.price,
          })),
        },
      },
      include: { items: { include: { product: true } }, shop: true },
    })
    orders.push(order)

    if (email) {
      const { subject, html } = buildOrderConfirmationEmail({
        customerName: name,
        restaurantName: order.shop.name,
        items: order.items.map((i) => ({
          name: i.product?.name ?? 'Item',
          quantity: i.quantity,
          priceAtPurchase: i.priceAtPurchase,
        })),
        total: order.total,
        orderId: order.id,
      })
      resend.emails.send({
        from: 'MerchMarket <orders@' + (process.env.RESEND_FROM_DOMAIN ?? 'resend.dev') + '>',
        to: email,
        subject,
        html,
      }).catch(console.error)
    }

    // Notify the shop owner
    const { subject: ownerSubject, html: ownerHtml } = buildNewOrderEmail({
      restaurantName: order.shop.name,
      customerName: name,
      customerEmail: email,
      items: order.items.map((i) => ({
        name: i.product?.name ?? 'Item',
        quantity: i.quantity,
        priceAtPurchase: i.priceAtPurchase,
      })),
      total: order.total,
      orderId: order.id,
    })
    resend.emails.send({
      from: 'MerchMarket <orders@' + (process.env.RESEND_FROM_DOMAIN ?? 'resend.dev') + '>',
      to: order.shop.ownerEmail,
      subject: ownerSubject,
      html: ownerHtml,
    }).catch(console.error)
  }

  return Response.json({ orders, customerId: customer.id })
}
