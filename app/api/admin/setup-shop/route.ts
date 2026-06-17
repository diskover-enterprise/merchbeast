import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { secret, slug, email, password } = await req.json()
  if (secret !== process.env.ADMIN_SETUP_SECRET) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const hash = await bcrypt.hash(password, 10)
  await prisma.shop.update({
    where: { slug },
    data: { ownerEmail: email, ownerPasswordHash: hash },
  })

  return Response.json({ ok: true })
}
