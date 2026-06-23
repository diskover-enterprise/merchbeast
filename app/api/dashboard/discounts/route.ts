import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const shopId = searchParams.get('shopId')
  if (!shopId) return Response.json({ error: 'shopId required' }, { status: 400 })

  const codes = await prisma.discountCode.findMany({
    where: { shopId },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(codes)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { shopId, code, type, value, minOrderAmount, maxUses, expiresAt } = body

  if (!shopId || !code || !type || value == null) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!['percentage', 'fixed'].includes(type)) {
    return Response.json({ error: 'Invalid type' }, { status: 400 })
  }
  if (type === 'percentage' && (value < 1 || value > 100)) {
    return Response.json({ error: 'Percentage must be 1–100' }, { status: 400 })
  }

  try {
    const discount = await prisma.discountCode.create({
      data: {
        shopId,
        code: code.toUpperCase().trim(),
        type,
        value: Math.round(type === 'fixed' ? value * 100 : value),
        minOrderAmount: minOrderAmount ? Math.round(minOrderAmount * 100) : 0,
        maxUses: maxUses || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    })
    return Response.json(discount)
  } catch (e: any) {
    if (e.code === 'P2002') {
      return Response.json({ error: 'Code already exists for this shop' }, { status: 409 })
    }
    throw e
  }
}
