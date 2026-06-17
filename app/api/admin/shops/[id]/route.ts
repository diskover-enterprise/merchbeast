import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

async function requireAdmin() {
  const session = await getAuthSession()
  if (session?.user?.role !== 'admin') return null
  return session
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const shop = await prisma.shop.findUnique({
    where: { id },
    select: {
      id: true, name: true, slug: true, ownerEmail: true,
      description: true, logo: true, bannerImage: true,
      primaryColor: true, secondaryColor: true, accentColor: true,
      fontFamily: true, tagline: true, about: true, heroHeadline: true,
      instagram: true, websiteUrl: true, address: true,
    },
  })
  if (!shop) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(shop)
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const updated = await prisma.shop.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      logo: body.logo || null,
      bannerImage: body.bannerImage || null,
      primaryColor: body.primaryColor,
      secondaryColor: body.secondaryColor,
      accentColor: body.accentColor,
      fontFamily: body.fontFamily,
      tagline: body.tagline || null,
      about: body.about || null,
      heroHeadline: body.heroHeadline || null,
      instagram: body.instagram || null,
      websiteUrl: body.websiteUrl || null,
      address: body.address || null,
    },
  })
  return Response.json(updated)
}
