import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

function isAuth() {
  const store = cookies()
  return store.get('mb-dashboard-auth')?.value === 'true'
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuth()) return Response.json({ error: 'Unauthorized' }, { status: 401 })

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
