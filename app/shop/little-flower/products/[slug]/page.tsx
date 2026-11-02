import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { TrackView } from '@/components/storefront/TrackView'
import { loadLittleFlower } from '../../data'
import LittleFlowerProductClient from './LittleFlowerProductClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { products } = await loadLittleFlower()
  const product = products.find(p => p.slug === slug)
  return { title: product ? `${product.name} — LFA Merch Shop` : 'LFA Merch Shop' }
}

export default async function LittleFlowerProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hdrs = await headers()
  const isUS = (hdrs.get('x-vercel-ip-country') ?? '') === 'US'

  const { shop, products } = await loadLittleFlower()
  const product = products.find(p => p.slug === slug)
  if (!product) notFound()

  return <>
    {shop && <TrackView shopId={shop.id} productSlug={slug} />}
    <LittleFlowerProductClient product={product} others={products.filter(p => p.slug !== slug)} isUS={isUS} />
  </>
}
