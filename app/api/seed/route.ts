import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const PASSWORD_HASH = bcrypt.hashSync('password123', 10)

const U = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&auto=format&fit=crop&q=80`

const shops = [
  {
    name: 'Smoke & Ember BBQ', slug: 'smoke-ember-bbq',
    description: 'Slow-smoked, hand-crafted BBQ with a rugged Southern soul.',
    primaryColor: '#1a0a00', secondaryColor: '#f5e6d3', accentColor: '#c0392b', fontFamily: 'Oswald',
    ownerEmail: 'owner@smoke-ember-bbq.com',
    bannerImage: U('1529193591184-b1d58069ecdd', 1400, 600), logo: U('1558618666-fcd25c85cd64', 200, 200),
    products: [
      { name: 'Pitmaster Hoodie', description: 'Heavyweight fleece pullover with embroidered logo.', price: 6500, category: 'Apparel', stock: 30, images: [U('1556821840-3a63f8550206')] },
      { name: 'BBQ Nation Snapback', description: 'Black and red structured cap with embroidered flame logo.', price: 2800, category: 'Headwear', stock: 50, images: [U('1588850561407-ed78c282e89b')] },
      { name: 'Smoke Ring Pint Glass', description: 'Set of 4 branded pint glasses.', price: 2400, category: 'Drinkware', stock: 60, images: [U('1535958636474-b021a674e6c5')] },
      { name: 'Pitmaster Apron', description: 'Waxed canvas apron with leather straps.', price: 5500, category: 'Apparel', stock: 25, images: [U('1588964895597-cfec6e3e59de')] },
    ],
  },
  {
    name: 'Sakura Sushi', slug: 'sakura-sushi',
    description: 'Minimalist Japanese omakase-inspired rolls and bento merch.',
    primaryColor: '#1b2a35', secondaryColor: '#f8f9fa', accentColor: '#e8b4a0', fontFamily: 'Montserrat',
    ownerEmail: 'owner@sakura-sushi.com',
    bannerImage: U('1579871494447-9811cf80d66c', 1400, 600), logo: U('1553621042-f6e147245754', 200, 200),
    products: [
      { name: 'Sakura Tote Bag', description: 'Natural canvas tote with hand-painted cherry blossom print.', price: 2200, category: 'Bags', stock: 80, images: [U('1544816155-12df9643f363')] },
      { name: 'Omakase Tee', description: 'Ultra-soft 100% pima cotton tee in sage green.', price: 3800, category: 'Apparel', stock: 55, images: [U('1521572163474-6864f9cf17ab')] },
      { name: 'Matcha Kit', description: 'Ceremonial grade matcha + bamboo whisk + ceramic bowl.', price: 4800, category: 'Tea', stock: 30, images: [U('1545239351-ef35f43d514b')] },
    ],
  },
  {
    name: 'Pastel Cakery', slug: 'pastel-cakery',
    description: 'Dreamy desserts, pastel aesthetics, and all the sweet things.',
    primaryColor: '#f7c5d5', secondaryColor: '#fff9fc', accentColor: '#d4a5c9', fontFamily: 'Dancing Script',
    ownerEmail: 'owner@pastel-cakery.com',
    bannerImage: U('1486427944299-d1955d23e34d', 1400, 600), logo: U('1464349095431-e9a21285b5f3', 200, 200),
    products: [
      { name: 'Sprinkle Crew Sweatshirt', description: 'Pastel pink crewneck with embroidered rainbow sprinkles.', price: 5400, category: 'Apparel', stock: 35, images: [U('1556921421-a2c9e1d8d3cc')] },
      { name: 'Dessert Sticker Pack', description: '50 waterproof holographic stickers.', price: 800, category: 'Stationery', stock: 200, images: [U('1558961399-13a9fe9d03c5')] },
      { name: 'Pastel Mug (3-Pack)', description: 'Lilac, mint, and peach ceramic mugs. 12oz each.', price: 3600, category: 'Drinkware', stock: 60, images: [U('1514228742587-6b1558fcca3d')] },
    ],
  },
  {
    name: 'Rustic Pie Co.', slug: 'rustic-pie-co',
    description: 'Wood-fired Neapolitan pizza and farm-to-table vibes.',
    primaryColor: '#5c3d2e', secondaryColor: '#fdf6ec', accentColor: '#e07b39', fontFamily: 'Playfair Display',
    ownerEmail: 'owner@rustic-pie-co.com',
    bannerImage: U('1513104890138-7c749659a591', 1400, 600), logo: U('1571997478779-2adcbbe9ab2f', 200, 200),
    products: [
      { name: 'Wood-Fired Tee', description: 'Vintage-wash unisex tee with faded pizza wheel graphic.', price: 3400, category: 'Apparel', stock: 60, images: [U('1516762689617-e1cffcef479d')] },
      { name: 'Rustic Pie Cookbook', description: 'Full-color hardcover with 60+ pizza recipes.', price: 3800, category: 'Books', stock: 40, images: [U('1495195134817-aeb325a55b65')] },
      { name: 'Pizza Peel', description: 'Acacia wood pizza peel with long handle.', price: 5200, category: 'Cookware', stock: 18, images: [U('1513104890138-7c749659a591')] },
    ],
  },
  {
    name: 'Block Burger Co.', slug: 'block-burger-co',
    description: 'Bold streetwear energy meets smash burgers.',
    primaryColor: '#111111', secondaryColor: '#f5f5f5', accentColor: '#ffcc00', fontFamily: 'Oswald',
    ownerEmail: 'owner@block-burger-co.com',
    bannerImage: U('1568901346375-23c9450c58cd', 1400, 600), logo: U('1568901346375-23c9450c58cd', 200, 200),
    products: [
      { name: 'Block Burger Bomber Jacket', description: 'Black satin bomber with embroidered logo. Limited drop.', price: 12000, category: 'Apparel', stock: 15, images: [U('1551537482-f2075a1d41f2')] },
      { name: 'Block Logo Hoodie', description: 'Heavyweight fleece hoodie in washed black.', price: 7200, category: 'Apparel', stock: 40, images: [U('1556821840-3a63f8550206')] },
      { name: 'Smash Beanie', description: 'Ribbed knit beanie in jet black with yellow embroidery.', price: 2400, category: 'Headwear', stock: 80, images: [U('1576871337632-b9aef4c17ab9')] },
    ],
  },
  {
    name: 'Lunch Lady', slug: 'lunch-lady',
    description: 'Saigon street hawker spirit. Phở since the beginning. The original, the iconic, the irreplaceable.',
    primaryColor: '#1C2E54', secondaryColor: '#FFFFFF', accentColor: '#C84020', fontFamily: 'Playfair Display',
    ownerEmail: 'owner@lunchlady.com',
    bannerImage: U('1569050467447-ce54b3bbc37d', 1400, 900), logo: null,
    products: [
      { name: 'Quán Ăn Tee', description: 'Heavyweight black tee. Minimal block-print logo on chest.', price: 4800, category: 'Apparel', stock: 60, images: [U('1503341504253-dff4815485f1')] },
      { name: 'Night Market Tote', description: 'Natural canvas tote with hand-stamped graphic.', price: 3500, category: 'Bags', stock: 80, images: [U('1544816155-12df9643f363')] },
      { name: 'Phở Bowl — Matte Black', description: 'Hand-thrown ceramic bowl with matte black glaze.', price: 5500, category: 'Tableware', stock: 25, images: [U('1578985545062-69928b1d9587')] },
      { name: 'Saigon Supply Hoodie', description: 'Oversized washed-black pullover. Drop-shoulder cut.', price: 9800, category: 'Apparel', stock: 30, images: [U('1556821840-3a63f8550206')] },
      { name: 'Cà Phê Phin Kit', description: 'Traditional Vietnamese drip filter + 250g single-origin coffee.', price: 4200, category: 'Coffee', stock: 40, images: [U('1495474472287-4d71bcdd2085')] },
      { name: 'Daily Cap — Black', description: 'Unstructured 6-panel cap. Tonal embroidery. One size.', price: 3800, category: 'Headwear', stock: 70, images: [U('1588850561407-ed78c282e89b')] },
      { name: 'Field Guide — Vol. 1', description: 'Limited edition travel zine. 48 pages.', price: 2200, category: 'Print', stock: 100, images: [U('1501504905252-8e3a1dae1074')] },
      { name: 'Lacquer Chopstick Set', description: 'Matte black resin lacquer. Set of 5 pairs.', price: 2800, category: 'Tableware', stock: 55, images: [U('1545442439-a536f4de0286')] },
    ],
  },
]

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (token !== 'seed-merchbeast-2026') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    // Clear existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.restaurant.deleteMany()
    await prisma.customer.deleteMany()
    await prisma.adminUser.deleteMany()

    // Platform admin
    await prisma.adminUser.create({
      data: { email: 'admin@afterdessert.com', passwordHash: bcrypt.hashSync('admin123', 10) },
    })

    // Shops + products
    for (const s of shops) {
      const shop = await prisma.restaurant.create({
        data: {
          name: s.name, slug: s.slug, description: s.description,
          primaryColor: s.primaryColor, secondaryColor: s.secondaryColor,
          accentColor: s.accentColor, fontFamily: s.fontFamily,
          ownerEmail: s.ownerEmail, ownerPasswordHash: PASSWORD_HASH,
          bannerImage: s.bannerImage, logo: s.logo,
        },
      })

      for (const p of s.products) {
        await prisma.product.create({
          data: {
            restaurantId: shop.id,
            name: p.name, description: p.description,
            price: p.price, category: p.category, stock: p.stock,
            images: JSON.stringify(p.images),
          },
        })
      }
    }

    return NextResponse.json({
      ok: true,
      message: `Seeded ${shops.length} shops`,
      logins: shops.map((s) => ({ shop: s.name, email: s.ownerEmail, password: 'password123' })),
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
