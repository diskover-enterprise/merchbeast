import { prisma } from '@/lib/prisma'

// GET all commissions across all clients
export async function GET() {
  const shops = await prisma.restaurant.findMany({
    include: {
      orders: true,
      commissions: { orderBy: { month: 'desc' } },
    },
  })

  const result = shops.map(shop => {
    const monthMap: Record<string, number> = {}
    for (const order of shop.orders) {
      const month = order.createdAt.toISOString().slice(0, 7)
      monthMap[month] = (monthMap[month] || 0) + order.total
    }
    const paymentMap = Object.fromEntries(shop.commissions.map(p => [p.month, p]))
    const months = Object.entries(monthMap)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([month, revenue]) => {
        const payment = paymentMap[month]
        return {
          month,
          revenue: revenue / 100,
          commission: (revenue * 0.25) / 100,
          paid: !!payment?.paidAt,
          paidAt: payment?.paidAt || null,
          paymentId: payment?.id || null,
          note: payment?.note || null,
        }
      })
    return { shopId: shop.id, shopName: shop.name, months }
  }).filter(s => s.months.length > 0)

  return Response.json(result)
}

// POST to mark a month as paid
export async function POST(request: Request) {
  const { restaurantId, month, note } = await request.json()

  const existing = await prisma.commissionPayment.findFirst({
    where: { restaurantId, month },
  })

  // Get revenue for that month
  const orders = await prisma.order.findMany({ where: { restaurantId } })
  const revenue = orders
    .filter(o => o.createdAt.toISOString().slice(0, 7) === month)
    .reduce((sum, o) => sum + o.total, 0)

  if (existing) {
    await prisma.commissionPayment.update({
      where: { id: existing.id },
      data: { paidAt: new Date(), note: note || null },
    })
  } else {
    await prisma.commissionPayment.create({
      data: { restaurantId, month, revenue, rate: 0.25, paidAt: new Date(), note: note || null },
    })
  }

  return Response.json({ ok: true })
}

// DELETE to unmark a payment
export async function DELETE(request: Request) {
  const { restaurantId, month } = await request.json()
  await prisma.commissionPayment.deleteMany({ where: { restaurantId, month } })
  return Response.json({ ok: true })
}
