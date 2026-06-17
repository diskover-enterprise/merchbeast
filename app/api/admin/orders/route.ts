import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getAuthSession()
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const shopId = searchParams.get('restaurantId') ?? searchParams.get('shopId') ?? undefined

  const orders = await prisma.order.findMany({
    where: shopId ? { shopId } : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      customer: { select: { name: true, email: true } },
      shop: { select: { name: true, slug: true } },
      items: {
        include: {
          product: { select: { name: true } },
        },
      },
    },
  })

  // Remap shop to restaurant for UI compatibility
  const mapped = orders.map((o) => ({ ...o, restaurant: o.shop }))

  return NextResponse.json(mapped)
}
