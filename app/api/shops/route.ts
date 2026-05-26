import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      logo: true,
      bannerImage: true,
      primaryColor: true,
      secondaryColor: true,
      accentColor: true,
      fontFamily: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  })
  return Response.json(restaurants)
}
