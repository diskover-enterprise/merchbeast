import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const shopId = cookieStore.get('mb-client-auth')?.value
  if (!shopId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const order = await prisma.order.findUnique({ where: { id } })
  if (!order || order.shopId !== shopId) return Response.json({ error: 'Order not found' }, { status: 404 })
  if (!order.stripePaymentId) return Response.json({ error: 'No Stripe payment ID on this order' }, { status: 400 })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const sessions = await stripe.checkout.sessions.list({ payment_intent: order.stripePaymentId, limit: 1 })
  const session = sessions.data[0]
  if (!session) return Response.json({ error: 'Stripe session not found' }, { status: 404 })

  const shipping = session.shipping_details?.address
    ?? (session as any).collected_information?.shipping_details?.address
  if (!shipping) return Response.json({ error: 'No shipping address in Stripe session' }, { status: 404 })

  const shippingAddress = [shipping.line1, shipping.line2, shipping.city, shipping.state, shipping.postal_code, shipping.country]
    .filter(Boolean).join(', ')

  await prisma.order.update({ where: { id }, data: { shippingAddress } })

  return Response.json({ ok: true, shippingAddress })
}
