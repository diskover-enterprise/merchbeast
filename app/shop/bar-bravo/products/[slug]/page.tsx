import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { TrackView } from '@/components/storefront/TrackView'
import BarBravoProductClient from './BarBravoProductClient'

export const revalidate = 60

export default async function BarBravoProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const shop = await prisma.shop.findUnique({ where: { slug: 'bar-bravo' }, select: { id: true } })
  const raw = await prisma.merchProduct.findUnique({ where: { slug } })
  if (!raw || !raw.active) notFound()

  const product = {
    ...raw,
    images: JSON.parse(raw.images || '[]') as string[],
    sizes: JSON.parse(raw.sizes || '[]') as string[],
    colors: JSON.parse(raw.colors || '[]') as string[],
  }

  const relatedRaw = await prisma.merchProduct.findMany({
    where: { shopId: raw.shopId ?? undefined, tag: raw.tag, active: true, slug: { not: slug } },
    take: 3,
  })
  const related = relatedRaw.map(p => ({
    ...p,
    images: JSON.parse(p.images || '[]') as string[],
    sizes: JSON.parse(p.sizes || '[]') as string[],
    colors: JSON.parse(p.colors || '[]') as string[],
  }))

  return <>
    {shop && <TrackView shopId={shop.id} productSlug={slug} />}
    <BarBravoProductClient product={product} related={related} />
  </>
}
