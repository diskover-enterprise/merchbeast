import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { buildNewOrderEmail } from '@/emails/newOrderNotification'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  if (cookieStore.get('mb-dashboard-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      shop: true,
      items: true,
    },
  })
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  const items = order.items.map(i => ({
    name: i.productName ?? 'Item',
    quantity: i.quantity,
    priceAtPurchase: i.priceAtPurchase,
  }))

  const { subject, html } = buildNewOrderEmail({
    restaurantName: order.shop.name,
    customerName: order.customer.name,
    customerEmail: order.customer.email,
    items,
    total: order.total,
    orderId: order.id,
  })

  const results = await Promise.allSettled([
    resend.emails.send({
      from: `Merch Beast <orders@${process.env.RESEND_FROM_DOMAIN ?? 'resend.dev'}>`,
      to: 'team@merchbeast.shop',
      subject,
      html,
    }),
    resend.emails.send({
      from: `Merch Beast <orders@${process.env.RESEND_FROM_DOMAIN ?? 'resend.dev'}>`,
      to: order.shop.ownerEmail,
      subject,
      html,
    }),
  ])

  const errors = results
    .filter(r => r.status === 'rejected')
    .map(r => (r as PromiseRejectedResult).reason?.message ?? 'Unknown error')

  if (errors.length) {
    return NextResponse.json({ ok: false, errors }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
