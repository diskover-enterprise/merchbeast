import { prisma } from '@/lib/prisma'

const FULFILLMENT_FEE_CENTS = 500 // $5.00 per order

export async function GET() {
  const shops = await prisma.shop.findMany({
    include: {
      orders: {
        include: { items: true },
      },
      commissions: { orderBy: { month: 'desc' } },
    },
  })

  const result = shops.map(shop => {
    type MonthData = { grossSales: number; totalCost: number; fulfillmentFees: number; restaurantPayout: number }
    const monthMap: Record<string, MonthData> = {}

    for (const order of shop.orders) {
      const month = order.createdAt.toISOString().slice(0, 7)
      if (!monthMap[month]) monthMap[month] = { grossSales: 0, totalCost: 0, fulfillmentFees: 0, restaurantPayout: 0 }

      // Sum item revenue and costs (excludes shipping — shipping stays with you)
      const itemRevenue = order.items.reduce((sum, i) => sum + i.priceAtPurchase * i.quantity, 0)
      const itemCost = order.items.reduce((sum, i) => sum + (i.costAtPurchase ?? 0) * i.quantity, 0)

      monthMap[month].grossSales += itemRevenue
      monthMap[month].totalCost += itemCost
      monthMap[month].fulfillmentFees += FULFILLMENT_FEE_CENTS
    }

    // Calculate restaurant payout per month
    for (const m of Object.values(monthMap)) {
      m.restaurantPayout = Math.max(0, m.grossSales - m.totalCost - m.fulfillmentFees)
    }

    const paymentMap = Object.fromEntries(shop.commissions.map(p => [p.month, p]))
    const months = Object.entries(monthMap)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([month, data]) => {
        const payment = paymentMap[month]
        return {
          month,
          grossSales: data.grossSales / 100,
          totalCost: data.totalCost / 100,
          fulfillmentFees: data.fulfillmentFees / 100,
          restaurantPayout: data.restaurantPayout / 100,
          // Legacy field for backward compat
          revenue: data.grossSales / 100,
          commission: data.restaurantPayout / 100,
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
  const { shopId, month, note } = await request.json()

  const existing = await prisma.commissionPayment.findFirst({
    where: { shopId, month },
  })

  const orders = await prisma.order.findMany({
    where: { shopId },
    include: { items: true },
  })
  const monthOrders = orders.filter(o => o.createdAt.toISOString().slice(0, 7) === month)
  const revenue = monthOrders.reduce((sum, o) => sum + o.total, 0)

  if (existing) {
    await prisma.commissionPayment.update({
      where: { id: existing.id },
      data: { paidAt: new Date(), note: note || null },
    })
  } else {
    await prisma.commissionPayment.create({
      data: { shopId, month, revenue, rate: 0, paidAt: new Date(), note: note || null },
    })
  }

  return Response.json({ ok: true })
}

// DELETE to unmark a payment
export async function DELETE(request: Request) {
  const { shopId, month } = await request.json()
  await prisma.commissionPayment.deleteMany({ where: { shopId, month } })
  return Response.json({ ok: true })
}
