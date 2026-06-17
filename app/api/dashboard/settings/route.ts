import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  const session = await getAuthSession()
  if (!session?.user?.shopId)
    return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const shop = await prisma.shop.findUnique({
    where: { id: session.user.shopId },
    select: {
      id: true, name: true, slug: true, description: true,
      logo: true, bannerImage: true, primaryColor: true,
      secondaryColor: true, accentColor: true, fontFamily: true,
      tagline: true, about: true, heroHeadline: true,
      instagram: true, websiteUrl: true, address: true,
    },
  })
  return Response.json(shop)
}

export async function PUT(req: Request) {
  const session = await getAuthSession()
  if (!session?.user?.shopId)
    return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const updated = await prisma.shop.update({
    where: { id: session.user.shopId },
    data: {
      name: body.name,
      description: body.description,
      logo: body.logo,
      bannerImage: body.bannerImage,
      primaryColor: body.primaryColor,
      secondaryColor: body.secondaryColor,
      accentColor: body.accentColor,
      fontFamily: body.fontFamily,
      tagline: body.tagline ?? null,
      about: body.about ?? null,
      heroHeadline: body.heroHeadline ?? null,
      instagram: body.instagram ?? null,
      websiteUrl: body.websiteUrl ?? null,
      address: body.address ?? null,
    },
  })
  return Response.json(updated)
}
