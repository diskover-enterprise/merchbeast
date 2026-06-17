import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { BrandedNavbar } from '@/components/storefront/BrandedNavbar'
import { Shop } from '@/types'

export default async function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const shop = await prisma.shop.findUnique({
    where: { slug },
    select: {
      id: true, name: true, slug: true, description: true,
      logo: true, bannerImage: true, primaryColor: true,
      secondaryColor: true, accentColor: true, fontFamily: true,
      createdAt: true,
    },
  })

  if (!shop) notFound()

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
  const fontUrl = googleFonts.includes(shop.fontFamily)
    ? `https://fonts.googleapis.com/css2?family=${encodeURIComponent(shop.fontFamily)}:wght@400;700&display=swap`
    : null

  return (
    <div style={{ fontFamily: `'${shop.fontFamily}', sans-serif` }}>
      <style>{`
        :root {
          --color-primary: ${shop.primaryColor};
          --color-secondary: ${shop.secondaryColor};
          --color-accent: ${shop.accentColor};
          --font-family: '${shop.fontFamily}', sans-serif;
        }
      `}</style>
      {fontUrl && (
        <link rel="stylesheet" href={fontUrl} />
      )}
      <BrandedNavbar shop={shop as Shop} />
      <div style={{ backgroundColor: 'var(--color-secondary)', minHeight: '100vh' }}>
        {children}
      </div>
    </div>
  )
}
