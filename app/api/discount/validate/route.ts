import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { code, shopSlug, orderTotal } = await request.json() as {
    code: string
    shopSlug: string
    orderTotal: number // in cents
  }

  if (!code || !shopSlug) {
    return Response.json({ error: 'Missing code or shop' }, { status: 400 })
  }

  const shop = await prisma.shop.findUnique({ where: { slug: shopSlug } })
  if (!shop) {
    return Response.json({ error: 'Shop not found' }, { status: 404 })
  }

  const discount = await prisma.discountCode.findUnique({
    where: { shopId_code: { shopId: shop.id, code: code.toUpperCase() } },
  })

  if (!discount || !discount.active) {
    return Response.json({ error: 'Invalid discount code' }, { status: 400 })
  }

  if (discount.expiresAt && discount.expiresAt < new Date()) {
    return Response.json({ error: 'Discount code has expired' }, { status: 400 })
  }

  if (discount.maxUses !== null && discount.usedCount >= discount.maxUses) {
    return Response.json({ error: 'Discount code has reached its usage limit' }, { status: 400 })
  }

  if (orderTotal < discount.minOrderAmount) {
    const minDollars = (discount.minOrderAmount / 100).toFixed(2)
    return Response.json({ error: `Minimum order of $${minDollars} required` }, { status: 400 })
  }

  let discountAmount = 0
  if (discount.type === 'percentage') {
    discountAmount = Math.round(orderTotal * discount.value / 100)
  } else {
    discountAmount = Math.min(discount.value, orderTotal)
  }

  return Response.json({
    valid: true,
    discountId: discount.id,
    type: discount.type,
    value: discount.value,
    discountAmount, // in cents
  })
}
