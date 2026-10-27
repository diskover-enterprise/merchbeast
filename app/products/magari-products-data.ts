// Launch lineup for Magari by Oca. Shown until products are added in the dashboard;
// once the shop has active DB products, the storefront uses those instead.
// TODO(magari): prices are placeholders until the restaurant confirms them.
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
    price: '45.00',
    priceUsd: 4500,
    description: 'Washed black six-panel cap with the Magari logo embroidered in black thread. You see it when the light hits it. Unstructured, low profile, adjustable strap.',
    images: [
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124428/merchbeast/magari-cap-black-front.jpg',
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124425/merchbeast/magari-cap-black-angle.jpg',
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124427/merchbeast/magari-cap-black-detail.jpg',
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124426/merchbeast/magari-cap-black-back.jpg',
    ],
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
    name: 'Magari Cap — white on black',
    price: '45.00',
    priceUsd: 4500,
    description: 'Washed black six-panel cap with the Magari logo embroidered in white. The one people ask about. Unstructured, low profile, adjustable strap.',
    images: [
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124430/merchbeast/magari-cap-white-front.jpg',
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124428/merchbeast/magari-cap-white-angle.jpg',
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124429/merchbeast/magari-cap-white-detail.jpg',
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124429/merchbeast/magari-cap-white-back.jpg',
    ],
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
    priceUsd: 4500,
    description: 'Washed black heavyweight tee. Magari on the chest; on the back, a figure from an old Italian card deck holding up a plate of pasta.',
    images: [
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124432/merchbeast/magari-tee-back.jpg',
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124432/merchbeast/magari-tee-front.jpg',
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124433/merchbeast/magari-tee-logo.jpg',
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793124431/merchbeast/magari-tee-art.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Washed Black'],
    tag: 'Tee',
    category: 'tee',
    path: '/shop/magari/products/magari-tee',
    shopifyUrl: '',
  },
  {
    slug: 'magari-tote',
    name: 'Magari Tote',
    price: '30.00',
    priceUsd: 3000,
    description: 'Natural canvas tote covered in figures from an old Italian card deck, with one holding up a plate of pasta. Big enough for a loaf, two bottles and whatever else you picked up on the Drive.',
    images: [
      'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793134946/merchbeast/magari-tote-front.jpg',
    ],
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
