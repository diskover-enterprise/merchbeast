import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

async function requireAdmin() {
  const session = await getAuthSession()
  if (session?.user?.role !== 'admin') return null
  return session
}

export async function GET(req: Request) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const restaurantId = searchParams.get('restaurantId')
  if (!restaurantId) return Response.json({ error: 'restaurantId required' }, { status: 400 })

  const products = await prisma.product.findMany({
    where: { restaurantId },
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(products.map((p) => ({ ...p, images: JSON.parse(p.images) })))
}

export async function POST(req: Request) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  if (!body.restaurantId) return Response.json({ error: 'restaurantId required' }, { status: 400 })

  const product = await prisma.product.create({
    data: {
      restaurantId: body.restaurantId,
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
