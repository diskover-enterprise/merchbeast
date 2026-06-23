import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const updated = await prisma.discountCode.update({
    where: { id },
    data: { active: body.active },
  })
  return Response.json(updated)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.discountCode.delete({ where: { id } })
  return Response.json({ ok: true })
}
