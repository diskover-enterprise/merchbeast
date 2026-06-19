import { prisma } from '@/lib/prisma'
import { boastyProducts } from '@/app/products/boasty-collective-products-data'
import { the1982Products } from '@/app/products/the1982-products-data'
import { nomoProducts } from '@/app/products/nomo-nomo-products-data'

export async function POST() {
  const shops = await prisma.shop.findMany({ select: { id: true, slug: true } })
  const shopMap: Record<string, string> = {}
  shops.forEach(s => { shopMap[s.slug] = s.id })

  const allProducts = [
    ...boastyProducts.map(p => ({ ...p, shopSlug: 'boasty-collective' })),
    ...the1982Products.map(p => ({ ...p, shopSlug: 'the-1982' })),
    ...nomoProducts.map(p => ({ ...p, shopSlug: 'nomo-nomo' })),
  ]

  let created = 0
  let skipped = 0

  for (const p of allProducts) {
    const shopId = shopMap[p.shopSlug]
    if (!shopId) { skipped++; continue }

    const existing = await prisma.merchProduct.findUnique({ where: { slug: p.slug } })
    if (existing) {
      // Update shopId if missing
      if (!existing.shopId) {
        await prisma.merchProduct.update({ where: { slug: p.slug }, data: { shopId } })
      }
      skipped++
      continue
    }

    await prisma.merchProduct.create({
      data: {
        slug: p.slug,
        shopId,
        name: p.name,
        description: p.description,
        price: p.price,
        images: JSON.stringify(p.images || []),
        sizes: JSON.stringify(p.sizes || []),
        colors: JSON.stringify(p.colors || []),
        tag: p.category || null,
        active: true,
      },
    })
    created++
  }

  return Response.json({ ok: true, created, skipped, total: allProducts.length })
}
