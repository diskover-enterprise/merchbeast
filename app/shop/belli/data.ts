import { prisma } from '@/lib/prisma'
import { belliProducts, belliCategory, type BelliProduct } from '@/app/products/belli-products-data'

export const BELLI_SLUG = 'belli'

/** Active dashboard products for Belli, or the launch lineup if none have been added yet. */
export async function loadBelli() {
  const shop = await prisma.shop
    .findUnique({ where: { slug: BELLI_SLUG }, select: { id: true, metaPixelId: true, gtmId: true } })
    .catch(() => null)

  const rows = shop
    ? await prisma.merchProduct.findMany({
        where: { shopId: shop.id, active: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      })
    : []

  const products: BelliProduct[] = rows.length > 0
    ? rows.map(p => ({
        slug: p.slug, name: p.name, price: p.price, priceUsd: p.priceUsd,
        description: p.description,
        images: JSON.parse(p.images || '[]') as string[],
        sizes: JSON.parse(p.sizes || '[]') as string[],
        colors: JSON.parse(p.colors || '[]') as string[],
        tag: p.tag ?? '',
        category: belliCategory(p),
        stock: p.stock ?? null,
        path: `/shop/belli/products/${p.slug}`,
        shopifyUrl: '',
      }))
    : belliProducts

  return { shop, products }
}
