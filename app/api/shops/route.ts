import { prisma } from '@/lib/prisma'

export async function GET() {
  const shops = await prisma.shop.findMany({
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
  return Response.json(shops)
}
