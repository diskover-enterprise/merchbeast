import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const shops = await prisma.shop.findMany({ select: { id: true, slug: true, ownerEmail: true } })
    if (!shops.length) return NextResponse.json({ error: 'no shops found', count: 0 })
    const shop = shops.find(s => s.slug === 'the-1982')
    if (!shop) return NextResponse.json({ error: 'the-1982 not found', allSlugs: shops.map(s => s.slug) })
    const full = await prisma.shop.findUnique({ where: { id: shop.id } })
    const valid = full ? await bcrypt.compare('password123', full.ownerPasswordHash) : false
    return NextResponse.json({ found: true, email: shop.ownerEmail, valid })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
