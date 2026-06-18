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
    slug: 'boasty-sunset-tee-white',
    name: 'Sunset Tee — White',
    price: '$45.00 CAD',
    description: 'Heavyweight cotton tee with a Caribbean sunset graphic. Inspired by golden hour on the water.',
    path: '/shop/boasty-collective/products/boasty-sunset-tee-white',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White'],
    category: 'Tee',
  },
  {
    slug: 'boasty-sunset-tee-black',
    name: 'Sunset Tee — Black',
    price: '$45.00 CAD',
    description: 'Heavyweight cotton tee with a Caribbean sunset graphic. Inspired by golden hour on the water.',
    path: '/shop/boasty-collective/products/boasty-sunset-tee-black',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black'],
    category: 'Tee',
  },
  {
    slug: 'boasty-palm-tee-sand',
    name: 'Palm Tee — Sand',
    price: '$45.00 CAD',
    description: 'Garment-dyed sand tee with bold palm graphic. Easy, breezy island feel.',
    path: '/shop/boasty-collective/products/boasty-palm-tee-sand',
    images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Sand'],
    category: 'Tee',
  },
  {
    slug: 'boasty-palm-tee-teal',
    name: 'Palm Tee — Teal',
    price: '$45.00 CAD',
    description: 'Garment-dyed teal tee with bold palm graphic. The colour of shallow Caribbean water.',
    path: '/shop/boasty-collective/products/boasty-palm-tee-teal',
    images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Teal'],
    category: 'Tee',
  },
  {
    slug: 'boasty-hat-1',
    name: 'Hat 1',
    price: '$50.00 CAD',
    description: 'Caribbean-inspired cap. One size fits all.',
    path: '/shop/boasty-collective/products/boasty-hat-1',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['White'],
    category: 'Hat',
  },
  {
    slug: 'boasty-hat-2',
    name: 'Hat 2',
    price: '$50.00 CAD',
    description: 'Caribbean-inspired cap. One size fits all.',
    path: '/shop/boasty-collective/products/boasty-hat-2',
    images: ['https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Navy'],
    category: 'Hat',
  },
]

export function getBoastyProduct(slug: string) {
  return boastyProducts.find(p => p.slug === slug)
}
