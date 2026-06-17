import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const shop = await prisma.shop.findUnique({ where: { slug: 'the-1982' } })
    if (!shop) return NextResponse.json({ error: 'shop not found' })
    const valid = await bcrypt.compare('password123', shop.ownerPasswordHash)
    return NextResponse.json({ found: true, email: shop.ownerEmail, hashPrefix: shop.ownerPasswordHash.slice(0, 20), valid })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
