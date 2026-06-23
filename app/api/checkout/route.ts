import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { getProduct } from '@/app/products/products-data'
import { the1982Products } from '@/app/products/the1982-products-data'
import { nomoProducts } from '@/app/products/nomo-nomo-products-data'
import { boastyProducts } from '@/app/products/boasty-collective-products-data'

function findStaticProduct(slug: string) {
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
  const { items, discountCode, shopSlug: bodyShopSlug } = await request.json() as {
    items: { slug: string; quantity: number }[]
    discountCode?: string
    shopSlug?: string
  }

  if (!items?.length) {
    return Response.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const resolvedItems = await Promise.all(items.map(async (item) => {
    let name: string, price: string, images: string[]
    const staticProduct = findStaticProduct(item.slug)
    if (staticProduct) {
      name = staticProduct.name
      price = staticProduct.price
      images = staticProduct.images
    } else {
      const dbProduct = await prisma.merchProduct.findUnique({ where: { slug: item.slug } })
      if (!dbProduct) throw new Error(`Product not found: ${item.slug}`)
      name = dbProduct.name
      price = dbProduct.price
      images = JSON.parse(dbProduct.images || '[]') as string[]
    }
    const unitAmount = Math.round(parseFloat(price.replace(/[^0-9.]/g, '')) * 100)
    return { name, images, item, unitAmount }
  }))

  const lineItems = resolvedItems.map(({ name, images, item, unitAmount }) => ({
    price_data: {
      currency: 'cad',
      product_data: {
        name,
        images: images.slice(0, 1),
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
  const shopSlug = bodyShopSlug || (
    host.startsWith('the1982.') ? 'the-1982'
    : host.startsWith('nomo-nomo.') ? 'nomo-nomo'
    : refererPath.includes('/shop/boasty-collective') ? 'boasty-collective'
    : refererPath.includes('/shop/nomo-nomo') ? 'nomo-nomo'
    : refererPath.includes('/shop/the-1982') ? 'the-1982'
    : 'lunch-lady'
  )

  // Validate and apply discount code
  let discountAmountCents = 0
  let discountId: string | null = null
  if (discountCode) {
    const orderTotalCents = resolvedItems.reduce((sum, { item, unitAmount }) => sum + unitAmount * item.quantity, 0)
    const shop = await prisma.shop.findUnique({ where: { slug: shopSlug } })
    if (shop) {
      const discount = await prisma.discountCode.findUnique({
        where: { shopId_code: { shopId: shop.id, code: discountCode.toUpperCase() } },
      })
      if (discount && discount.active &&
        (!discount.expiresAt || discount.expiresAt > new Date()) &&
        (discount.maxUses === null || discount.usedCount < discount.maxUses) &&
        orderTotalCents >= discount.minOrderAmount) {
        discountId = discount.id
        discountAmountCents = discount.type === 'percentage'
          ? Math.round(orderTotalCents * discount.value / 100)
          : Math.min(discount.value, orderTotalCents)
      }
    }
  }

  // If discount applies, add a negative line item
  const finalLineItems = [...lineItems]
  if (discountAmountCents > 0) {
    finalLineItems.push({
      price_data: {
        currency: 'cad',
        product_data: { name: `Discount (${discountCode!.toUpperCase()})`, images: [] },
        unit_amount: -discountAmountCents,
      },
      quantity: 1,
    })
  }

  // Pass shop slug + item details as metadata so success page can create the DB order
  const cartMeta = resolvedItems.map(({ name, item, unitAmount }) => ({
    name,
    slug: item.slug,
    quantity: item.quantity,
    price: unitAmount,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: finalLineItems,
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
      ...(discountId ? { discountId } : {}),
    },
  })

  // Increment usage count
  if (discountId) {
    await prisma.discountCode.update({
      where: { id: discountId },
      data: { usedCount: { increment: 1 } },
    })
  }

  return Response.json({ url: session.url })
}
