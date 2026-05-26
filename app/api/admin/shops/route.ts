import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getAuthSession()
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      orders: {
        select: { total: true },
      },
    },
  })

  const result = restaurants.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    ownerEmail: r.ownerEmail,
    createdAt: r.createdAt,
    orderCount: r.orders.length,
    revenue: r.orders.reduce((sum, o) => sum + o.total, 0),
  }))

  return NextResponse.json(result)
}
