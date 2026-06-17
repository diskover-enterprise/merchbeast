import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0])

const U = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&auto=format&fit=crop&q=80`

async function main() {
  const existing = await prisma.shop.findUnique({ where: { slug: 'quazar-arcade' } })
  if (existing) {
    console.log('Quazar Arcade already exists — deleting and recreating...')
    await prisma.orderItem.deleteMany({ where: { order: { shopId: existing.id } } })
    await prisma.order.deleteMany({ where: { shopId: existing.id } })
    await prisma.product.deleteMany({ where: { shopId: existing.id } })
    await prisma.shop.delete({ where: { id: existing.id } })
  }

  const restaurant = await prisma.shop.create({
    data: {
      name: 'Quazar Arcade',
      slug: 'quazar-arcade',
      description: 'Retro arcade vibes meet neon-soaked streetwear. Stack coins, smash records, wear the culture.',
      primaryColor: '#08051a',
      secondaryColor: '#f5f0ff',
      accentColor: '#FF2E9A',
      fontFamily: 'Press Start 2P',
      ownerEmail: 'owner@quazar-arcade.com',
      ownerPasswordHash: bcrypt.hashSync('password123', 10),
      bannerImage: U('1511882639-86977afa-b044-4a0a-84b4-8eb4a640f7bb', 1400, 600),
      logo: U('1578632767-0f6e29be-8dd9-4e80-8ff9-2a0a4bd77bc9', 200, 200),
    },
  })

  const products = await Promise.all([
    prisma.product.create({ data: {
      shopId: restaurant.id,
      name: 'Neon Nights Hoodie',
      description: 'Oversized black hoodie with neon pink arcade graphic print. Garment-washed finish.',
      price: 8800,
      images: JSON.stringify([U('1556821840-3a63f8550206')]),
      category: 'Apparel',
      stock: 40,
    }}),
    prisma.product.create({ data: {
      shopId: restaurant.id,
      name: 'High Score Tee',
      description: '100% cotton heavyweight tee. Pixel art scoreboard graphic on the back.',
      price: 4200,
      images: JSON.stringify([U('1503341504253-dff4815485f1')]),
      category: 'Apparel',
      stock: 60,
    }}),
    prisma.product.create({ data: {
      shopId: restaurant.id,
      name: 'Player 1 Snapback',
      description: 'Black structured 6-panel cap with embroidered neon pink "P1" logo.',
      price: 3200,
      images: JSON.stringify([U('1588850561407-ed78c282e89b')]),
      category: 'Headwear',
      stock: 50,
    }}),
    prisma.product.create({ data: {
      shopId: restaurant.id,
      name: 'Arcade Token Keychain',
      description: 'Die-cast metal token with Quazar logo. Comes on a heavy-gauge keyring.',
      price: 1200,
      images: JSON.stringify([U('1535303291-63be1a1d4fb5')]),
      category: 'Accessories',
      stock: 120,
    }}),
    prisma.product.create({ data: {
      shopId: restaurant.id,
      name: 'Cabinet Enamel Pin Set',
      description: 'Set of 4 hard enamel pins: joystick, coin slot, CRT screen, and Quazar logo.',
      price: 2200,
      images: JSON.stringify([U('1558961399-13a9fe9d03c5')]),
      category: 'Accessories',
      stock: 80,
    }}),
    prisma.product.create({ data: {
      shopId: restaurant.id,
      name: 'Neon Grid Tote',
      description: 'Heavy canvas tote with neon cyan grid print. Reinforced handles.',
      price: 2800,
      images: JSON.stringify([U('1544816155-12df9643f363')]),
      category: 'Bags',
      stock: 70,
    }}),
    prisma.product.create({ data: {
      shopId: restaurant.id,
      name: 'Pixel Art Poster — Vol.1',
      description: 'Limited edition 18×24" print on 200gsm matte stock. Numbered and signed.',
      price: 3500,
      images: JSON.stringify([U('1501504905252-8e3a1dae1074')]),
      category: 'Print',
      stock: 50,
    }}),
    prisma.product.create({ data: {
      shopId: restaurant.id,
      name: 'Quazar Insulated Tumbler',
      description: '20oz double-wall stainless tumbler. Matte black with neon pink logo.',
      price: 3800,
      images: JSON.stringify([U('1514228742587-6b1558fcca3d')]),
      category: 'Drinkware',
      stock: 45,
    }}),
  ])

  console.log(`✅ Quazar Arcade — ${products.length} products created`)
  console.log(`   Owner login: owner@quazar-arcade.com / password123`)
  console.log(`   Storefront: http://localhost:3000/shop/quazar-arcade`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
