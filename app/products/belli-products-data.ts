// Launch lineup for Belli Goods. Shown until Belli's products are added in the dashboard;
// once the shop has active DB products, the storefront uses those instead.
// TODO(belli): prices are placeholders, and only the Dickys x Belli tee has photos so far.
export type BelliCategory = 'tees' | 'hoodies' | 'crewnecks' | 'hats' | 'totes' | 'accessories'

export type BelliProduct = {
  slug: string
  name: string
  price: string
  priceUsd?: number | null
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  tag: string
  category: BelliCategory
  stock?: number | null
  path: string
  shopifyUrl: string
}

const APPAREL = ['S', 'M', 'L', 'XL', 'XXL']
const path = (slug: string) => `/shop/belli/products/${slug}`

export const belliProducts: BelliProduct[] = [
  {
    slug: 'dickys-x-belli-tee', name: 'Dickys x Belli Tee', price: '45.00', tag: 'Collab', category: 'tees',
    description: 'Black heavyweight tee from the Dickys x Belli collab. DICKYS X BELLI on the chest; The Chiverson framed in highlighter yellow on the back.',
    images: ['/belli/dickys-back.jpg', '/belli/dickys-front.jpg'],
    sizes: APPAREL, colors: ['Black'], path: path('dickys-x-belli-tee'), shopifyUrl: '',
  },
  {
    slug: 'belli-script-tee', name: 'Belli Script Tee', price: '40.00', tag: 'Tee', category: 'tees',
    description: 'Garment-dyed heavyweight tee with the Belli script on the chest and big across the back.',
    images: [], sizes: APPAREL, colors: ['Cream', 'Black'], path: path('belli-script-tee'), shopifyUrl: '',
  },
  {
    slug: 'belli-hoodie', name: 'Belli Hoodie', price: '75.00', tag: 'Hoodie', category: 'hoodies',
    description: 'Heavyweight fleece hoodie with the Belli script embroidered on the chest.',
    images: [], sizes: APPAREL, colors: ['Black', 'Cream'], path: path('belli-hoodie'), shopifyUrl: '',
  },
  {
    slug: 'belli-crewneck', name: 'Belli Crewneck', price: '65.00', tag: 'Crewneck', category: 'crewnecks',
    description: 'Brushed-fleece crewneck with a small Belli script at the chest.',
    images: [], sizes: APPAREL, colors: ['Cream'], path: path('belli-crewneck'), shopifyUrl: '',
  },
  {
    slug: 'belli-dad-hat', name: 'Belli Dad Hat', price: '35.00', tag: 'Hat', category: 'hats',
    description: 'Washed cotton dad hat with the Belli script embroidered in cream. Adjustable strap.',
    images: [], sizes: ['One Size'], colors: ['Black'], path: path('belli-dad-hat'), shopifyUrl: '',
  },
  {
    slug: 'belli-tote', name: 'Belli Tote', price: '25.00', tag: 'Tote', category: 'totes',
    description: 'Heavy canvas tote with the Belli script. Fits a pizza box flat, almost.',
    images: [], sizes: ['One Size'], colors: ['Natural'], path: path('belli-tote'), shopifyUrl: '',
  },
]

export function getBelliProduct(slug: string) {
  return belliProducts.find(p => p.slug === slug)
}

// Map a dashboard product onto a storefront category
export function belliCategory(p: { productType?: string | null; tag?: string | null; name: string }): BelliCategory {
  const s = `${p.productType ?? ''} ${p.tag ?? ''} ${p.name}`.toLowerCase()
  if (/hoodie/.test(s)) return 'hoodies'
  if (/crew/.test(s)) return 'crewnecks'
  if (/hat|cap/.test(s)) return 'hats'
  if (/tote|bag/.test(s)) return 'totes'
  if (/tee|shirt/.test(s)) return 'tees'
  return 'accessories'
}
