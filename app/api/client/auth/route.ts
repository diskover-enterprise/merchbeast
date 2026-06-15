import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const db = prisma

  const shop = await db.restaurant.findUnique({ where: { ownerEmail: email } })
  if (!shop) {
    return Response.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, shop.ownerPasswordHash)
  if (!valid) {
    return Response.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const maxAge = 60 * 60 * 24 * 7
  const cookieValue = `mb-client-auth=${shop.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; Secure`

  return new Response(JSON.stringify({ ok: true, shopId: shop.id, shopName: shop.name }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookieValue,
    },
  })
}

export async function DELETE() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'mb-client-auth=; Path=/; HttpOnly; Max-Age=0',
    },
  })
}
