import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const shop = await prisma.shop.findUnique({ where: { slug: 'fat-rabbit' } })
  if (!shop) throw new Error('Fat Rabbit shop not found')

  await prisma.shop.update({
    where: { id: shop.id },
    data: {
      clientEmails: JSON.stringify(['bee@fat-rabbit.ca', 'emily@fat-rabbit.ca']),
    },
  })

  console.log('✅ Fat Rabbit client emails updated: bee@fat-rabbit.ca, emily@fat-rabbit.ca')
  console.log('   They share the same password as the owner account.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
