import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { FatRabbitStorefront } from '@/components/storefront/FatRabbitStorefront'
import { TrackView } from '@/components/storefront/TrackView'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { GoogleTag } from '@/components/analytics/GoogleTag'

export const dynamic = 'force-dynamic'

export default async function FatRabbitShopPage() {
  const hdrs = await headers()
  const country = hdrs.get('x-vercel-ip-country') ?? ''
  const isUS = country === 'US'

  const shop = await prisma.shop.findUnique({
    where: { slug: 'fat-rabbit' },
    select: { id: true, bannerImage: true, metaPixelId: true, gtmId: true },
  })

  const rawProducts = shop ? await prisma.merchProduct.findMany({
    where: { shopId: shop.id, active: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  }) : []

  const dbProducts = rawProducts.map(p => ({
    slug: p.slug, name: p.name, price: p.price, priceUsd: p.priceUsd,
    description: p.description,
    images: JSON.parse(p.images || '[]') as string[],
    sizes: JSON.parse(p.sizes || '[]') as string[],
    colors: JSON.parse(p.colors || '[]') as string[],
    colorImages: JSON.parse(p.colorImages || '{}') as Record<string, string[]>,
    variants: JSON.parse(p.variants || '[]') as Array<{ name: string; hex: string; images: [string, string] }>,
    tag: p.tag, stock: p.stock ?? null,
  }))

  return <>
    {shop && <TrackView shopId={shop.id} />}
    <MetaPixel pixelIds={[process.env.NEXT_PUBLIC_META_PIXEL_ID, shop?.metaPixelId]} />
    <GoogleTag gtmIds={[process.env.NEXT_PUBLIC_GTM_ID, shop?.gtmId]} />
    <FatRabbitStorefront heroImage={shop?.bannerImage ?? null} dbProducts={dbProducts} isUS={isUS} />
  </>
}
