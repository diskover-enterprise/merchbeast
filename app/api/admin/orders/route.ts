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
  const restaurantId = searchParams.get('restaurantId') ?? undefined

  const orders = await prisma.order.findMany({
    where: restaurantId ? { restaurantId } : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      customer: { select: { name: true, email: true } },
      restaurant: { select: { name: true, slug: true } },
      items: {
        include: {
          product: { select: { name: true } },
        },
      },
    },
  })

  return NextResponse.json(orders)
}
