import { prisma } from '@/lib/prisma'

function getDB() {
  return prisma
}

function deserialize(p: any) {
  return {
    ...p,
    images: JSON.parse(p.images || '[]'),
    sizes: JSON.parse(p.sizes || '[]'),
    colors: JSON.parse(p.colors || '[]'),
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = getDB()
  const { id } = await params
  const body = await request.json()
  const product = await db.merchProduct.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description || '',
      price: body.price,
      images: JSON.stringify(body.images || []),
      sizes: JSON.stringify(body.sizes || []),
      colors: JSON.stringify(body.colors || []),
      tag: body.tag || null,
      active: body.active ?? true,
      stock: body.stock != null && body.stock !== '' ? Number(body.stock) : null,
    },
  })
  return Response.json(deserialize(product))
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = getDB()
  const { id } = await params
  await db.merchProduct.delete({ where: { id } })
  return Response.json({ ok: true })
}
