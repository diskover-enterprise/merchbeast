import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LittleFlowerShell } from '@/components/storefront/little-flower/LittleFlowerShell'
import { Hero } from '@/components/storefront/little-flower/Hero'
import { ProductListing } from '@/components/storefront/little-flower/ProductListing'
import { CollectionGrid } from '@/components/storefront/little-flower/Collections'
import { TrackView } from '@/components/storefront/TrackView'
import { collections, collectionPath, getCollection } from '@/app/products/little-flower-content'
import { loadLittleFlower } from '../../data'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCollection((await params).slug)
  return { title: c ? `${c.title} — LFA Merch Shop` : 'LFA Merch Shop' }
}

export default async function LittleFlowerCollectionPage({ params, searchParams }: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const collection = getCollection((await params).slug)
  if (!collection) notFound()
  const { category } = await searchParams
  const isUS = ((await headers()).get('x-vercel-ip-country') ?? '') === 'US'
  const { shop, products } = await loadLittleFlower()
  const [first, ...rest] = collection.title.split(' ')

  return <>
    {shop && <TrackView shopId={shop.id} />}
    <LittleFlowerShell isUS={isUS}>
      <Hero
        eyebrow="The collection"
        lines={rest.length ? [first, rest.join(' ')] : [first]}
        body={collection.description}
        image={collection.banner}
        imageAlt={collection.title}
        focus={collection.focus}
        tone={collection.tone}
        compact
      />
      <ProductListing
        products={products.filter(p => p.collection === collection.key)}
        basePath={collectionPath(collection.key)}
        category={category}
        title={collection.title}
        eyebrow={collection.line}
      />
      <CollectionGrid collections={collections.filter(c => c.key !== collection.key)} heading="Explore more" />
    </LittleFlowerShell>
  </>
}
