// Page content for LFA Merch Shop, kept apart from the components so copy,
// collections and imagery can be swapped without touching layout.
import type { LittleFlowerCategory, LittleFlowerCollection } from './little-flower-products-data'

export const LF_PATH = '/shop/little-flower'
export const LF_SHOP = `${LF_PATH}/shop`
export const collectionPath = (key: LittleFlowerCollection) => `${LF_PATH}/collections/${key}`

// Official LFA marks, as published on lfabc.org
// TODO(little-flower): host copies from the school's brand files instead of linking their CDN.
export const LF_LOGO_HORIZONTAL = 'https://bbk12e1-cdn.myschoolcdn.com/ftpimages/439/logo/LFA_Logo_Horizontal_RGB.jpg'
export const LF_LOGO_VERTICAL = 'https://bbk12e1-cdn.myschoolcdn.com/439/site/964/homescreen/LFA_Logo_Vertical_RGB.png'

const img = (name: string) => `/little-flower/${name}.jpg`

/** Thin bar above the header; null hides it */
export const announcement: string | null = null

export const navLinks = [
  { label: 'Shop', href: LF_SHOP },
  { label: 'Apparel', href: `${LF_SHOP}?category=apparel` },
  { label: 'Headwear', href: `${LF_SHOP}?category=headwear` },
  { label: 'Accessories', href: `${LF_SHOP}?category=accessories` },
  { label: 'Alumnae', href: `${LF_PATH}/collections/alumnae` },
  { label: 'About', href: `${LF_PATH}#community` },
]

export const hero = {
  eyebrow: 'Merchandise Collection',
  lines: ['Wear the tradition.', 'Carry it forward.'],
  cta: { label: 'Shop the collection', href: LF_SHOP },
  image: img('hero-home'),
  imageAlt: 'Three friends in an LFA quarter-zip, crewneck and alumnae hoodie outside the school',
  // the group sits right of centre, with open wall on the left
  focus: '78% 35%',
}

export type CollectionInfo = {
  key: LittleFlowerCollection
  title: string
  line: string
  description: string
  tile: string
  banner: string
  /** object-position for the banner crop */
  focus?: string
  tone: 'cream' | 'grey' | 'maroon' | 'ink'
}

export const collections: CollectionInfo[] = [
  {
    key: 'essentials', title: 'LFA Essentials', line: 'Hoodies • Crews • Tees • Dad Hats',
    description: 'Everyday pieces with the LFA look: the rosette lockup on heavyweight basics.',
    tile: img('tile-essentials'), banner: img('lifestyle-main'), focus: '8% 30%', tone: 'cream',
  },
  {
    key: 'heritage', title: 'LFA 1927 Heritage', line: '1927 • Collegiate • Limited Editions',
    description: 'A nod to our roots since 1927: arched lettering, collegiate numerals and washed colours.',
    tile: img('tile-heritage'), banner: img('lifestyle-main'), focus: '96% 30%', tone: 'grey',
  },
  {
    key: 'core', title: 'LFA Core', line: 'Varsity • Bold • Classic',
    description: 'Bold and classic LFA styles in varsity lettering.',
    tile: img('tile-core'), banner: img('lifestyle-main'), tone: 'maroon',
  },
  {
    key: 'alumnae', title: 'Alumnae Collection', line: 'Quarter-Zips • Crews • Totes',
    description: 'Refined everyday layers and timeless pieces for alumnae, designed for lasting wear.',
    tile: img('tile-alumnae'), banner: img('lifestyle-alumnae'), tone: 'ink',
  },
]

export const getCollection = (key: string) => collections.find(c => c.key === key)

export const heritage = {
  eyebrow: 'Est. 1927',
  title: 'Nearly a century of tradition.',
  lines: ['Little Flower Academy', 'Vancouver, BC'],
  cta: { label: 'Shop heritage', href: collectionPath('heritage') },
}

export const alumnaeFeature = {
  eyebrow: 'Little Flower Academy',
  title: 'Alumnae Collection',
  body: 'Refined layers and quiet details for the women who carry LFA with them. Tonal embroidery, the rosette, and pieces made to last.',
  cta: { label: 'Shop alumnae', href: collectionPath('alumnae') },
  image: img('lifestyle-alumnae'),
  imageAlt: 'Three alumnae in LFA quarter-zip, crewneck and hoodie',
}

export const categoryFilters: { key: LittleFlowerCategory | 'apparel'; label: string; includes: LittleFlowerCategory[] }[] = [
  { key: 'apparel', label: 'Apparel', includes: ['hoodies', 'crewnecks', 'tees'] },
  { key: 'hoodies', label: 'Hoodies', includes: ['hoodies'] },
  { key: 'crewnecks', label: 'Crewnecks', includes: ['crewnecks'] },
  { key: 'tees', label: 'Tees', includes: ['tees'] },
  { key: 'headwear', label: 'Headwear', includes: ['headwear'] },
  { key: 'accessories', label: 'Accessories', includes: ['accessories'] },
]

export const categories: { title: string; href: string; image: string }[] = [
  { title: 'Crewnecks', href: `${LF_SHOP}?category=crewnecks`, image: img('crew-maroon') },
  { title: 'Hoodies', href: `${LF_SHOP}?category=hoodies`, image: img('hoodie-black') },
  { title: 'Headwear', href: `${LF_SHOP}?category=headwear`, image: img('core-dadhat-maroon') },
  { title: 'Accessories', href: `${LF_SHOP}?category=accessories`, image: img('alumnae-tote') },
]

export const community = {
  title: 'Made for the LFA community',
  audiences: ['Students', 'Families', 'Alumnae'],
  body: 'Pieces made to carry Little Flower Academy beyond campus: to the game, the reunion, the first apartment and every year after. Considered garments, quietly branded, made to be worn for a long time.',
}

export const footerLinks = {
  Shop: [
    { label: 'Apparel', href: `${LF_SHOP}?category=apparel` },
    { label: 'Headwear', href: `${LF_SHOP}?category=headwear` },
    { label: 'Accessories', href: `${LF_SHOP}?category=accessories` },
    { label: 'Heritage', href: collectionPath('heritage') },
    { label: 'Alumnae', href: collectionPath('alumnae') },
  ],
  Help: [
    { label: 'Sizing', href: `${LF_PATH}/shipping-returns` },
    { label: 'Shipping', href: `${LF_PATH}/shipping-returns` },
    { label: 'Returns', href: `${LF_PATH}/shipping-returns` },
    { label: 'Contact', href: 'mailto:team@merchbeast.shop' },
  ],
  LFA: [
    { label: 'About Little Flower Academy', href: 'https://www.lfabc.org/about-lfa' },
    { label: 'School website', href: 'https://www.lfabc.org/' },
    { label: 'Facebook', href: 'https://www.facebook.com/groups/18735799944/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/groups/3683261' },
  ],
}

// Swatch colours for the names used in product data
export const swatches: Record<string, string> = {
  'Maroon': '#6E1F2A',
  'Black': '#1E1E1E',
  'Cream': '#EFE8DA',
  'Heather Grey': '#C4C3BF',
  'Natural': '#E9DFC9',
}
