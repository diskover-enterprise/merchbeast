import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { TrackView } from '@/components/storefront/TrackView'
import FatRabbitProductClient from './FatRabbitProductClient'

export const revalidate = 60

const COLOR_WORDS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Navy', 'Grey', 'Gray', 'Brown', 'Pink', 'Purple', 'Yellow', 'Orange', 'Natural']
function getBaseName(name: string) {
  const parts = name.split(' ')
  if (COLOR_WORDS.includes(parts[parts.length - 1])) return parts.slice(0, -1).join(' ')
  return name
}

function parseProduct(p: any) {
  return {
    ...p,
    images: JSON.parse(p.images || '[]') as string[],
    sizes: JSON.parse(p.sizes || '[]') as string[],
    colors: JSON.parse(p.colors || '[]') as string[],
    colorImages: JSON.parse(p.colorImages || '{}') as Record<string, string[]>,
  }
}

export default async function FatRabbitProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const shop = await prisma.shop.findUnique({ where: { slug: 'fat-rabbit' }, select: { id: true } })
  const raw = await prisma.merchProduct.findUnique({ where: { slug } })
  if (!raw || !raw.active) notFound()

  const product = parseProduct(raw)
  const baseName = getBaseName(raw.name)

  const allActive = await prisma.merchProduct.findMany({
    where: { shopId: raw.shopId ?? undefined, active: true },
  })

  // Related: other products (excluding colour variants of the same product)
  const related = allActive
    .filter(p => p.slug !== slug && getBaseName(p.name) !== baseName)
    .slice(0, 3)
    .map(parseProduct)

  // Full data for all colour variants (including current) so client can swap in-place
  const colorVariants = allActive
    .filter(p => getBaseName(p.name) === baseName)
    .map(p => ({ ...parseProduct(p), label: p.name.split(' ').slice(-1)[0] }))

  return <>
    {shop && <TrackView shopId={shop.id} productSlug={slug} />}
    <FatRabbitProductClient
      product={product}
      related={related}
      colorVariants={colorVariants.length > 1 ? colorVariants : []}
      initialSlug={slug}
      colorImages={product.colorImages}
    />
  </>
}
