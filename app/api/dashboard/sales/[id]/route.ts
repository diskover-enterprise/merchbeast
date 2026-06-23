import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function getOwnedSale(id: string, email: string) {
  const shop = await prisma.shop.findUnique({ where: { ownerEmail: email } })
  if (!shop) return null
  return prisma.shopSale.findFirst({ where: { id, shopId: shop.id } })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const sale = await getOwnedSale(id, session.user.email!)
  if (!sale) return Response.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()
  const updated = await prisma.shopSale.update({
    where: { id },
    data: { active: body.active },
  })
  return Response.json({ ...updated, productSlugs: JSON.parse(updated.productSlugs) })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const sale = await getOwnedSale(id, session.user.email!)
  if (!sale) return Response.json({ error: 'Not found' }, { status: 404 })

  await prisma.shopSale.delete({ where: { id } })
  return Response.json({ ok: true })
}
