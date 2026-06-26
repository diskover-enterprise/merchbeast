import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  if (cookieStore.get('mb-dashboard-auth')?.value !== 'true') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const shop = await prisma.shop.findUnique({ where: { slug: 'nomo-nomo' } })
  if (!shop) return Response.json({ error: 'Shop not found' }, { status: 404 })

  const result = await prisma.merchProduct.updateMany({
    where: { shopId: shop.id },
    data: { active: false },
  })

  return Response.json({ deactivated: result.count })
}
