import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  if (cookieStore.get('mb-dashboard-auth')?.value !== 'true') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const products = await prisma.merchProduct.findMany({
    select: { id: true, name: true, shopId: true, active: true },
    orderBy: { name: 'asc' },
  })

  const shops = await prisma.shop.findMany({ select: { id: true, slug: true } })
  const shopMap = Object.fromEntries(shops.map(s => [s.id, s.slug]))

  return Response.json(products.map(p => ({
    name: p.name,
    shopId: p.shopId,
    shop: p.shopId ? (shopMap[p.shopId] || 'UNKNOWN') : 'NULL',
    active: p.active,
  })))
}
