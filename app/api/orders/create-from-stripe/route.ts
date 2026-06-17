import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

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

  const cartItems: { name: string; slug: string; quantity: number; price: number }[] =
    JSON.parse(session.metadata?.cartItems ?? '[]')

  const email = session.customer_details?.email ?? 'unknown@unknown.com'
  const name = session.customer_details?.name ?? 'Guest'

  const customer = await prisma.customer.upsert({
    where: { email },
    update: {},
    create: { email, name },
  })

  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      shopId: shop.id,
      status: 'paid',
      total: session.amount_total ?? 0,
      stripePaymentId: paymentIntent,
      items: {
        create: cartItems.map(i => ({
          productName: i.name,
          quantity: i.quantity,
          priceAtPurchase: i.price,
        })),
      },
    },
  })

  return Response.json({ ok: true, orderId: order.id })
}
