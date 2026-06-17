import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()
  const { items, customerEmail, customerName, stripePaymentId } = body as {
    items: { productId: string; shopId: string; quantity: number }[]
    customerEmail: string
    customerName: string
    stripePaymentId: string
  }

  if (!items?.length || !customerEmail || !customerName) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Look up authoritative prices from DB
  const productIds = items.map((i) => i.productId)
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  })
  if (products.length !== productIds.length) {
    return Response.json({ error: 'One or more products not found' }, { status: 400 })
  }
  const productMap = new Map(products.map((p) => [p.id, p]))

  // Verify each item's shopId matches the product's actual shopId
  for (const item of items) {
    const product = productMap.get(item.productId)
    if (!product || product.shopId !== item.shopId) {
      return Response.json({ error: 'Product/shop mismatch' }, { status: 400 })
    }
  }

  const customer = await prisma.customer.upsert({
    where: { email: customerEmail },
    update: { name: customerName },
    create: { email: customerEmail, name: customerName },
  })

  const shopGroups = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.shopId]) acc[item.shopId] = []
    acc[item.shopId].push(item)
    return acc
  }, {})

  const orders = []
  for (const [shopId, groupItems] of Object.entries(shopGroups)) {
    const total = groupItems.reduce((sum, i) => {
      return sum + productMap.get(i.productId)!.price * i.quantity
    }, 0)

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        shopId,
        status: 'paid',
        total,
        stripePaymentId,
        items: {
          create: groupItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            priceAtPurchase: productMap.get(i.productId)!.price,
          })),
        },
      },
    })
    orders.push(order)
  }

  return Response.json({ orders }, { status: 201 })
}
