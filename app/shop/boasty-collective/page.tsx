import { prisma } from '@/lib/prisma'
import { BoastyCollectiveStorefront } from '@/components/storefront/BoastyCollectiveStorefront'

export default async function BoastyCollectiveShopPage() {
  const shop = await prisma.shop.findUnique({
    where: { slug: 'boasty-collective' },
    select: { bannerImage: true },
  })
  return <BoastyCollectiveStorefront heroImage={shop?.bannerImage ?? null} />
}
