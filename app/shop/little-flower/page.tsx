import { headers } from 'next/headers'
import { LittleFlowerStorefront } from '@/components/storefront/LittleFlowerStorefront'
import { TrackView } from '@/components/storefront/TrackView'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { GoogleTag } from '@/components/analytics/GoogleTag'
import { loadLittleFlower } from './data'

export const dynamic = 'force-dynamic'

export default async function LittleFlowerShopPage() {
  const hdrs = await headers()
  const isUS = (hdrs.get('x-vercel-ip-country') ?? '') === 'US'
  const { shop, products } = await loadLittleFlower()

  return <>
    {shop && <TrackView shopId={shop.id} />}
    <MetaPixel pixelIds={[process.env.NEXT_PUBLIC_META_PIXEL_ID, shop?.metaPixelId]} />
    <GoogleTag gtmIds={[process.env.NEXT_PUBLIC_GTM_ID, shop?.gtmId]} />
    <LittleFlowerStorefront products={products} isUS={isUS} />
  </>
}
