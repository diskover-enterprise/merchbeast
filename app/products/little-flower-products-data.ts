// Presentation lineup for LFA Merch Shop, built from the LFA mockup boards.
// Once the shop has active dashboard products, the storefront uses those instead.
// TODO(little-flower): replace mockup crops with real product photography before launch.

export type LittleFlowerCollection = 'essentials' | 'heritage' | 'core' | 'alumnae'
export type LittleFlowerCategory = 'hoodies' | 'crewnecks' | 'tees' | 'headwear' | 'accessories'

export type LittleFlowerProduct = {
  slug: string
  name: string
  price: string
  priceUsd?: number | null
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  tag: string
  stock?: number | null
  path: string
  shopifyUrl: string
  collection?: LittleFlowerCollection
  category?: LittleFlowerCategory
  featured?: boolean
  /** Photos per colour; the first colour's set doubles as `images` */
  colorImages?: Record<string, string[]>
}

const img = (name: string) => `/little-flower/${name}.jpg`
const APPAREL = ['XS', 'S', 'M', 'L', 'XL']
const ONE = ['One Size']

type Seed = Omit<LittleFlowerProduct, 'path' | 'shopifyUrl' | 'images' | 'sizes' | 'colors'> & {
  sizes?: string[]
  /** colour → image names; one entry for single-colour pieces */
  looks: Record<string, string[]>
}

function product(s: Seed): LittleFlowerProduct {
  const { looks, ...rest } = s
  const colors = Object.keys(looks)
  const colorImages = Object.fromEntries(colors.map(c => [c, looks[c].map(img)]))
  // Hover shows the next colourway when there is one, otherwise the close-up
  const images = colors.length > 1
    ? [colorImages[colors[0]][0], colorImages[colors[1]][0]]
    : colorImages[colors[0]]
  return { ...rest, sizes: s.sizes ?? APPAREL, colors, colorImages, images, path: `/shop/little-flower/products/${s.slug}`, shopifyUrl: '' }
}

