import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  if (cookieStore.get('mb-dashboard-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: {
      customer: true,
      shop: { select: { slug: true } },
      items: { include: { product: { select: { name: true } } } },
    },
  })

  return NextResponse.json(orders.map(o => ({
    id: o.id,
    customer: { name: o.customer.name, email: o.customer.email },
    items: o.items.map(i => ({
      product: { name: i.productName || i.product?.name || '—' },
      quantity: i.quantity,
      size: i.size,
      color: i.color,
    })),
    total: o.total,
    status: o.status,
    createdAt: o.createdAt.toISOString(),
    shopSlug: o.shop?.slug || '—',
    shippingAddress: o.shippingAddress,
  })))
}
