import { prisma } from '@/lib/prisma'
import { NomoNomoStorefront } from '@/components/storefront/NomoNomoStorefront'
import { TrackView } from '@/components/storefront/TrackView'

export const dynamic = 'force-dynamic'

export default async function NomoNomoShopPage() {
  const shop = await prisma.shop.findUnique({
    where: { slug: 'nomo-nomo' },
    select: { id: true, bannerImage: true },
  })
  return <>
    {shop && <TrackView shopId={shop.id} />}
    <NomoNomoStorefront heroImage={shop?.bannerImage ?? null} />
  </>
}
