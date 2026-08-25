require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const shop = await prisma.shop.findUnique({ where: { slug: 'lunch-lady' } });
  if (!shop) {
    console.log('No shop found with slug lunch-lady');
    return;
  }
  const orders = await prisma.order.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { items: true, customer: true },
  });
  console.log(JSON.stringify(orders, null, 2));
}

main().finally(() => prisma.$disconnect());
