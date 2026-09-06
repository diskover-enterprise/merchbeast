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

export default async function FatRabbitProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const shop = await prisma.shop.findUnique({ where: { slug: 'fat-rabbit' }, select: { id: true } })
  const raw = await prisma.merchProduct.findUnique({ where: { slug } })
  if (!raw || !raw.active) notFound()

  const product = {
    ...raw,
    images: JSON.parse(raw.images || '[]') as string[],
    sizes: JSON.parse(raw.sizes || '[]') as string[],
    colors: JSON.parse(raw.colors || '[]') as string[],
  }

  const allActive = await prisma.merchProduct.findMany({
    where: { shopId: raw.shopId ?? undefined, active: true },
  })

  // Related: other products (excluding colour variants of the same product)
  const baseName = getBaseName(raw.name)
  const relatedRaw = allActive
    .filter(p => p.slug !== slug && getBaseName(p.name) !== baseName)
    .slice(0, 3)

  const related = relatedRaw.map(p => ({
    ...p,
    images: JSON.parse(p.images || '[]') as string[],
    sizes: JSON.parse(p.sizes || '[]') as string[],
    colors: JSON.parse(p.colors || '[]') as string[],
  }))

  // Colour variants of this same product
  const colorVariants = allActive
    .filter(p => getBaseName(p.name) === baseName)
    .map(p => ({
      slug: p.slug,
      label: p.name.split(' ').slice(-1)[0],
      current: p.slug === slug,
    }))

  return <>
    {shop && <TrackView shopId={shop.id} productSlug={slug} />}
    <FatRabbitProductClient product={product} related={related} colorVariants={colorVariants.length > 1 ? colorVariants : []} />
  </>
}
