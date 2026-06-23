import { prisma } from '@/lib/prisma'
import { The1982Storefront } from '@/components/storefront/The1982Storefront'
import { TrackView } from '@/components/storefront/TrackView'

export const revalidate = 0

export default async function The1982ShopPage() {
  const shop = await prisma.shop.findUnique({
    where: { slug: 'the-1982' },
    select: { id: true, bannerImage: true },
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
  const rawSale = shop ? await prisma.shopSale.findFirst({ where: { shopId: shop.id, active: true }, orderBy: { createdAt: 'desc' } }) : null
  const activeSale = rawSale ? { id: rawSale.id, name: rawSale.name, type: rawSale.type as 'percentage'|'fixed', value: rawSale.value, scope: rawSale.scope as 'cart'|'products', productSlugs: JSON.parse(rawSale.productSlugs||'[]') } : null
  return <>
    {shop && <TrackView shopId={shop.id} />}
    <The1982Storefront heroImage={shop?.bannerImage ?? null} dbProducts={dbProducts} activeSale={activeSale} />
  </>
}
