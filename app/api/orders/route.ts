import Stripe from 'stripe'

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const sessions = await stripe.checkout.sessions.list({ limit: 100, status: 'complete' })

  const orders = await Promise.all(
    sessions.data.map(async (session) => {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 })
      return {
        id: session.id,
        customer: {
          name: session.customer_details?.name || '—',
          email: session.customer_details?.email || '—',
        },
        items: lineItems.data.map((item) => ({
          product: { name: item.description },
          quantity: item.quantity,
        })),
        total: session.amount_total || 0,
        status: 'paid',
        createdAt: new Date(session.created * 1000).toISOString(),
      }
    })
  )

  return Response.json(orders)
}