export const littleFlowerProducts: LittleFlowerProduct[] = [
  // ── LFA Essentials: the signature rosette lockup ──
  product({
    slug: 'lfa-hoodie', name: 'LFA Hoodie', price: '78.00', tag: 'Hoodie',
    collection: 'essentials', category: 'hoodies', featured: true,
    description: 'Heavyweight fleece hoodie with the Little Flower Academy rosette lockup embroidered across the chest. Lined hood, kangaroo pocket, ribbed cuffs.',
    looks: { Maroon: ['hoodie-maroon'], Black: ['hoodie-black'] },
  }),
  product({
    slug: 'lfa-crewneck', name: 'LFA Crewneck', price: '68.00', tag: 'Crewneck',
    collection: 'essentials', category: 'crewnecks',
    description: 'Brushed-fleece crewneck with the rosette lockup embroidered on the chest. A relaxed, everyday fit.',
    looks: { Maroon: ['crew-maroon'], Black: ['crew-black'] },
  }),
  product({
    slug: 'lfa-oversized-tee', name: 'LFA Oversized Tee', price: '42.00', tag: 'Tee',
    collection: 'essentials', category: 'tees', featured: true,
    description: 'Heavyweight cotton tee cut boxy and oversized, with the rosette lockup on the chest.',
    looks: { Black: ['tee-black'], Maroon: ['tee-maroon'] },
  }),
  product({
    slug: 'lfa-dad-hat', name: 'LFA Dad Hat', price: '38.00', tag: 'Dad Hat', sizes: ONE,
    collection: 'essentials', category: 'headwear',
    description: 'Washed cotton twill dad hat with the rosette lockup embroidered on the front. Adjustable strap.',
    looks: { Maroon: ['dadhat-maroon'], Black: ['dadhat-black'] },
  }),

  // ── LFA 1927 Heritage ──
  product({
    slug: 'heritage-crew', name: '1927 Heritage Crew', price: '72.00', tag: 'Crewneck',
    collection: 'heritage', category: 'crewnecks', featured: true,
    description: 'Heather grey crewneck with arched LITTLE FLOWER ACADEMY lettering, the rosette and EST. 1927 in maroon.',
    looks: { 'Heather Grey': ['heritage-arch-crew-grey'] },
  }),
  product({
    slug: '1927-hoodie', name: '1927 Hoodie', price: '82.00', tag: 'Hoodie',
    collection: 'heritage', category: 'hoodies',
    description: 'Maroon hoodie with 1927 in tackle-twill collegiate numerals across the chest.',
    looks: { Maroon: ['heritage-1927-hoodie-maroon', 'detail-1927'] },
  }),
  product({
    slug: 'heritage-tee', name: 'Heritage Tee', price: '45.00', tag: 'Tee',
    collection: 'heritage', category: 'tees',
    description: 'Cream heavyweight tee with an arched collegiate print, a 1927 badge and VANCOUVER, BC.',
    looks: { Cream: ['heritage-tee-cream'] },
  }),
  product({
    slug: 'lfa-1927-crew', name: 'LFA 1927 Crew', price: '68.00', tag: 'Crewneck',
    collection: 'heritage', category: 'crewnecks',
    description: 'Black crewneck with a small LFA / 1927 mark at the left chest. Understated and easy to wear anywhere.',
    looks: { Black: ['heritage-lfa1927-crew-black'] },
  }),
  product({
    slug: '1927-dad-hat', name: '1927 Dad Hat', price: '40.00', tag: 'Dad Hat', sizes: ONE,
    collection: 'heritage', category: 'headwear',
    description: 'Washed maroon dad hat with 1927 embroidered in collegiate numerals.',
    looks: { Maroon: ['heritage-1927-dadhat-maroon'] },
  }),

  // ── LFA Core ──
  product({
    slug: 'lfa-varsity-hoodie', name: 'LFA Varsity Hoodie', price: '78.00', tag: 'Hoodie',
    collection: 'core', category: 'hoodies',
    description: 'Bold varsity LFA in cream tackle twill on a maroon heavyweight hoodie.',
    looks: { Maroon: ['core-hoodie-maroon', 'detail-lfa'] },
  }),
  product({
    slug: 'lfa-varsity-crew', name: 'LFA Varsity Crew', price: '68.00', tag: 'Crewneck',
    collection: 'core', category: 'crewnecks',
    description: 'Black crewneck with outlined varsity LFA lettering across the chest.',
    looks: { Black: ['core-crew-black'] },
  }),
  product({
    slug: 'lfa-varsity-tee', name: 'LFA Varsity Tee', price: '42.00', tag: 'Tee',
    collection: 'core', category: 'tees',
    description: 'Cream heavyweight tee with maroon varsity LFA lettering.',
    looks: { Cream: ['core-tee-cream'] },
  }),
  product({
    slug: 'lfa-varsity-dad-hat', name: 'LFA Varsity Dad Hat', price: '38.00', tag: 'Dad Hat', sizes: ONE,
    collection: 'core', category: 'headwear', featured: true,
    description: 'Washed cotton dad hat with varsity LFA embroidered in cream.',
    looks: { Maroon: ['core-dadhat-maroon'], Black: ['core-dadhat-black'] },
  }),

  // ── LFA Alumnae ──
  product({
    slug: 'alumnae-quarter-zip', name: 'Alumnae Quarter-Zip', price: '88.00', tag: 'Quarter-Zip',
    collection: 'alumnae', category: 'crewnecks',
    description: 'Maroon quarter-zip pullover with the rosette and Alumnae embroidered at the left chest.',
    looks: { Maroon: ['alumnae-quarterzip-maroon', 'detail-alumnae-maroon'] },
  }),
  product({
    slug: 'lfa-alumnae-crew', name: 'LFA Alumnae Crew', price: '72.00', tag: 'Crewneck',
    collection: 'alumnae', category: 'crewnecks',
    description: 'Cream crewneck with LFA and Alumnae embroidered in maroon.',
    looks: { Cream: ['alumnae-crew-cream', 'detail-alumnae-lfa'] },
  }),
  product({
    slug: 'alumnae-rosette-crew', name: 'Alumnae Rosette Crew', price: '72.00', tag: 'Crewneck',
    collection: 'alumnae', category: 'crewnecks',
    description: 'Black crewneck with a tonal rosette and Alumnae at the left chest.',
    looks: { Black: ['alumnae-crew-black'] },
  }),
  product({
    slug: 'alumnae-classic-hoodie', name: 'Alumnae Classic Hoodie', price: '82.00', tag: 'Hoodie',
    collection: 'alumnae', category: 'hoodies',
    description: 'Heather grey hoodie with Little Flower Academy Alumnae embroidered at the left chest.',
    looks: { 'Heather Grey': ['alumnae-hoodie-grey'] },
  }),
  product({
    slug: 'lfa-alumnae-tee', name: 'LFA Alumnae Tee', price: '45.00', tag: 'Tee',
    collection: 'alumnae', category: 'tees',
    description: 'Cream oversized tee with LFA Alumnae in maroon.',
    looks: { Cream: ['alumnae-tee-cream'] },
  }),
  product({
    slug: 'alumnae-dad-hat', name: 'Alumnae Dad Hat', price: '40.00', tag: 'Dad Hat', sizes: ONE,
    collection: 'alumnae', category: 'headwear',
    description: 'Maroon dad hat with the rosette and Alumnae embroidered on the front.',
    looks: { Maroon: ['alumnae-dadhat-maroon'] },
  }),
  product({
    slug: 'lfa-est-1927-dad-hat', name: 'LFA Est. 1927 Dad Hat', price: '40.00', tag: 'Dad Hat', sizes: ONE,
    collection: 'alumnae', category: 'headwear',
    description: 'Black dad hat with LFA and EST. 1927 embroidered in cream.',
    looks: { Black: ['alumnae-dadhat-black'] },
  }),
  product({
    slug: 'alumnae-canvas-tote', name: 'Alumnae Canvas Tote', price: '34.00', tag: 'Tote', sizes: ONE,
    collection: 'alumnae', category: 'accessories',
    description: 'Natural canvas tote with the Little Flower Academy lockup and Alumnae.',
    looks: { Natural: ['alumnae-tote', 'detail-alumnae-lockup'] },
  }),
]

export function getLittleFlowerProduct(slug: string) {
  return littleFlowerProducts.find(p => p.slug === slug)
}
