import { prisma } from '@/lib/prisma'
import { NomoNomoStorefront } from '@/components/storefront/NomoNomoStorefront'

export const dynamic = 'force-dynamic'

export default async function NomoNomoShopPage() {
  const shop = await prisma.shop.findUnique({
    where: { slug: 'nomo-nomo' },
    select: { bannerImage: true },
  })
  return <NomoNomoStorefront heroImage={shop?.bannerImage ?? null} />
}
