import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Bebas_Neue, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-display',
})
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-beast',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space',
})

export const metadata: Metadata = {
  title: 'Merch Beast — Turning Ideas Into Monsters',
  description: 'Custom apparel & merch built loud — embroidered, printed, and shipped fast.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${bebasNeue.variable} ${spaceGrotesk.variable}`}>
      <body className={`${inter.variable} ${cormorant.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
