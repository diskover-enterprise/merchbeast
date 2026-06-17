import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const shopId = cookieStore.get('mb-client-auth')?.value
  if (!shopId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  // Get all orders grouped by month
  const orders = await prisma.order.findMany({
    where: { shopId },
    orderBy: { createdAt: 'asc' },
  })

  // Get existing commission payment records
  const payments = await prisma.commissionPayment.findMany({
    where: { shopId },
    orderBy: { month: 'desc' },
  })

  // Group orders by month
  const monthMap: Record<string, number> = {}
  for (const order of orders) {
    const month = order.createdAt.toISOString().slice(0, 7) // "2026-06"
    monthMap[month] = (monthMap[month] || 0) + order.total
  }

  // Build commission rows
  const paymentMap = Object.fromEntries(payments.map(p => [p.month, p]))

  const months = Object.entries(monthMap)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([month, revenue]) => {
      const payment = paymentMap[month]
      const commission = Math.round(revenue * 0.25)
      return {
        month,
        revenue: revenue / 100,
        commission: commission / 100,
        rate: 0.25,
        paid: !!payment?.paidAt,
        paidAt: payment?.paidAt || null,
        note: payment?.note || null,
      }
    })

  return Response.json(months)
}
