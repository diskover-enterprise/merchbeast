import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  const session = await getAuthSession()
  if (!session?.user?.restaurantId)
    return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const products = await prisma.product.findMany({
    where: { restaurantId: session.user.restaurantId },
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(products.map((p) => ({ ...p, images: JSON.parse(p.images) })))
}

export async function POST(req: Request) {
  const session = await getAuthSession()
  if (!session?.user?.restaurantId)
    return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const product = await prisma.product.create({
    data: {
      restaurantId: session.user.restaurantId,
      name: body.name,
      description: body.description,
      price: Math.round(parseFloat(body.price) * 100),
      images: JSON.stringify(body.images ?? []),
      category: body.category,
      stock: parseInt(body.stock ?? '0'),
    },
  })
  return Response.json({ ...product, images: JSON.parse(product.images) }, { status: 201 })
}
