export type IslandProduct = {
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

export const islandProducts: IslandProduct[] = [
  {
    slug: 'island-apparel-sunset-tee-white',
    name: 'Sunset Tee — White',
    price: '$45.00 CAD',
    description: 'Heavyweight cotton tee with a Caribbean sunset graphic. Inspired by golden hour on the water.',
    path: '/shop/island-apparel/products/island-apparel-sunset-tee-white',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White'],
    category: 'Tee',
  },
  {
    slug: 'island-apparel-sunset-tee-black',
    name: 'Sunset Tee — Black',
    price: '$45.00 CAD',
    description: 'Heavyweight cotton tee with a Caribbean sunset graphic. Inspired by golden hour on the water.',
    path: '/shop/island-apparel/products/island-apparel-sunset-tee-black',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black'],
    category: 'Tee',
  },
  {
    slug: 'island-apparel-palm-tee-sand',
    name: 'Palm Tee — Sand',
    price: '$45.00 CAD',
    description: 'Garment-dyed sand tee with bold palm graphic. Easy, breezy island feel.',
    path: '/shop/island-apparel/products/island-apparel-palm-tee-sand',
    images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Sand'],
    category: 'Tee',
  },
  {
    slug: 'island-apparel-palm-tee-teal',
    name: 'Palm Tee — Teal',
    price: '$45.00 CAD',
    description: 'Garment-dyed teal tee with bold palm graphic. The colour of shallow Caribbean water.',
    path: '/shop/island-apparel/products/island-apparel-palm-tee-teal',
    images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Teal'],
    category: 'Tee',
  },
  {
    slug: 'island-apparel-wave-tee-white',
    name: 'Wave Tee — White',
    price: '$48.00 CAD',
    description: 'Oversized cut with a hand-drawn wave graphic. Made for the water.',
    path: '/shop/island-apparel/products/island-apparel-wave-tee-white',
    images: ['https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White'],
    category: 'Tee',
  },
  {
    slug: 'island-apparel-coral-crewneck-sand',
    name: 'Coral Crewneck — Sand',
    price: '$75.00 CAD',
    description: 'Premium fleece crewneck with embroidered coral reef graphic. Sun-faded sand colourway.',
    path: '/shop/island-apparel/products/island-apparel-coral-crewneck-sand',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Sand'],
    category: 'Crewneck',
  },
  {
    slug: 'island-apparel-coral-crewneck-navy',
    name: 'Coral Crewneck — Navy',
    price: '$75.00 CAD',
    description: 'Premium fleece crewneck with embroidered coral reef graphic. Deep ocean navy colourway.',
    path: '/shop/island-apparel/products/island-apparel-coral-crewneck-navy',
    images: ['https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Navy'],
    category: 'Crewneck',
  },
  {
    slug: 'island-apparel-island-cap-white',
    name: 'Island Cap — White',
    price: '$40.00 CAD',
    description: 'Unstructured 6-panel cap with embroidered Island Apparel script. One size fits all.',
    path: '/shop/island-apparel/products/island-apparel-island-cap-white',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['White'],
    category: 'Hat',
  },
  {
    slug: 'island-apparel-island-cap-navy',
    name: 'Island Cap — Navy',
    price: '$40.00 CAD',
    description: 'Unstructured 6-panel cap with embroidered Island Apparel script. One size fits all.',
    path: '/shop/island-apparel/products/island-apparel-island-cap-navy',
    images: ['https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Navy'],
    category: 'Hat',
  },
]

export function getIslandProduct(slug: string) {
  return islandProducts.find(p => p.slug === slug)
}
