import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

function isAuth() {
  const store = cookies()
  return store.get('mb-dashboard-auth')?.value === 'true'
}

export async function GET() {
  if (!isAuth()) return Response.json({ error: 'Unauthorized' }, { status: 401 })

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
