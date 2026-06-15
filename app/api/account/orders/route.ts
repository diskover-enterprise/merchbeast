import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  const session = await getAuthSession()
  if (!session?.user?.customerId || session.user.role !== 'customer') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const orders = await prisma.order.findMany({
    where: { customerId: session.user.customerId },
    include: {
      restaurant: { select: { name: true, slug: true, primaryColor: true, accentColor: true } },
      items: {
        include: { product: { select: { name: true, images: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Response.json(
    orders.map((o: any) => ({
      ...o,
      items: o.items.map((i: any) => ({
        ...i,
        product: i.product ? { ...i.product, images: JSON.parse(i.product.images) } : null,
      })),
    }))
  )
}
