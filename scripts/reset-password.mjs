import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const slug = 'fat-rabbit'
const email = 'hello@fat-rabbit.ca'
const password = 'fatrabbit23!'

const hash = bcrypt.hashSync(password, 10)
await prisma.shop.update({
  where: { slug },
  data: { ownerEmail: email, ownerPasswordHash: hash },
})

console.log(`✓ Password updated for ${email}`)
await prisma.$disconnect()
