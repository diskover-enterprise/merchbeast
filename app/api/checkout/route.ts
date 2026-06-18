import Stripe from 'stripe'
import { getProduct } from '@/app/products/products-data'
import { the1982Products } from '@/app/products/the1982-products-data'
import { nomoProducts } from '@/app/products/nomo-nomo-products-data'
import { boastyProducts } from '@/app/products/boasty-collective-products-data'

function findProduct(slug: string) {
  const main = getProduct(slug)
  if (main) return main
  return (
    the1982Products.find(p => p.slug === slug) ||
    nomoProducts.find(p => p.slug === slug) ||
    boastyProducts.find(p => p.slug === slug) ||
    null
  )
}

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const { items } = await request.json() as {
    items: { slug: string; quantity: number }[]
  }

  if (!items?.length) {
    return Response.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const resolvedItems = items.map((item) => {
    const product = findProduct(item.slug)
    if (!product) throw new Error(`Product not found: ${item.slug}`)
    const unitAmount = Math.round(parseFloat(product.price.replace(/[^0-9.]/g, '')) * 100)
    return { product, item, unitAmount }
  })

  const lineItems = resolvedItems.map(({ product, item, unitAmount }) => ({
    price_data: {
      currency: 'cad',
      product_data: {
        name: product.name,
        images: product.images.slice(0, 1),
      },
      unit_amount: unitAmount,
    },
    quantity: item.quantity,
  }))

  const origin = request.headers.get('origin') || request.headers.get('referer') || ''
  const baseUrl = origin
    ? new URL(origin).origin
    : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')

  const host = new URL(baseUrl).hostname
  const refererPath = request.headers.get('referer') || ''
  const shopSlug = host.startsWith('the1982.') ? 'the-1982'
    : host.startsWith('nomo-nomo.') ? 'nomo-nomo'
    : refererPath.includes('/shop/boasty-collective') ? 'boasty-collective'
    : refererPath.includes('/shop/nomo-nomo') ? 'nomo-nomo'
    : refererPath.includes('/shop/the-1982') ? 'the-1982'
    : 'lunch-lady'

  // Pass shop slug + item details as metadata so success page can create the DB order
  const cartMeta = resolvedItems.map(({ product, item, unitAmount }) => ({
    name: product.name,
    slug: item.slug,
    quantity: item.quantity,
    price: unitAmount,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&shop=${shopSlug}`,
    cancel_url: `${baseUrl}/cart`,
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 1000, currency: 'cad' },
          display_name: 'Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 10 },
          },
        },
      },
    ],
    metadata: {
      shopSlug,
      cartItems: JSON.stringify(cartMeta),
    },
  })

  return Response.json({ url: session.url })
}
