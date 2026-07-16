import { prisma } from '@/lib/prisma'
import { sappertonProducts } from '@/app/products/sapperton-scrapper-products-data'

export async function POST() {
  let shop = await prisma.shop.findUnique({ where: { slug: 'sapperton-scrapper' } })
  if (!shop) {
    shop = await prisma.shop.create({
      data: {
        name: 'Sapperton Scrapper',
        slug: 'sapperton-scrapper',
        description: 'Boxing gym merch. Built for fighters, worn by everyone.',
        ownerEmail: 'sapperton@gmail.com',
        ownerPasswordHash: '',
        bannerImage: '/sapperton-hero-placeholder.jpg',
      },
    })
  } else {
    shop = await prisma.shop.update({
      where: { slug: 'sapperton-scrapper' },
      data: { bannerImage: '/sapperton-hero-placeholder.jpg' },
    })
  }

  let created = 0
  for (const p of sappertonProducts) {
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
