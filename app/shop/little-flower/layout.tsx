import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LFA Merch Shop',
  description: 'Official merch from Little Flower Academy, Vancouver.',
}

export default function LittleFlowerLayout({ children }: { children: React.ReactNode }) {
  return children
}
