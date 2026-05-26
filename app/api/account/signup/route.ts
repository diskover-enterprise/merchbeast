import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  if (!name?.trim() || !email?.trim() || !password) {
    return Response.json({ error: 'All fields are required' }, { status: 400 })
  }
  if (password.length < 8) {
    return Response.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  const existing = await prisma.customer.findUnique({ where: { email } })
  if (existing?.passwordHash) {
    return Response.json({ error: 'An account with this email already exists' }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const customer = existing
    ? await prisma.customer.update({ where: { email }, data: { name, passwordHash } })
    : await prisma.customer.create({ data: { name, email, passwordHash } })

  return Response.json({ id: customer.id, name: customer.name, email: customer.email }, { status: 201 })
}
