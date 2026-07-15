import { prisma } from '@/lib/prisma'
import { barBravoProducts } from '@/app/products/bar-bravo-products-data'

export async function POST() {
  // Create or find the shop
  let shop = await prisma.shop.findUnique({ where: { slug: 'bar-bravo' } })
  if (!shop) {
    shop = await prisma.shop.create({
      data: {
        name: 'Bar Bravo',
        slug: 'bar-bravo',
        ownerEmail: 'hello@barbravo.com',
        commissionRate: 25,
        bannerImage: '/bar-bravo-hero.jpg',
      },
    })
  } else {
    shop = await prisma.shop.update({
      where: { slug: 'bar-bravo' },
      data: { bannerImage: '/bar-bravo-hero.jpg' },
    })
  }

  // Seed products
  let created = 0
  for (const p of barBravoProducts) {
    const existing = await prisma.merchProduct.findUnique({ where: { slug: p.slug } })
    if (existing) continue
    await prisma.merchProduct.create({
      data: {
        slug: p.slug,
        shopId: shop.id,
        name: p.name,
        description: p.description,
        price: p.price,
        images: JSON.stringify(p.images),
        sizes: JSON.stringify(p.sizes),
        colors: JSON.stringify(p.colors),
        tag: p.tag,
        active: true,
      },
    })
    created++
  }

  return Response.json({ ok: true, shopId: shop.id, productsCreated: created })
}
