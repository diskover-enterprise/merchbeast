import { prisma } from '@/lib/prisma'
import { The1982Storefront } from '@/components/storefront/The1982Storefront'

export default async function The1982ShopPage() {
  const shop = await prisma.shop.findUnique({
    where: { slug: 'the-1982' },
    select: { bannerImage: true },
  })
  return <The1982Storefront heroImage={shop?.bannerImage ?? null} />
}
