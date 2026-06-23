import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function getOwnedDiscount(id: string, email: string) {
  const shop = await prisma.shop.findUnique({ where: { ownerEmail: email } })
  if (!shop) return null
  const discount = await prisma.discountCode.findFirst({ where: { id, shopId: shop.id } })
  return discount
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const discount = await getOwnedDiscount(id, session.user.email!)
  if (!discount) return Response.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()
  const updated = await prisma.discountCode.update({
    where: { id },
    data: { active: body.active },
  })
  return Response.json(updated)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const discount = await getOwnedDiscount(id, session.user.email!)
  if (!discount) return Response.json({ error: 'Not found' }, { status: 404 })

  await prisma.discountCode.delete({ where: { id } })
  return Response.json({ ok: true })
}
