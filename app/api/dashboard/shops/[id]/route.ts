import { prisma } from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  const body = await req.json()

  const updated = await prisma.shop.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description ?? '',
      logo: body.logo || null,
      bannerImage: body.bannerImage || null,
      primaryColor: body.primaryColor,
      accentColor: body.accentColor,
      tagline: body.tagline || null,
      about: body.about || null,
      heroHeadline: body.heroHeadline || null,
      instagram: body.instagram || null,
      websiteUrl: body.websiteUrl || null,
    },
  })
  return Response.json(updated)
}
