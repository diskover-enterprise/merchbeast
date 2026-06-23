import { prisma } from '@/lib/prisma'
import type { ActiveSale } from '@/lib/sale'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const shopSlug = searchParams.get('shopSlug')
  if (!shopSlug) return Response.json(null)

  const shop = await prisma.shop.findUnique({ where: { slug: shopSlug } })
  if (!shop) return Response.json(null)

  const sale = await prisma.shopSale.findFirst({
    where: { shopId: shop.id, active: true },
    orderBy: { createdAt: 'desc' },
  })

  if (!sale) return Response.json(null)

  const result: ActiveSale = {
    id: sale.id,
    name: sale.name,
    type: sale.type as 'percentage' | 'fixed',
    value: sale.value,
    scope: sale.scope as 'cart' | 'products',
    productSlugs: JSON.parse(sale.productSlugs || '[]'),
  }

  return Response.json(result)
}
