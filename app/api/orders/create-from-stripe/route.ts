import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { buildOrderConfirmationEmail } from '@/emails/orderConfirmation'
import { buildNewOrderEmail } from '@/emails/newOrderNotification'

export async function POST(req: Request) {
  const { sessionId } = await req.json()
  if (!sessionId) return Response.json({ error: 'Missing sessionId' }, { status: 400 })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status !== 'paid') {
    return Response.json({ error: 'Payment not completed' }, { status: 400 })
  }

  const paymentIntent = session.payment_intent as string

  // Idempotent — don't duplicate
  const existing = await prisma.order.findFirst({ where: { stripePaymentId: paymentIntent } })
  if (existing) return Response.json({ ok: true, orderId: existing.id })

  const shopSlug = session.metadata?.shopSlug
  if (!shopSlug) return Response.json({ error: 'No shop in session' }, { status: 400 })

  const shop = await prisma.shop.findUnique({ where: { slug: shopSlug } })
  if (!shop) return Response.json({ error: `Shop not found: ${shopSlug}` }, { status: 404 })

  const cartItems: { name: string; slug: string; quantity: number; price: number; size?: string | null; color?: string | null }[] =
    JSON.parse(session.metadata?.cartItems ?? '[]')

  const email = session.customer_details?.email ?? 'unknown@unknown.com'
  const name = session.customer_details?.name ?? 'Guest'

  const customer = await prisma.customer.upsert({
    where: { email },
    update: {},
    create: { email, name },
  })

  const shipping = session.shipping_details?.address
  const shippingAddress = shipping
    ? [shipping.line1, shipping.line2, shipping.city, shipping.state, shipping.postal_code, shipping.country].filter(Boolean).join(', ')
    : null

  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      shopId: shop.id,
      status: 'paid',
      total: session.amount_total ?? 0,
      stripePaymentId: paymentIntent,
      shippingAddress,
      items: {
        create: cartItems.map(i => ({
          productName: i.name,
          quantity: i.quantity,
          priceAtPurchase: i.price,
          size: i.size ?? null,
          color: i.color ?? null,
        })),
      },
    },
  })

  const emailItems = cartItems.map(i => ({ name: i.name, quantity: i.quantity, priceAtPurchase: i.price }))

  // Customer confirmation email
  if (email && email !== 'unknown@unknown.com') {
    const { subject, html } = buildOrderConfirmationEmail({
      customerName: name,
      restaurantName: shop.name,
      items: emailItems,
      total: session.amount_total ?? 0,
      orderId: order.id,
    })
    resend.emails.send({
      from: `Merch Beast <orders@${process.env.RESEND_FROM_DOMAIN ?? 'resend.dev'}>`,
      to: email,
      subject,
      html,
    }).catch(console.error)
  }

  // Team notification email
  const { subject: teamSubject, html: teamHtml } = buildNewOrderEmail({
    restaurantName: shop.name,
    customerName: name,
    customerEmail: email,
    items: emailItems,
    total: session.amount_total ?? 0,
    orderId: order.id,
  })
  resend.emails.send({
    from: `Merch Beast <orders@${process.env.RESEND_FROM_DOMAIN ?? 'resend.dev'}>`,
    to: 'team@merchbeast.shop',
    subject: teamSubject,
    html: teamHtml,
  }).catch(console.error)

  // Shop owner notification email
  const { subject: ownerSubject, html: ownerHtml } = buildNewOrderEmail({
    restaurantName: shop.name,
    customerName: name,
    customerEmail: email,
    items: emailItems,
    total: session.amount_total ?? 0,
    orderId: order.id,
  })
  resend.emails.send({
    from: `Merch Beast <orders@${process.env.RESEND_FROM_DOMAIN ?? 'resend.dev'}>`,
    to: shop.ownerEmail,
    subject: ownerSubject,
    html: ownerHtml,
  }).catch(console.error)

  return Response.json({ ok: true, orderId: order.id })
}
