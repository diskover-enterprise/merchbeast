import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const shopId = cookieStore.get('mb-client-auth')?.value
  if (!shopId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const db = new PrismaClient()

  const shop = await db.restaurant.findUnique({ where: { id: shopId } })
  if (!shop) return Response.json({ error: 'Not found' }, { status: 404 })

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [allOrders, recentOrders, products] = await Promise.all([
    db.order.findMany({ where: { restaurantId: shopId } }),
    db.order.findMany({ where: { restaurantId: shopId, createdAt: { gte: thirtyDaysAgo } } }),
    db.product.findMany({ where: { restaurantId: shopId } }),
  ])

  const totalOrders = allOrders.length
  const recentOrdersCount = recentOrders.length
  const totalRevenue = recentOrders.reduce((sum, o) => sum + o.total, 0) / 100

  return Response.json({ shopName: shop.name, totalOrders, recentOrdersCount, totalRevenue, productCount: products.length })
}
