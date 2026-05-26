import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const admin = await prisma.adminUser.findUnique({ where: { email: 'admin@afterdessert.com' } })
    const valid = admin ? await bcrypt.compare('admin123', admin.passwordHash) : false
    return NextResponse.json({ found: !!admin, valid, cwd: process.cwd() })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
