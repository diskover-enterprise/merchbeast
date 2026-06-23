import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getAuthSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const shop = await prisma.shop.findUnique({ where: { ownerEmail: session.user.email! } })
  if (!shop) return Response.json({ error: 'Shop not found' }, { status: 404 })

  const sales = await prisma.shopSale.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(sales.map(s => ({ ...s, productSlugs: JSON.parse(s.productSlugs || '[]') })))
}

export async function POST(request: Request) {
  const session = await getAuthSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const shop = await prisma.shop.findUnique({ where: { ownerEmail: session.user.email! } })
  if (!shop) return Response.json({ error: 'Shop not found' }, { status: 404 })

  const body = await request.json()
  const { name, type, value, scope, productSlugs } = body

  if (!name || !type || value == null || !scope) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const sale = await prisma.shopSale.create({
    data: {
      shopId: shop.id,
      name,
      type,
      value: Math.round(type === 'fixed' ? value * 100 : value),
      scope,
      productSlugs: JSON.stringify(productSlugs || []),
      active: false,
    },
  })

  return Response.json({ ...sale, productSlugs: JSON.parse(sale.productSlugs) })
}
