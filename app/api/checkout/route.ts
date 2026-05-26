import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { items, successUrl, cancelUrl, customerEmail } = await req.json() as {
    items: { productId: string; quantity: number }[]
    successUrl: string
    cancelUrl: string
    customerEmail?: string
  }

  if (!items?.length) {
    return Response.json({ error: 'Cart is empty' }, { status: 400 })
  }

  // Fetch authoritative prices from DB — never trust client-sent prices
  const productIds = items.map((i) => i.productId)
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    include: { restaurant: { select: { name: true } } },
  })

  if (products.length !== productIds.length) {
    return Response.json({ error: 'One or more products not found' }, { status: 400 })
  }

  const productMap = new Map(products.map((p) => [p.id, p]))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item) => {
      const product = productMap.get(item.productId)!
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: `From ${product.restaurant.name}`,
          },
          unit_amount: product.price, // already in cents
        },
        quantity: item.quantity,
      }
    }),
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    ...(customerEmail ? { customer_email: customerEmail } : {}),
    metadata: {
      cartItems: JSON.stringify(
        items.map((i) => ({
          productId: i.productId,
          restaurantId: productMap.get(i.productId)!.restaurantId,
          quantity: i.quantity,
          price: productMap.get(i.productId)!.price,
        }))
      ),
    },
  })

  return Response.json({ url: session.url })
}
