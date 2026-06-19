import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  if (cookieStore.get('mb-dashboard-auth')?.value !== 'true')
    return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const products = await prisma.merchProduct.findMany({ select: { id: true, slug: true, sizes: true } })

  let updated = 0
  for (const p of products) {
    const sizes: string[] = JSON.parse(p.sizes || '[]')
    if (sizes.includes('One Size') || sizes.includes('XXL')) continue
    if (sizes.length === 0) continue
    await prisma.merchProduct.update({
      where: { id: p.id },
      data: { sizes: JSON.stringify([...sizes, 'XXL']) },
    })
    updated++
  }

  return Response.json({ ok: true, updated, total: products.length })
}
