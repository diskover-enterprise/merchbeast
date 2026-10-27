import { prisma } from '@/lib/prisma'
import { magariProducts, magariCategory, type MagariProduct } from '@/app/products/magari-products-data'

export const MAGARI_SLUG = 'magari'

// Order the board the way the restaurant wants it: hats first, then tee, then tote
const CATEGORY_ORDER = { hat: 0, tee: 1, tote: 2 } as const

/** Active dashboard products for Magari, or the launch lineup if none have been added yet. */
export async function loadMagari() {
  const shop = await prisma.shop
    .findUnique({ where: { slug: MAGARI_SLUG }, select: { id: true, bannerImage: true, metaPixelId: true, gtmId: true } })
    .catch(() => null)

  const rows = shop
    ? await prisma.merchProduct.findMany({
        where: { shopId: shop.id, active: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      })
    : []

  const products: MagariProduct[] = rows.length > 0
    ? rows.map(p => ({
        slug: p.slug, name: p.name, price: p.price, priceUsd: p.priceUsd,
        description: p.description,
        images: JSON.parse(p.images || '[]') as string[],
        sizes: JSON.parse(p.sizes || '[]') as string[],
        colors: JSON.parse(p.colors || '[]') as string[],
        tag: p.tag ?? '',
        category: magariCategory(p),
        stock: p.stock ?? null,
        path: `/shop/magari/products/${p.slug}`,
        shopifyUrl: '',
      }))
    : magariProducts

  products.sort((a, b) => CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category])
  return { shop, products }
}
