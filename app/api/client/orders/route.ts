import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const shopId = cookieStore.get('mb-client-auth')?.value
  if (!shopId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const db = prisma

  const orders = await db.order.findMany({
    where: { restaurantId: shopId },
    include: {
      customer: true,
      items: { include: { product: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(orders.map(o => ({
    id: o.id,
    customer: { name: o.customer.name, email: o.customer.email },
    items: o.items.map(i => ({ name: i.product.name, quantity: i.quantity, price: i.priceAtPurchase / 100 })),
    total: o.total / 100,
    status: o.status,
    createdAt: o.createdAt,
  })))
}
