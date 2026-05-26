import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Bebas_Neue } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Merch Beast — Custom Print & Embroidery',
  description: 'Premium custom merchandise for every industry. Screen printing, embroidery, and DTG for restaurants, gyms, schools, teams, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${bebasNeue.variable}`}>
      <body className={`${inter.variable} ${cormorant.variable} ${bebasNeue.variable} font-sans antialiased bg-[#F8F7F4]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
