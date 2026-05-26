import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

async function requireAdmin() {
  const session = await getAuthSession()
  if (session?.user?.role !== 'admin') return null
  return session
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      price: Math.round(parseFloat(body.price) * 100),
      images: JSON.stringify(body.images ?? []),
      category: body.category,
      stock: parseInt(body.stock ?? '0'),
    },
  })
  return Response.json({ ...product, images: JSON.parse(product.images) })
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.product.delete({ where: { id } })
  return Response.json({ success: true })
}
