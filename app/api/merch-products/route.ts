import { PrismaClient } from '@prisma/client'
import { slugify } from '@/lib/slugify'

const prisma = new PrismaClient()

export async function GET() {
  const products = await prisma.merchProduct.findMany({ orderBy: { createdAt: 'asc' } })
  return Response.json(products.map(deserialize))
}

export async function POST(request: Request) {
  const body = await request.json()
  const slug = body.slug || slugify(body.name)
  const product = await prisma.merchProduct.create({
    data: {
      slug,
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

function deserialize(p: any) {
  return {
    ...p,
    images: JSON.parse(p.images || '[]'),
    sizes: JSON.parse(p.sizes || '[]'),
    colors: JSON.parse(p.colors || '[]'),
  }
}
