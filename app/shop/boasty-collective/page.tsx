import { prisma } from '@/lib/prisma'
import { BoastyCollectiveStorefront } from '@/components/storefront/BoastyCollectiveStorefront'
import { TrackView } from '@/components/storefront/TrackView'

export const revalidate = 0

export default async function BoastyCollectiveShopPage() {
  const shop = await prisma.shop.findUnique({
    where: { slug: 'boasty-collective' },
    select: { id: true, bannerImage: true, logo: true },
  })
  const rawProducts = shop ? await prisma.merchProduct.findMany({
    where: { shopId: shop.id, active: true },
    orderBy: { createdAt: 'asc' },
  }) : []
  const dbProducts = rawProducts.map(p => ({
    ...p,
    images: JSON.parse(p.images || '[]'),
    sizes: JSON.parse(p.sizes || '[]'),
    colors: JSON.parse(p.colors || '[]'),
  }))
  return <>
    {shop && <TrackView shopId={shop.id} />}
    <BoastyCollectiveStorefront heroImage={shop?.bannerImage ?? null} logo={shop?.logo ?? null} dbProducts={dbProducts} />
  </>
}
