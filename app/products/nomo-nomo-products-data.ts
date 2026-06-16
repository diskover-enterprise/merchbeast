export type NomoProduct = {
  slug: string
  name: string
  price: string
  description: string
  path: string
  images: string[]
  sizes?: string[]
  colors?: string[]
  category?: string
}

export const nomoProducts: NomoProduct[] = [
  {
    slug: 'nomo-nomo-tee-black',
    name: 'Nomo Nomo Tee — Black',
    price: '$45.00 CAD',
    description: 'Heavy cotton tee. Bold Nomo Nomo graphic on chest. Made to be worn out late.',
    path: '/shop/nomo-nomo/products/nomo-nomo-tee-black',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black'],
    category: 'Tee',
  },
  {
    slug: 'nomo-nomo-tee-white',
    name: 'Nomo Nomo Tee — White',
    price: '$45.00 CAD',
    description: 'Heavy cotton tee. Bold Nomo Nomo graphic on chest. Clean contrast on white.',
    path: '/shop/nomo-nomo/products/nomo-nomo-tee-white',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White'],
    category: 'Tee',
  },
  {
    slug: 'nomo-nomo-tee-vintage',
    name: 'Nomo Nomo Tee — Vintage Wash',
    price: '$48.00 CAD',
    description: 'Garment-dyed vintage wash tee. Lived-in feel, oversized cut. Limited run.',
    path: '/shop/nomo-nomo/products/nomo-nomo-tee-vintage',
    images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Vintage Black'],
    category: 'Tee',
  },
  {
    slug: 'nomo-nomo-cap-black',
    name: 'Nomo Nomo Cap — Black',
    price: '$40.00 CAD',
    description: 'Unstructured 6-panel cap. Embroidered Nomo Nomo logo. One size fits all.',
    path: '/shop/nomo-nomo/products/nomo-nomo-cap-black',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Black'],
    category: 'Hat',
  },
  {
    slug: 'nomo-nomo-cap-red',
    name: 'Nomo Nomo Cap — Red',
    price: '$40.00 CAD',
    description: 'Unstructured 6-panel cap. Embroidered Nomo Nomo logo in black. Bold statement.',
    path: '/shop/nomo-nomo/products/nomo-nomo-cap-red',
    images: ['https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Red'],
    category: 'Hat',
  },
]

export function getNomoProduct(slug: string) {
  return nomoProducts.find(p => p.slug === slug)
}
