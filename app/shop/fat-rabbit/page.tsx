import { prisma } from '@/lib/prisma'
import { FatRabbitStorefront } from '@/components/storefront/FatRabbitStorefront'
import { TrackView } from '@/components/storefront/TrackView'

export const revalidate = 60

export default async function FatRabbitShopPage() {
  const shop = await prisma.shop.findUnique({
    where: { slug: 'fat-rabbit' },
    select: { id: true, bannerImage: true },
  })

  const rawProducts = shop ? await prisma.merchProduct.findMany({
    where: { shopId: shop.id, active: true },
    orderBy: { createdAt: 'asc' },
  }) : []

  const dbProducts = rawProducts.map(p => ({
    slug: p.slug, name: p.name, price: p.price, description: p.description,
    images: JSON.parse(p.images || '[]') as string[],
    sizes: JSON.parse(p.sizes || '[]') as string[],
    colors: JSON.parse(p.colors || '[]') as string[],
    tag: p.tag, stock: p.stock ?? null,
  }))

  return <>
    {shop && <TrackView shopId={shop.id} />}
    <FatRabbitStorefront heroImage={shop?.bannerImage ?? null} dbProducts={dbProducts} />
  </>
}
