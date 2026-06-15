import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/storefront/ProductCard'
import { ArcadeStorefront } from '@/components/storefront/ArcadeStorefront'
import { LunchLadyStorefront } from '@/components/storefront/LunchLadyStorefront'
import { Product, Restaurant } from '@/types'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function StorefrontPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true, name: true, slug: true, description: true,
      logo: true, bannerImage: true, primaryColor: true,
      secondaryColor: true, accentColor: true, fontFamily: true,
      tagline: true, about: true, heroHeadline: true,
      instagram: true, websiteUrl: true, address: true,
      createdAt: true,
    },
  })

  if (!restaurant) notFound()

  // Lunch Lady — custom editorial storefront with real products
  if (slug === 'lunch-lady') {
    return <LunchLadyStorefront />
  }

  // Arcade theme — custom layout for Quazar Arcade
  if (slug === 'quazar-arcade') {
    const rawProducts = await prisma.product.findMany({
      where: { restaurantId: restaurant.id },
      orderBy: { createdAt: 'asc' },
    })
    const products: Product[] = rawProducts.map((p) => ({ ...p, images: JSON.parse(p.images) }))
    return <ArcadeStorefront restaurant={restaurant as Restaurant} products={products} />
  }

  const rawProducts = await prisma.product.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { createdAt: 'asc' },
  })
  const products: Product[] = rawProducts.map((p) => ({
    ...p,
    images: JSON.parse(p.images),
  }))

  const categories = [...new Set(products.map((p) => p.category))]
  const year = new Date(restaurant.createdAt).getFullYear()

  return (
    <div>
      {/* ── HERO ── full viewport, cinematic gradient overlay */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 sm:px-14 pb-16 sm:pb-24 overflow-hidden"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {restaurant.bannerImage && (
          <Image
            src={restaurant.bannerImage}
            alt={restaurant.name}
            fill
            className="object-cover object-center"
            priority
          />
        )}
        {/* Cinematic gradient: clear top → dark bottom */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.82) 100%)'
        }} />

        {/* Content — bottom left, editorial */}
        <div className="relative z-10 max-w-4xl">
          {restaurant.logo ? (
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={restaurant.logo} alt={restaurant.name} style={{ maxHeight: '320px', width: 'auto' }} />
            </div>
          ) : (
            <h1
              className="font-[family-name:var(--font-display)] font-light text-white leading-[0.9] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(4.5rem, 9vw, 9rem)' }}
            >
              {restaurant.heroHeadline || restaurant.name}
            </h1>
          )}
          {restaurant.tagline && (
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-3">
              {restaurant.tagline}
            </p>
          )}
          {restaurant.description && (
            <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-sm tracking-wide">
              {restaurant.description}
            </p>
          )}
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white rotate-90 origin-center translate-y-3">Scroll</span>
          <div className="w-px h-10 bg-white/60" />
        </div>
      </section>

      {/* ── MANIFESTO ── dark strip with brand statement */}
      {(restaurant.description || restaurant.about) && (
        <section className="py-20 px-6 sm:px-14" style={{ backgroundColor: 'var(--color-primary)' }}>
          <div className="max-w-3xl mx-auto text-center">
            {restaurant.description && (
              <p
                className="font-[family-name:var(--font-display)] font-light italic leading-[1.2] tracking-wide"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', color: 'var(--color-secondary)', opacity: 0.85 }}
              >
                &ldquo;{restaurant.description}&rdquo;
              </p>
            )}
            {restaurant.about && (
              <p className="mt-8 text-sm leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--color-secondary)', opacity: 0.55 }}>
                {restaurant.about}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── COLLECTION ── */}
      <div id="collection" style={{ backgroundColor: 'var(--color-secondary)' }}>
        {products.length === 0 ? (
          <div className="text-center py-20 text-[#6B6B6B]">
            <p className="text-sm tracking-[0.2em] uppercase">No products yet.</p>
          </div>
        ) : (
          <>
            {/* Collection header */}
            <div className="max-w-7xl mx-auto px-6 sm:px-14 pt-16 pb-12">
              <p
                className="text-[10px] tracking-[0.35em] uppercase font-medium mb-4"
                style={{ color: 'var(--color-accent)' }}
              >
                Collection
              </p>
              <h2
                className="font-[family-name:var(--font-display)] font-light leading-[0.95] tracking-[-0.02em]"
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                  color: 'var(--color-primary)',
                }}
              >
                {restaurant.name} Merchandise
              </h2>
            </div>

            {/* Categories */}
            {categories.map((category, idx) => (
              <div key={category}>
                <section className="max-w-7xl mx-auto px-6 sm:px-14 mb-20">
                  {/* Category label */}
                  <div className="flex items-center gap-4 mb-10">
                    <span
                      className="text-[10px] tracking-[0.35em] uppercase font-medium"
                      style={{ color: 'var(--color-primary)', opacity: 0.5 }}
                    >
                      {category}
                    </span>
                    <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.12 }} />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-14">
                    {products
                      .filter((p) => p.category === category)
                      .map((p) => (
                        <ProductCard key={p.id} product={p} restaurant={restaurant as Restaurant} />
                      ))}
                  </div>
                </section>

                {/* Editorial image break between first and second category */}
                {idx === 0 && categories.length > 1 && restaurant.bannerImage && (
                  <div className="relative w-full h-64 sm:h-96 overflow-hidden mb-20">
                    <Image
                      src={restaurant.bannerImage}
                      alt=""
                      fill
                      className="object-cover object-center"
                      style={{ objectPosition: '50% 30%' }}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p
                        className="font-[family-name:var(--font-display)] font-light italic text-white/80 tracking-wide text-center px-6"
                        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                      >
                        {restaurant.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Bottom padding */}
            <div className="pb-24" />
          </>
        )}
      </div>

      {/* Storefront footer */}
      {(restaurant.address || restaurant.instagram || restaurant.websiteUrl) && (
        <footer className="py-12 px-6 sm:px-14" style={{ backgroundColor: 'var(--color-primary)' }}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              {restaurant.address && (
                <p className="text-xs tracking-wide" style={{ color: 'var(--color-secondary)', opacity: 0.5 }}>
                  {restaurant.address}
                </p>
              )}
            </div>
            <div className="flex items-center gap-5">
              {restaurant.instagram && (
                <a href={restaurant.instagram} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-secondary)', opacity: 0.6 }}
                >
                  Instagram
                </a>
              )}
              {restaurant.websiteUrl && (
                <a href={restaurant.websiteUrl} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-secondary)', opacity: 0.6 }}
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </footer>
      )}

      {/* Platform footer */}
      <footer className="py-6 px-6 border-t" style={{ borderColor: 'var(--color-primary)', opacity: 0.15 }}>
        <p className="text-center text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-primary)', opacity: 0.4 }}>
          Powered by After Dessert
        </p>
      </footer>
    </div>
  )
}
