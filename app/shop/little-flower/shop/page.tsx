import { headers } from 'next/headers'
import type { Metadata } from 'next'
import { LittleFlowerShell } from '@/components/storefront/little-flower/LittleFlowerShell'
import { ProductListing } from '@/components/storefront/little-flower/ProductListing'
import { CollectionGrid } from '@/components/storefront/little-flower/Collections'
import { TrackView } from '@/components/storefront/TrackView'
import { collections, LF_SHOP } from '@/app/products/little-flower-content'
import { loadLittleFlower } from '../data'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Shop all — LFA Merch Shop' }

export default async function LittleFlowerShopAllPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams
  const isUS = ((await headers()).get('x-vercel-ip-country') ?? '') === 'US'
  const { shop, products } = await loadLittleFlower()

  return <>
    {shop && <TrackView shopId={shop.id} />}
    <LittleFlowerShell isUS={isUS}>
      <div className="lf-page-head">
        <div className="lf-wrap">
          <p className="lf-micro lf-accent">Little Flower Academy</p>
          <h1 className="lf-heading-l">The LFA Merch Shop</h1>
        </div>
      </div>
      <ProductListing products={products} basePath={LF_SHOP} category={category} title="Shop all" eyebrow="All pieces" />
      <CollectionGrid collections={collections} heading="Shop by collection" />
    </LittleFlowerShell>
  </>
}
