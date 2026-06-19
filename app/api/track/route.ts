import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { shopId, shopSlug, productSlug } = await req.json()
    let resolvedShopId = shopId
    if (!resolvedShopId && shopSlug) {
      const shop = await prisma.shop.findUnique({ where: { slug: shopSlug }, select: { id: true } })
      resolvedShopId = shop?.id
    }
    if (!resolvedShopId) return Response.json({ ok: false })
    await prisma.pageView.create({ data: { shopId: resolvedShopId, productSlug: productSlug || null } })
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false })
  }
}
