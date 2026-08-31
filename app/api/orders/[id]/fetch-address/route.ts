import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  if (cookieStore.get('mb-dashboard-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const order = await prisma.order.findUnique({ where: { id } })
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (!order.stripePaymentId) return NextResponse.json({ error: 'No Stripe payment ID on this order' }, { status: 400 })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  // Find the checkout session by payment intent
  const sessions = await stripe.checkout.sessions.list({ payment_intent: order.stripePaymentId, limit: 1 })
  const session = sessions.data[0]
  if (!session) return NextResponse.json({ error: 'Stripe session not found' }, { status: 404 })

  const shipping = session.shipping_details?.address
    ?? (session as any).collected_information?.shipping_details?.address
  if (!shipping) return NextResponse.json({ error: 'No shipping address in Stripe session' }, { status: 404 })

  const shippingAddress = [
    shipping.line1,
    shipping.line2,
    shipping.city,
    shipping.state,
    shipping.postal_code,
    shipping.country,
  ].filter(Boolean).join(', ')

  await prisma.order.update({
    where: { id },
    data: { shippingAddress },
  })

  return NextResponse.json({ ok: true, shippingAddress })
}
