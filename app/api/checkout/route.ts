import Stripe from 'stripe'
import { getProduct } from '@/app/products/products-data'

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const { items } = await request.json() as {
    items: { slug: string; quantity: number }[]
  }

  if (!items?.length) {
    return Response.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const lineItems = items.map((item) => {
    const product = getProduct(item.slug)
    if (!product) throw new Error(`Product not found: ${item.slug}`)
    const unitAmount = Math.round(parseFloat(product.price.replace(/[^0-9.]/g, '')) * 100)
    return {
      price_data: {
        currency: 'cad',
        product_data: {
          name: product.name,
          images: product.images.slice(0, 1),
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity,
    }
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cart`,
  })

  return Response.json({ url: session.url })
}
