import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0])

const PASSWORD_HASH = bcrypt.hashSync('password123', 10)

const U = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&auto=format&fit=crop&q=80`

const restaurants = [
  {
    name: 'Smoke & Ember BBQ', slug: 'smoke-ember-bbq',
    description: 'Slow-smoked, hand-crafted BBQ with a rugged Southern soul. Born in the pit, built for the bold.',
    primaryColor: '#1a0a00', secondaryColor: '#f5e6d3', accentColor: '#c0392b', fontFamily: 'Oswald',
    ownerEmail: 'owner@smoke-ember-bbq.com',
    bannerImage: U('1529193591184-b1d58069ecdd', 1400, 600), logo: U('1558618666-fcd25c85cd64', 200, 200),
    products: [
      { name: 'Pitmaster Hoodie', description: 'Heavyweight fleece pullover with embroidered logo. Smells like victory.', price: 6500, category: 'Apparel', stock: 30, images: [U('1556821840-3a63f8550206')] },
      { name: 'BBQ Nation Snapback', description: 'Black and red structured cap with embroidered flame logo.', price: 2800, category: 'Headwear', stock: 50, images: [U('1588850561407-ed78c282e89b')] },
      { name: 'Cast Iron Skillet Set', description: 'Pre-seasoned 3-piece cast iron set. The pro\'s choice.', price: 8900, category: 'Cookware', stock: 15, images: [U('1556909114-f6e7ad7d3136')] },
      { name: 'Smoke Ring Pint Glass', description: 'Set of 4 branded pint glasses etched with the classic smoke ring.', price: 2400, category: 'Drinkware', stock: 60, images: [U('1535958636474-b021a674e6c5')] },
      { name: 'BBQ Rub Trio Pack', description: 'Brisket Blend, Rib Rub, and Pulled Pork Seasoning. 8oz each.', price: 3200, category: 'Sauces & Rubs', stock: 100, images: [U('1596040033229-a9821ebd058d')] },
      { name: 'Pitmaster Apron', description: 'Waxed canvas apron with leather straps. Built to last.', price: 5500, category: 'Apparel', stock: 25, images: [U('1588964895597-cfec6e3e59de')] },
      { name: 'Meat Thermometer Pro', description: 'Instant-read digital thermometer with backlit display.', price: 4200, category: 'Tools', stock: 40, images: [U('1547592166-23ac45744acd')] },
    ],
  },
  {
    name: 'Sakura Sushi', slug: 'sakura-sushi',
    description: 'Minimalist Japanese omakase-inspired rolls and bento merch for the refined palate.',
    primaryColor: '#1b2a35', secondaryColor: '#f8f9fa', accentColor: '#e8b4a0', fontFamily: 'Montserrat',
    ownerEmail: 'owner@sakura-sushi.com',
    bannerImage: U('1579871494447-9811cf80d66c', 1400, 600), logo: U('1553621042-f6e147245754', 200, 200),
    products: [
      { name: 'Sakura Tote Bag', description: 'Natural canvas tote with hand-painted cherry blossom print.', price: 2200, category: 'Bags', stock: 80, images: [U('1544816155-12df9643f363')] },
      { name: 'Chopstick Rest Set', description: 'Porcelain chopstick rests in the shape of waves. Set of 4.', price: 1800, category: 'Tableware', stock: 45, images: [U('1545442439-a536f4de0286')] },
      { name: 'Omakase Tee', description: 'Ultra-soft 100% pima cotton tee in sage green with kanji logo.', price: 3800, category: 'Apparel', stock: 55, images: [U('1521572163474-6864f9cf17ab')] },
      { name: 'Japanese Kitchen Knife', description: '8-inch santoku blade hand-forged in high-carbon stainless steel.', price: 12000, category: 'Cookware', stock: 10, images: [U('1569003339405-ea396a5a8a90')] },
      { name: 'Matcha Kit', description: 'Ceremonial grade matcha + bamboo whisk + ceramic bowl set.', price: 4800, category: 'Tea', stock: 30, images: [U('1545239351-ef35f43d514b')] },
      { name: 'Bento Box', description: 'Lacquered wooden bento with 3 compartments and elastic closure.', price: 3500, category: 'Tableware', stock: 40, images: [U('1498654896293-37aacf113fd9')] },
    ],
  },
  {
    name: 'Pastel Cakery', slug: 'pastel-cakery',
    description: 'Dreamy desserts, pastel aesthetics, and all the sweet things you can wear or bring home.',
    primaryColor: '#f7c5d5', secondaryColor: '#fff9fc', accentColor: '#d4a5c9', fontFamily: 'Dancing Script',
    ownerEmail: 'owner@pastel-cakery.com',
    bannerImage: U('1486427944299-d1955d23e34d', 1400, 600), logo: U('1464349095431-e9a21285b5f3', 200, 200),
    products: [
      { name: 'Sprinkle Crew Sweatshirt', description: 'Pastel pink crewneck with embroidered rainbow sprinkles.', price: 5400, category: 'Apparel', stock: 35, images: [U('1556921421-a2c9e1d8d3cc')] },
      { name: 'Cake Stand', description: 'White ceramic cake stand with gold rim. 10-inch diameter.', price: 4000, category: 'Tableware', stock: 20, images: [U('1464349095431-e9a21285b5f3')] },
      { name: 'Dessert Sticker Pack', description: '50 waterproof holographic stickers. Cakes, donuts, and macarons.', price: 800, category: 'Stationery', stock: 200, images: [U('1558961399-13a9fe9d03c5')] },
      { name: 'Baking Set — Starter', description: 'Mixing bowls, piping bags, offset spatula, and silicone mat.', price: 5800, category: 'Bakeware', stock: 25, images: [U('1578985545062-69928b1d9587')] },
      { name: 'Pastel Mug (3-Pack)', description: 'Lilac, mint, and peach ceramic mugs. 12oz each.', price: 3600, category: 'Drinkware', stock: 60, images: [U('1514228742587-6b1558fcca3d')] },
      { name: 'Frilly Apron', description: 'Ruffle-trimmed linen apron in blush pink with pocket.', price: 3000, category: 'Apparel', stock: 45, images: [U('1588964895597-cfec6e3e59de')] },
      { name: 'Macaron Keychain', description: 'Resin macaron charms in assorted pastel colors.', price: 1000, category: 'Accessories', stock: 150, images: [U('1558961399-13a9fe9d03c5')] },
      { name: 'Recipe Journal', description: 'Dotted notebook with pastel cover and recipe template pages.', price: 1600, category: 'Stationery', stock: 90, images: [U('1501504905252-8e3a1dae1074')] },
    ],
  },
  {
    name: 'Rustic Pie Co.', slug: 'rustic-pie-co',
    description: 'Wood-fired Neapolitan pizza and farm-to-table vibes. Our merch is as authentic as our pies.',
    primaryColor: '#5c3d2e', secondaryColor: '#fdf6ec', accentColor: '#e07b39', fontFamily: 'Playfair Display',
    ownerEmail: 'owner@rustic-pie-co.com',
    bannerImage: U('1513104890138-7c749659a591', 1400, 600), logo: U('1571997478779-2adcbbe9ab2f', 200, 200),
    products: [
      { name: 'Wood-Fired Tee', description: 'Vintage-wash unisex tee with faded pizza wheel graphic.', price: 3400, category: 'Apparel', stock: 60, images: [U('1516762689617-e1cffcef479d')] },
      { name: 'Pizza Stone', description: 'Cordierite baking stone for crispy crusts every time. 14-inch.', price: 4500, category: 'Cookware', stock: 20, images: [U('1571997478779-2adcbbe9ab2f')] },
      { name: 'Rustic Pie Cookbook', description: 'A full-color hardcover with 60+ pizza and focaccia recipes.', price: 3800, category: 'Books', stock: 40, images: [U('1495195134817-aeb325a55b65')] },
      { name: 'Olive Oil Bottle', description: 'Extra virgin, cold-pressed. Private-label 500ml bottle.', price: 1900, category: 'Pantry', stock: 75, images: [U('1474979078801-8af00b0836e0')] },
      { name: 'Dough Scraper', description: 'Stainless steel bench scraper with engraved Rustic Pie logo.', price: 1200, category: 'Tools', stock: 100, images: [U('1547592166-23ac45744acd')] },
      { name: 'Pizza Peel', description: 'Acacia wood pizza peel with long handle. Handmade finish.', price: 5200, category: 'Cookware', stock: 18, images: [U('1513104890138-7c749659a591')] },
      { name: 'Italian Herb Blend', description: 'House-blend oregano, basil, chili flakes, garlic. 4oz jar.', price: 1400, category: 'Pantry', stock: 90, images: [U('1465577512280-1c2d41a79de3')] },
    ],
  },
  {
    name: 'Block Burger Co.', slug: 'block-burger-co',
    description: 'Bold streetwear energy meets smash burgers. We flip burgers and heads.',
    primaryColor: '#111111', secondaryColor: '#f5f5f5', accentColor: '#ffcc00', fontFamily: 'Oswald',
    ownerEmail: 'owner@block-burger-co.com',
    bannerImage: U('1568901346375-23c9450c58cd', 1400, 600), logo: U('1568901346375-23c9450c58cd', 200, 200),
    products: [
      { name: 'Block Burger Bomber Jacket', description: 'Black satin bomber with embroidered logo. Limited drop.', price: 12000, category: 'Apparel', stock: 15, images: [U('1551537482-f2075a1d41f2')] },
      { name: 'Smash Beanie', description: 'Ribbed knit beanie in jet black with yellow embroidery.', price: 2400, category: 'Headwear', stock: 80, images: [U('1576871337632-b9aef4c17ab9')] },
      { name: 'Block Logo Hoodie', description: 'Heavyweight fleece hoodie in washed black. Oversized fit.', price: 7200, category: 'Apparel', stock: 40, images: [U('1556821840-3a63f8550206')] },
      { name: 'Limited Tee — Vol.1', description: 'Graphic tee from the inaugural collab drop. 100% cotton.', price: 3800, category: 'Apparel', stock: 55, images: [U('1503341504253-dff4815485f1')] },
      { name: 'Sauce Pack — All 5', description: 'Block Signature, Smoky BBQ, Spicy Habanero, Ranch, Garlic Aioli.', price: 2600, category: 'Sauces', stock: 60, images: [U('1567529785739-fc3dd34b3ff3')] },
      { name: 'Burger Press', description: 'Heavy-duty cast iron smash press for perfect patties.', price: 3500, category: 'Cookware', stock: 30, images: [U('1556909114-f6e7ad7d3136')] },
      { name: 'Gold Chain Keychain', description: 'Chunky enamel block logo pendant on a gold-tone chain.', price: 1500, category: 'Accessories', stock: 120, images: [U('1535303291-63be1a1d4fb5')] },
    ],
  },
  {
    name: 'Lunch Lady', slug: 'lunch-lady',
    description: 'Saigon street hawker spirit. Phở since the beginning. The original, the iconic, the irreplaceable.',
    primaryColor: '#1C2E54', secondaryColor: '#FFFFFF', accentColor: '#C84020', fontFamily: 'Playfair Display',
    ownerEmail: 'owner@lunchlady.com',
    bannerImage: U('1569050467447-ce54b3bbc37d', 1400, 900), logo: null,
    products: [
      { name: 'Quán Ăn Tee', description: 'Heavyweight black tee. Minimal block-print logo on chest. 100% cotton.', price: 4800, category: 'Apparel', stock: 60, images: [U('1503341504253-dff4815485f1')] },
      { name: 'Night Market Tote', description: 'Natural canvas tote with hand-stamped graphic. Carries your haul, tells a story.', price: 3500, category: 'Bags', stock: 80, images: [U('1544816155-12df9643f363')] },
      { name: 'Phở Bowl — Matte Black', description: 'Hand-thrown ceramic bowl with matte black glaze. Dishwasher safe.', price: 5500, category: 'Tableware', stock: 25, images: [U('1578985545062-69928b1d9587')] },
      { name: 'Saigon Supply Hoodie', description: 'Oversized washed-black pullover. Drop-shoulder cut. Garment-dyed finish.', price: 9800, category: 'Apparel', stock: 30, images: [U('1556821840-3a63f8550206')] },
      { name: 'Cà Phê Phin Kit', description: 'Traditional Vietnamese drip filter + 250g single-origin ground coffee.', price: 4200, category: 'Coffee', stock: 40, images: [U('1495474472287-4d71bcdd2085')] },
      { name: 'Daily Cap — Black', description: 'Unstructured 6-panel cap. Tonal embroidery. One size.', price: 3800, category: 'Headwear', stock: 70, images: [U('1588850561407-ed78c282e89b')] },
      { name: 'Field Guide — Vol. 1', description: 'Limited edition travel zine. 48 pages. Photography, recipes, and dispatches from Saigon.', price: 2200, category: 'Print', stock: 100, images: [U('1501504905252-8e3a1dae1074')] },
      { name: 'Lacquer Chopstick Set', description: 'Matte black resin lacquer. Set of 5 pairs. Presented in a cloth sleeve.', price: 2800, category: 'Tableware', stock: 55, images: [U('1545442439-a536f4de0286')] },
    ],
  },
]

async function main() {
  console.log('🌱 Seeding database...')
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.shop.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.adminUser.deleteMany()

  await prisma.adminUser.create({
    data: { email: 'admin@afterdessert.com', passwordHash: bcrypt.hashSync('admin123', 10) },
  })

  for (const r of restaurants) {
    const restaurant = await prisma.shop.create({
      data: {
        name: r.name, slug: r.slug, description: r.description,
        primaryColor: r.primaryColor, secondaryColor: r.secondaryColor,
        accentColor: r.accentColor, fontFamily: r.fontFamily,
        ownerEmail: r.ownerEmail, ownerPasswordHash: PASSWORD_HASH,
        bannerImage: r.bannerImage, logo: r.logo,
      },
    })
    for (const p of r.products) {
      await prisma.product.create({
        data: {
          shopId: restaurant.id,
          name: p.name, description: p.description,
          price: p.price, category: p.category, stock: p.stock,
          images: JSON.stringify(p.images),
        },
      })
    }
    console.log(`✅ ${restaurant.name}`)
  }
  console.log('🎉 Done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
