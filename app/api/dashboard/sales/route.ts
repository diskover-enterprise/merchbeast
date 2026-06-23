import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const shopId = searchParams.get('shopId')
  if (!shopId) return Response.json({ error: 'shopId required' }, { status: 400 })

  const sales = await prisma.shopSale.findMany({
    where: { shopId },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(sales.map(s => ({ ...s, productSlugs: JSON.parse(s.productSlugs || '[]') })))
}

export async function POST(request: Request) {
  const body = await request.json()
  const { shopId, name, type, value, scope, productSlugs } = body

  if (!shopId || !name || !type || value == null || !scope) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const sale = await prisma.shopSale.create({
    data: {
      shopId,
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
