import { prisma } from '@/lib/prisma'
import { littleFlowerProducts, type LittleFlowerProduct } from '@/app/products/little-flower-products-data'

export const LITTLE_FLOWER_SLUG = 'little-flower'

/** Active dashboard products for LFA Merch Shop, or the launch lineup if none have been added yet. */
export async function loadLittleFlower() {
  const shop = await prisma.shop
    .findUnique({ where: { slug: LITTLE_FLOWER_SLUG }, select: { id: true, bannerImage: true, metaPixelId: true, gtmId: true } })
    .catch(() => null)

  const rows = shop
    ? await prisma.merchProduct.findMany({
        where: { shopId: shop.id, active: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      })
    : []

  const products: LittleFlowerProduct[] = rows.length > 0
    ? rows.map(p => ({
        slug: p.slug, name: p.name, price: p.price, priceUsd: p.priceUsd,
        description: p.description,
        images: JSON.parse(p.images || '[]') as string[],
        sizes: JSON.parse(p.sizes || '[]') as string[],
        colors: JSON.parse(p.colors || '[]') as string[],
        tag: p.tag ?? '',
        stock: p.stock ?? null,
        path: `/shop/little-flower/products/${p.slug}`,
        shopifyUrl: '',
      }))
    : littleFlowerProducts

  return { shop, products }
}
