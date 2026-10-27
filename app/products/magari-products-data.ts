// Launch lineup for Magari by Oca. Shown until products are added in the dashboard;
// once the shop has active DB products, the storefront uses those instead.
// TODO(magari): prices and photos are placeholders until the restaurant confirms them.
export type MagariCategory = 'hat' | 'tee' | 'tote'

export type MagariProduct = {
  slug: string
  name: string
  price: string
  priceUsd?: number | null
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  tag: string
  category: MagariCategory
  note?: string
  stock?: number | null
  path: string
  shopifyUrl: string
}

export const magariProducts: MagariProduct[] = [
  {
    slug: 'magari-cap-black-on-black',
    name: 'Magari Cap — black on black',
    price: '38.00',
    description: 'Washed black six-panel cap with the Magari logo embroidered in black thread. You see it when the light hits it. Unstructured, low profile, adjustable strap.',
    images: ['/magari/cap-washed-black.jpg'],
    sizes: ['One Size'],
    colors: ['Washed Black'],
    tag: 'Hat',
    category: 'hat',
    note: 'the quiet one.',
    path: '/shop/magari/products/magari-cap-black-on-black',
    shopifyUrl: '',
  },
  {
    slug: 'magari-cap-white-embroidery',
    name: 'Magari Cap — white embroidery',
    price: '38.00',
    description: 'Washed black six-panel cap with the Magari logo embroidered in white. The one people ask about. Unstructured, low profile, adjustable strap.',
    images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200&q=80'],
    sizes: ['One Size'],
    colors: ['Washed Black'],
    tag: 'Hat',
    category: 'hat',
    note: 'the one people ask about.',
    path: '/shop/magari/products/magari-cap-white-embroidery',
    shopifyUrl: '',
  },
  {
    slug: 'magari-tee',
    name: 'Magari Tee',
    price: '45.00',
    description: 'Heavyweight cotton tee with the Magari logo printed on the chest. Boxy, a little long. Washes soft.',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Bone'],
    tag: 'Tee',
    category: 'tee',
    path: '/shop/magari/products/magari-tee',
    shopifyUrl: '',
  },
  {
    slug: 'magari-tote',
    name: 'Magari Tote',
    price: '30.00',
    description: 'Heavy canvas tote, big enough for a loaf, two bottles and whatever else you picked up on the Drive.',
    images: [],
    sizes: ['One Size'],
    colors: ['Natural'],
    tag: 'Tote',
    category: 'tote',
    path: '/shop/magari/products/magari-tote',
    shopifyUrl: '',
  },
]

export function getMagariProduct(slug: string) {
  return magariProducts.find(p => p.slug === slug)
}

// Map a dashboard product onto a storefront category
export function magariCategory(p: { productType?: string | null; tag?: string | null; name: string }): MagariCategory {
  const s = `${p.productType ?? ''} ${p.tag ?? ''} ${p.name}`.toLowerCase()
  if (/hat|cap/.test(s)) return 'hat'
  if (/tote|bag/.test(s)) return 'tote'
  return 'tee'
}

// "Magari Cap — black on black" → { title: "Magari Cap", variant: "black on black" }
export function splitMagariName(name: string) {
  const [title, ...rest] = name.split(/\s+[—–-]\s+/)
  return { title, variant: rest.join(' — ') || null }
}
