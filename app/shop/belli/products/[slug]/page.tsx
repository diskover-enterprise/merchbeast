import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { TrackView } from '@/components/storefront/TrackView'
import { loadBelli } from '../../data'
import BelliProductClient from './BelliProductClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { products } = await loadBelli()
  const product = products.find(p => p.slug === slug)
  return { title: product ? `${product.name} — Belli Goods` : 'Belli Goods' }
}

export default async function BelliProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const isUS = ((await headers()).get('x-vercel-ip-country') ?? '') === 'US'
  const { shop, products } = await loadBelli()
  const product = products.find(p => p.slug === slug)
  if (!product) notFound()

  return <>
    {shop && <TrackView shopId={shop.id} productSlug={slug} />}
    <BelliProductClient product={product} others={products.filter(p => p.slug !== slug)} isUS={isUS} />
  </>
}
