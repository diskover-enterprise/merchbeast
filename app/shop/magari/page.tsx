import { headers } from 'next/headers'
import type { Metadata } from 'next'
import { MagariStorefront } from '@/components/storefront/MagariStorefront'
import { TrackView } from '@/components/storefront/TrackView'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { GoogleTag } from '@/components/analytics/GoogleTag'
import { loadMagari } from './data'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Magari by Oca — things from the restaurant',
  description: 'Hats, a tee and a tote from Magari by Oca, 1260 Commercial Drive, Vancouver.',
}

export default async function MagariShopPage() {
  const hdrs = await headers()
  const isUS = (hdrs.get('x-vercel-ip-country') ?? '') === 'US'
  const { shop, products } = await loadMagari()

  return <>
    {shop && <TrackView shopId={shop.id} />}
    <MetaPixel pixelIds={[process.env.NEXT_PUBLIC_META_PIXEL_ID, shop?.metaPixelId]} />
    <GoogleTag gtmIds={[process.env.NEXT_PUBLIC_GTM_ID, shop?.gtmId]} />
    <MagariStorefront products={products} isUS={isUS} heroImage={shop?.bannerImage ?? null} />
  </>
}
