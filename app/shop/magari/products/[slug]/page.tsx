import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { TrackView } from '@/components/storefront/TrackView'
import { loadMagari } from '../../data'
import MagariProductClient from './MagariProductClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { products } = await loadMagari()
  const product = products.find(p => p.slug === slug)
  return { title: product ? `${product.name} — Magari by Oca` : 'Magari by Oca' }
}

export default async function MagariProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hdrs = await headers()
  const isUS = (hdrs.get('x-vercel-ip-country') ?? '') === 'US'

  const { shop, products } = await loadMagari()
  const product = products.find(p => p.slug === slug)
  if (!product) notFound()

  return <>
    {shop && <TrackView shopId={shop.id} productSlug={slug} />}
    <MagariProductClient product={product} others={products.filter(p => p.slug !== slug)} isUS={isUS} />
  </>
}
