import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  const session = await getAuthSession()
  if (!session?.user?.restaurantId)
    return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const orders = await prisma.order.findMany({
    where: { restaurantId: session.user.restaurantId },
    include: {
      customer: true,
      items: { include: { product: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(
    orders.map((o) => ({
      ...o,
      items: o.items.map((i) => ({
        ...i,
        product: i.product
          ? { ...i.product, images: JSON.parse(i.product.images) }
          : null,
      })),
    }))
  )
}
