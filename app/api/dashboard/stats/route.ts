import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  const session = await getAuthSession()
  if (!session?.user?.restaurantId)
    return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurantId = session.user.restaurantId
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [totalOrders, recentOrders, topProducts, weeklyRevenue] = await Promise.all([
    prisma.order.count({ where: { restaurantId } }),
    prisma.order.findMany({
      where: { restaurantId, createdAt: { gte: thirtyDaysAgo } },
      include: { items: { include: { product: true } } },
    }),
    prisma.orderItem.groupBy({
      by: ['productId'],
      where: { order: { restaurantId } },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    }),
    prisma.order.findMany({
      where: {
        restaurantId,
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      select: { total: true, createdAt: true },
    }),
  ])

  const totalRevenue = recentOrders.reduce((sum, o) => sum + o.total, 0)

  const productIds = topProducts.map((p) => p.productId)
  const productDetails = await prisma.product.findMany({
    where: { id: { in: productIds } },
  })

  const top = topProducts.map((p) => ({
    ...productDetails.find((d) => d.id === p.productId),
    soldCount: p._sum.quantity,
  }))

  const dailyMap: Record<string, number> = {}
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    dailyMap[d.toISOString().split('T')[0]] = 0
  }
  for (const order of weeklyRevenue) {
    const key = order.createdAt.toISOString().split('T')[0]
    if (key in dailyMap) dailyMap[key] += order.total
  }
  const dailyRevenue = Object.entries(dailyMap).map(([date, revenue]) => ({
    date,
    revenue,
  }))

  return Response.json({
    totalOrders,
    totalRevenue,
    recentOrdersCount: recentOrders.length,
    topProducts: top,
    dailyRevenue,
  })
}
