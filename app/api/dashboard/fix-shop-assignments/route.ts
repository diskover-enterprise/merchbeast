import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  if (cookieStore.get('mb-dashboard-auth')?.value !== 'true') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const shops = await prisma.shop.findMany({ select: { id: true, slug: true, name: true } })
  const shopMap = Object.fromEntries(shops.map(s => [s.slug, s.id]))

  const results: Record<string, number> = {}

  // Reassign products based on their name prefix
  for (const [slug, id] of Object.entries(shopMap)) {
    let namePrefix = ''
    if (slug === 'lunch-lady') namePrefix = 'Lunch Lady'
    else if (slug === 'nomo-nomo') namePrefix = 'Nomo Nomo'
    else if (slug === 'the-1982') namePrefix = 'The 1982'
    else if (slug === 'boasty-collective') namePrefix = 'Boasty'
    if (!namePrefix) continue

    const result = await prisma.merchProduct.updateMany({
      where: { name: { startsWith: namePrefix } },
      data: { shopId: id },
    })
    results[slug] = result.count
  }

  return Response.json({ fixed: results, shops })
}
