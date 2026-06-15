import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const product = await prisma.merchProduct.update({
    where: { id: params.id },
    data: {
      name: body.name,
      description: body.description || '',
      price: body.price,
      images: JSON.stringify(body.images || []),
      sizes: JSON.stringify(body.sizes || []),
      colors: JSON.stringify(body.colors || []),
      tag: body.tag || null,
      active: body.active ?? true,
    },
  })
  return Response.json(deserialize(product))
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.merchProduct.delete({ where: { id: params.id } })
  return Response.json({ ok: true })
}

function deserialize(p: any) {
  return {
    ...p,
    images: JSON.parse(p.images || '[]'),
    sizes: JSON.parse(p.sizes || '[]'),
    colors: JSON.parse(p.colors || '[]'),
  }
}
