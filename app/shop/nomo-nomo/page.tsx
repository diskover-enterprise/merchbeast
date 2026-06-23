import { prisma } from '@/lib/prisma'
import { NomoNomoStorefront } from '@/components/storefront/NomoNomoStorefront'
import { TrackView } from '@/components/storefront/TrackView'

export const revalidate = 0

export default async function NomoNomoShopPage() {
  const shop = await prisma.shop.findUnique({
    where: { slug: 'nomo-nomo' },
    select: { id: true, bannerImage: true },
  })
  const rawSale = shop ? await prisma.shopSale.findFirst({ where: { shopId: shop.id, active: true }, orderBy: { createdAt: 'desc' } }) : null
  const activeSale = rawSale ? { id: rawSale.id, name: rawSale.name, type: rawSale.type as 'percentage'|'fixed', value: rawSale.value, scope: rawSale.scope as 'cart'|'products', productSlugs: JSON.parse(rawSale.productSlugs||'[]') } : null
  return <>
    {shop && <TrackView shopId={shop.id} />}
    <NomoNomoStorefront heroImage={shop?.bannerImage ?? null} activeSale={activeSale} />
  </>
}
