import Stripe from 'stripe'

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
  const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60

  const [allSessions, recentSessions] = await Promise.all([
    stripe.checkout.sessions.list({ limit: 100, status: 'complete' }),
    stripe.checkout.sessions.list({ limit: 100, status: 'complete', created: { gte: thirtyDaysAgo } }),
  ])

  const totalOrders = allSessions.data.length
  const recentOrdersCount = recentSessions.data.length
  const totalRevenue = recentSessions.data.reduce((sum, s) => sum + (s.amount_total || 0), 0)

  // Daily revenue for last 7 days
  const dailyMap: Record<string, number> = {}
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    dailyMap[d.toISOString().split('T')[0]] = 0
  }
  for (const session of allSessions.data) {
    if (session.created >= sevenDaysAgo) {
      const key = new Date(session.created * 1000).toISOString().split('T')[0]
      if (key in dailyMap) dailyMap[key] += (session.amount_total || 0)
    }
  }
  const dailyRevenue = Object.entries(dailyMap).map(([date, revenue]) => ({ date, revenue }))

  // Top products from line items
  const productCounts: Record<string, { name: string; count: number }> = {}
  for (const session of allSessions.data) {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 })
    for (const item of lineItems.data) {
      const name = item.description || 'Unknown'
      if (!productCounts[name]) productCounts[name] = { name, count: 0 }
      productCounts[name].count += item.quantity || 1
    }
  }
  const topProducts = Object.values(productCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((p, i) => ({ id: String(i), name: p.name, soldCount: p.count }))

  return Response.json({ totalOrders, totalRevenue, recentOrdersCount, topProducts, dailyRevenue })
}
