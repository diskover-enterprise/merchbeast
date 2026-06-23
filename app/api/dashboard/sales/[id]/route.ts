import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const updated = await prisma.shopSale.update({
    where: { id },
    data: { active: body.active },
  })
  return Response.json({ ...updated, productSlugs: JSON.parse(updated.productSlugs) })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.shopSale.delete({ where: { id } })
  return Response.json({ ok: true })
}
