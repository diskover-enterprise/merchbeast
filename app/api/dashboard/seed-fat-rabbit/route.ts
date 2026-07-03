import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const existing = await prisma.shop.findUnique({ where: { slug: 'fat-rabbit' } })
  if (existing) {
    return NextResponse.json({ message: 'Fat Rabbit shop already exists', shop: existing })
  }

  const shop = await prisma.shop.create({
    data: {
      name: 'Fat Rabbit',
      slug: 'fat-rabbit',
      ownerEmail: 'hello@fat-rabbit.ca',
      brandColor: '#C5442A',
      active: true,
    },
  })

  return NextResponse.json({ message: 'Fat Rabbit shop created', shop })
}
