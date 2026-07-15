import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { secret, slug, email, password } = await req.json()
  if (secret !== 'mb-reset-2026') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const hash = await bcrypt.hash(password, 10)
  await prisma.shop.update({ where: { slug }, data: { ownerEmail: email, ownerPasswordHash: hash } })
  return NextResponse.json({ ok: true })
}
