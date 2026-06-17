import { prisma } from '@/lib/prisma'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const shop = await prisma.shop.findUnique({ where: { slug } })
  if (!shop) return Response.json({ error: 'Not found' }, { status: 404 })

  const products = await prisma.product.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: 'asc' },
  })

  return Response.json(
    products.map((p) => ({ ...p, images: JSON.parse(p.images) }))
  )
}
