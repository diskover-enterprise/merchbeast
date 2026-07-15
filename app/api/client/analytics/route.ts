import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const shopId = cookieStore.get('mb-client-auth')?.value
  if (!shopId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const shop = await prisma.shop.findUnique({ where: { id: shopId }, select: { id: true } })
  if (!shop) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const now = new Date()
  const d30 = new Date(now); d30.setDate(d30.getDate() - 30)
  const d7 = new Date(now); d7.setDate(d7.getDate() - 7)
  const today = new Date(now); today.setHours(0, 0, 0, 0)

  const [total, last30, last7, todayCount, topProducts, daily] = await Promise.all([
    prisma.pageView.count({ where: { shopId } }),
    prisma.pageView.count({ where: { shopId, createdAt: { gte: d30 } } }),
    prisma.pageView.count({ where: { shopId, createdAt: { gte: d7 } } }),
    prisma.pageView.count({ where: { shopId, createdAt: { gte: today } } }),
    prisma.pageView.groupBy({
      by: ['productSlug'],
      where: { shopId, productSlug: { not: null }, createdAt: { gte: d30 } },
      _count: { productSlug: true },
      orderBy: { _count: { productSlug: 'desc' } },
      take: 5,
    }),
    prisma.$queryRaw<{ day: string; count: bigint }[]>`
      SELECT DATE("createdAt") as day, COUNT(*) as count
      FROM "PageView"
      WHERE "shopId" = ${shopId}
        AND "createdAt" >= ${d30}
      GROUP BY DATE("createdAt")
      ORDER BY day ASC
    `,
  ])

  return NextResponse.json({
    total,
    last30,
    last7,
    today: todayCount,
    topProducts: topProducts.map(p => ({ slug: p.productSlug, views: p._count.productSlug })),
    daily: daily.map(d => ({ day: d.day, count: Number(d.count) })),
  })
}
