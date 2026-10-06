import { prisma } from '@/lib/prisma'

function getDB() {
  return prisma
}

function deserialize(p: any) {
  return {
    ...p,
    images: JSON.parse(p.images || '[]'),
    sizes: JSON.parse(p.sizes || '[]'),
    colors: JSON.parse(p.colors || '[]'),
    colorImages: JSON.parse(p.colorImages || '{}'),
    variants: JSON.parse(p.variants || '[]'),
    cost: (p.cost ?? 0) / 100,
    yourCost: p.yourCost ?? 0,
    priceUsd: p.priceUsd ?? 0,
    weightGrams: p.weightGrams ?? 0,
    productType: p.productType ?? null,
    countryOfOrigin: p.countryOfOrigin ?? null,
    cusmaCertified: p.cusmaCertified ?? false,
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = getDB()
  const { id } = await params
  const body = await request.json()
  const product = await db.merchProduct.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description || '',
      price: body.price,
      images: JSON.stringify(body.images || []),
      sizes: JSON.stringify(body.sizes || []),
      colors: JSON.stringify(body.colors || []),
      sku: body.sku || null,
      tag: body.tag || null,
      active: body.active ?? true,
      stock: body.stock != null && body.stock !== '' ? Number(body.stock) : null,
      material: body.material || null,
      sortOrder: body.sortOrder != null && body.sortOrder !== '' ? Number(body.sortOrder) : 0,
      colorImages: JSON.stringify(body.colorImages || {}),
      variants: JSON.stringify(body.variants || []),
      cost: body.cost != null && body.cost !== '' ? Math.round(Number(body.cost) * 100) : 0,
      yourCost: body.yourCost != null && body.yourCost !== '' ? Math.round(Number(body.yourCost) * 100) : 0,
      priceUsd: body.priceUsd != null && body.priceUsd !== '' ? Math.round(Number(body.priceUsd) * 100) : 0,
      weightGrams: body.weightGrams != null && body.weightGrams !== '' ? Number(body.weightGrams) : 0,
      productType: body.productType || null,
      countryOfOrigin: body.countryOfOrigin || null,
      cusmaCertified: body.cusmaCertified ?? false,
    },
  })
  return Response.json(deserialize(product))
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = getDB()
  const { id } = await params
  await db.merchProduct.delete({ where: { id } })
  return Response.json({ ok: true })
}
