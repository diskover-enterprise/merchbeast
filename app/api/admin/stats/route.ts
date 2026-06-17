import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getAuthSession()
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [shops, orders] = await Promise.all([
    prisma.shop.findMany({
      select: { id: true, name: true },
    }),
    prisma.order.findMany({
      select: {
        id: true,
        shopId: true,
        total: true,
      },
    }),
  ])

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = orders.length
  const totalRestaurants = shops.length

  const revenueMap = new Map<string, { revenue: number; orderCount: number; name: string }>()
  for (const r of shops) {
    revenueMap.set(r.id, { revenue: 0, orderCount: 0, name: r.name })
  }
  for (const o of orders) {
    const entry = revenueMap.get(o.shopId)
    if (entry) {
      entry.revenue += o.total
      entry.orderCount += 1
    }
  }
  const revenueByRestaurant = Array.from(revenueMap.entries()).map(([shopId, data]) => ({
    shopId: shopId,
    name: data.name,
    revenue: data.revenue,
    orderCount: data.orderCount,
  }))

  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      customer: { select: { name: true, email: true } },
      shop: { select: { name: true, slug: true } },
      items: {
        include: {
          product: { select: { name: true } },
        },
      },
    },
  })

  // Remap shop to restaurant for UI compatibility
  const recentOrdersMapped = recentOrders.map((o) => ({
    ...o,
    restaurant: o.shop,
  }))

  return NextResponse.json({
    totalRevenue,
    totalOrders,
    totalRestaurants,
    revenueByRestaurant,
    recentOrders: recentOrdersMapped,
  })
}
