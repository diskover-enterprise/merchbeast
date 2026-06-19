import { prisma } from '@/lib/prisma'

export async function GET() {

  const shops = await prisma.shop.findMany({
    orderBy: { createdAt: 'asc' },
    select: {
      id: true, name: true, slug: true, ownerEmail: true,
      tagline: true, bannerImage: true, logo: true,
      primaryColor: true, accentColor: true,
      heroHeadline: true, about: true,
      instagram: true, websiteUrl: true,
    },
  })
  return Response.json(shops)
}
