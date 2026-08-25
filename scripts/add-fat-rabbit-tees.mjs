import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const shop = await prisma.shop.findUnique({ where: { slug: 'fat-rabbit' } })
  if (!shop) throw new Error('Fat Rabbit shop not found')

  const sizes = JSON.stringify(['S', 'M', 'L', 'XL', '2XL'])

  const tees = [
    {
      slug: 'fat-rabbit-sticky-toffee-pudding-tee-white',
      name: 'Sticky Toffee Pudding Tee — White',
      description: 'Comfort Colors heavyweight tee featuring the Fat Rabbit Sticky Toffee Pudding mascot graphic. Front chest logo, full back print.',
      price: '$60.00 CAD',
      images: JSON.stringify(['https://res.cloudinary.com/dwjvblzu9/image/upload/v1787290447/toffewhite_lgk1tw.png']),
      sizes,
      colors: JSON.stringify(['White']),
      tag: null,
    },
    {
      slug: 'fat-rabbit-sticky-toffee-pudding-tee-black',
      name: 'Sticky Toffee Pudding Tee — Black',
      description: 'Comfort Colors heavyweight tee featuring the Fat Rabbit Sticky Toffee Pudding mascot graphic. Front chest logo, full back print.',
      price: '$60.00 CAD',
      images: JSON.stringify(['https://res.cloudinary.com/dwjvblzu9/image/upload/v1787290447/toffeblack_sipvks.png']),
      sizes,
      colors: JSON.stringify(['Black']),
      tag: null,
    },
  ]

  for (const tee of tees) {
    const existing = await prisma.merchProduct.findFirst({ where: { slug: tee.slug } })
    if (existing) {
      await prisma.merchProduct.update({ where: { id: existing.id }, data: tee })
      console.log(`Updated: ${tee.name}`)
    } else {
      await prisma.merchProduct.create({ data: { shopId: shop.id, ...tee } })
      console.log(`Created: ${tee.name}`)
    }
  }

  console.log('Done.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
