import { headers } from 'next/headers'
import { BelliStorefront } from '@/components/storefront/BelliStorefront'
import { TrackView } from '@/components/storefront/TrackView'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { GoogleTag } from '@/components/analytics/GoogleTag'
import { loadBelli } from './data'

export const dynamic = 'force-dynamic'

export default async function BelliShopPage() {
  const isUS = ((await headers()).get('x-vercel-ip-country') ?? '') === 'US'
  const { shop, products } = await loadBelli()

  return <>
    {shop && <TrackView shopId={shop.id} />}
    <MetaPixel pixelIds={[process.env.NEXT_PUBLIC_META_PIXEL_ID, shop?.metaPixelId]} />
    <GoogleTag gtmIds={[process.env.NEXT_PUBLIC_GTM_ID, shop?.gtmId]} />
    <BelliStorefront products={products} isUS={isUS} />
  </>
}
