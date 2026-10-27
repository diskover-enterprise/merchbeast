import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Magari by Oca',
  description: 'Hats, a tee and a tote from Magari by Oca, 1260 Commercial Drive, Vancouver.',
}

export default function MagariLayout({ children }: { children: React.ReactNode }) {
  return children
}
