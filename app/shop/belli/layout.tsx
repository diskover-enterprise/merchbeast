import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Belli Goods — Merch from your neighbourhood pizzeria',
  description: 'Tees, hoodies, crewnecks, hats and totes from Belli, a neighbourhood pizzeria in Vancouver.',
}

export default function BelliLayout({ children }: { children: React.ReactNode }) {
  return children
}
