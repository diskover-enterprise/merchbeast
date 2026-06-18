export type BoastyProduct = {
  slug: string
  name: string
  price: string
  description: string
  path: string
  images: string[]
  sizes?: string[]
  colors?: string[]
  category?: string
  tag?: string
}

export const boastyProducts: BoastyProduct[] = [
  {
    slug: 'boasty-tee-lavender',
    name: 'Boasty Tee — Lavender',
    price: '$40.00 CAD',
    description: 'Bold Boasty graphic on a soft lavender crop tee. Caribbean energy in every stitch.',
    path: '/shop/boasty-collective/products/boasty-tee-lavender',
    images: ['https://i.imgur.com/jKcQvai.png'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Lavender'],
    category: 'Tee',
  },
  {
    slug: 'boasty-sunset-rum-tee-white',
    name: 'Sunset Rum Tee — White',
    price: '$40.00 CAD',
    description: 'Inspired by the legendary Sunset Very Strong Rum from St. Vincent. Classic white crop tee.',
    path: '/shop/boasty-collective/products/boasty-sunset-rum-tee-white',
    images: ['https://i.imgur.com/92YpIGM.png'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White'],
    category: 'Tee',
  },
  {
    slug: 'boasty-sunset-rum-tee-blue',
    name: 'Sunset Rum Tee — Blue',
    price: '$40.00 CAD',
    description: 'Inspired by the legendary Sunset Very Strong Rum from St. Vincent. Sky blue crop tee.',
    path: '/shop/boasty-collective/products/boasty-sunset-rum-tee-blue',
    images: ['https://i.imgur.com/vREBZWf.png'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Blue'],
    category: 'Tee',
  },
  {
    slug: 'boasty-pride-of-svg-tee',
    name: 'Pride of St. Vincent Tee',
    price: '$40.00 CAD',
    description: 'Caribbean Vibes. Island Pride. Rep St. Vincent & The Grenadines in style.',
    path: '/shop/boasty-collective/products/boasty-pride-of-svg-tee',
    images: ['https://i.imgur.com/Jg7ZGM8.png'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White'],
    category: 'Tee',
  },
  {
    slug: 'boasty-matouk-calypso-tee',
    name: "Matouk's Calypso Sauce Tee",
    price: '$40.00 CAD',
    description: "A tribute to the Caribbean classic. Matouk's Calypso Sauce on a bold green tee.",
    path: '/shop/boasty-collective/products/boasty-matouk-calypso-tee',
    images: ['https://i.imgur.com/IZxWQ2Q.png'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Green'],
    category: 'Tee',
  },
  {
    slug: 'boasty-bruk-up-snapback',
    name: 'Bruk Up Snapback',
    price: '$40.00 CAD',
    description: 'Black snapback with bold green BRUK UP embroidery. One size fits all.',
    path: '/shop/boasty-collective/products/boasty-bruk-up-snapback',
    images: ['https://i.imgur.com/nr06sos.png', 'https://i.imgur.com/qrxiD7c.png'],
    sizes: ['One Size'],
    colors: ['Black'],
    category: 'Hat',
  },
]

export function getBoastyProduct(slug: string) {
  return boastyProducts.find(p => p.slug === slug)
}
