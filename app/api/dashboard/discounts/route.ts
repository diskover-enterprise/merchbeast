import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getAuthSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const shop = await prisma.shop.findUnique({ where: { ownerEmail: session.user.email! } })
  if (!shop) return Response.json({ error: 'Shop not found' }, { status: 404 })

  const codes = await prisma.discountCode.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(codes)
}

export async function POST(request: Request) {
  const session = await getAuthSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const shop = await prisma.shop.findUnique({ where: { ownerEmail: session.user.email! } })
  if (!shop) return Response.json({ error: 'Shop not found' }, { status: 404 })

  const body = await request.json()
  const { code, type, value, minOrderAmount, maxUses, expiresAt } = body

  if (!code || !type || value == null) {
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
        shopId: shop.id,
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
