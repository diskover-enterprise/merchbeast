import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { BrandedNavbar } from '@/components/storefront/BrandedNavbar'
import { Restaurant } from '@/types'

export default async function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true, name: true, slug: true, description: true,
      logo: true, bannerImage: true, primaryColor: true,
      secondaryColor: true, accentColor: true, fontFamily: true,
      createdAt: true,
    },
  })

  if (!restaurant) notFound()

  // Arcade layout renders its own nav and full-page wrapper
  if (slug === 'quazar-arcade') {
    const fontUrl = `https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap`
    return (
      <>
        <style>{`
          :root {
            --color-primary: #08051a;
            --color-secondary: #f5f0ff;
            --color-accent: #FF2E9A;
          }
        `}</style>
        <link rel="stylesheet" href={fontUrl} />
        {children}
      </>
    )
  }

  const googleFonts = ['Inter', 'Roboto', 'Playfair Display', 'Oswald', 'Dancing Script', 'Montserrat', 'Press Start 2P']
  const fontUrl = googleFonts.includes(restaurant.fontFamily)
    ? `https://fonts.googleapis.com/css2?family=${encodeURIComponent(restaurant.fontFamily)}:wght@400;700&display=swap`
    : null

  return (
    <div style={{ fontFamily: `'${restaurant.fontFamily}', sans-serif` }}>
      <style>{`
        :root {
          --color-primary: ${restaurant.primaryColor};
          --color-secondary: ${restaurant.secondaryColor};
          --color-accent: ${restaurant.accentColor};
          --font-family: '${restaurant.fontFamily}', sans-serif;
        }
      `}</style>
      {fontUrl && (
        <link rel="stylesheet" href={fontUrl} />
      )}
      <BrandedNavbar restaurant={restaurant as Restaurant} />
      <div style={{ backgroundColor: 'var(--color-secondary)', minHeight: '100vh' }}>
        {children}
      </div>
    </div>
  )
}
