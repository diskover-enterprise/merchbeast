import { prisma } from '@/lib/prisma'
import { The1982Storefront } from '@/components/storefront/The1982Storefront'

export const dynamic = 'force-dynamic'

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
  return <The1982Storefront heroImage={shop?.bannerImage ?? null} dbProducts={dbProducts} />
}
