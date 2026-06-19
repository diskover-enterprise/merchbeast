import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const shopId = searchParams.get('shopId')
  if (!shopId) return Response.json({ error: 'shopId required' }, { status: 400 })

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const [totalViews, last30Views, last7Views, productViews, orders] = await Promise.all([
    prisma.pageView.count({ where: { shopId, productSlug: null } }),
    prisma.pageView.count({ where: { shopId, productSlug: null, createdAt: { gte: thirtyDaysAgo } } }),
    prisma.pageView.count({ where: { shopId, productSlug: null, createdAt: { gte: sevenDaysAgo } } }),
    prisma.pageView.groupBy({
      by: ['productSlug'],
      where: { shopId, productSlug: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    }),
    prisma.order.findMany({
      where: { shopId },
      select: { total: true, createdAt: true, status: true },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0)
  const last30Revenue = orders.filter(o => o.status !== 'cancelled' && o.createdAt >= thirtyDaysAgo).reduce((sum, o) => sum + o.total, 0)

  return Response.json({
    shopViews: { total: totalViews, last30: last30Views, last7: last7Views },
    productViews: productViews.map(p => ({ slug: p.productSlug, count: p._count.id })),
    orders: { total: orders.length, last30: orders.filter(o => o.createdAt >= thirtyDaysAgo).length },
    revenue: { total: totalRevenue, last30: last30Revenue },
  })
}
