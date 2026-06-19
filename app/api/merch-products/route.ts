import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slugify'

function getDB() {
  return prisma
}

function deserialize(p: any) {
  return {
    ...p,
    images: JSON.parse(p.images || '[]'),
    sizes: JSON.parse(p.sizes || '[]'),
    colors: JSON.parse(p.colors || '[]'),
  }
}

export async function GET(request: Request) {
  const db = getDB()
  const { searchParams } = new URL(request.url)
  const shopId = searchParams.get('shopId')
  const products = await db.merchProduct.findMany({
    where: shopId ? { shopId } : {},
    orderBy: { createdAt: 'asc' },
  })
  return Response.json(products.map(deserialize))
}

export async function POST(request: Request) {
  const db = getDB()
  const body = await request.json()
  const slug = body.slug || slugify(body.name)
  const product = await db.merchProduct.create({
    data: {
      slug,
      shopId: body.shopId || null,
      name: body.name,
      description: body.description || '',
      price: body.price,
      images: JSON.stringify(body.images || []),
      sizes: JSON.stringify(body.sizes || []),
      colors: JSON.stringify(body.colors || []),
      tag: body.tag || null,
      active: body.active ?? true,
    },
  })
  return Response.json(deserialize(product))
}
