export type BarBravoProduct = {
  slug: string
  name: string
  price: string
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  category: 'Tee' | 'Hat'
  tag: 'Tee' | 'Hat'
  path: string
  shopifyUrl: string
}

export const barBravoProducts: BarBravoProduct[] = [
  {
    slug: 'bar-bravo-tee-navy',
    name: 'Bar Bravo Tee — Navy',
    price: '45.00',
    description: 'Classic heavyweight tee in deep navy. Screen-printed Bar Bravo script logo on the chest.',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy'],
    category: 'Tee',
    tag: 'Tee',
    path: '/shop/bar-bravo/products/bar-bravo-tee-navy',
    shopifyUrl: '',
  },
  {
    slug: 'bar-bravo-tee-cream',
    name: 'Bar Bravo Tee — Cream',
    price: '45.00',
    description: 'Soft parchment cream tee with the Bar Bravo script logo. Pairs perfectly with jeans after a long shift.',
    images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Cream'],
    category: 'Tee',
    tag: 'Tee',
    path: '/shop/bar-bravo/products/bar-bravo-tee-cream',
    shopifyUrl: '',
  },
  {
    slug: 'bar-bravo-hat-navy',
    name: 'Bar Bravo Cap — Navy',
    price: '38.00',
    description: 'Structured 6-panel cap in navy twill. Embroidered Bar Bravo logo. Adjustable snapback.',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Navy'],
    category: 'Hat',
    tag: 'Hat',
    path: '/shop/bar-bravo/products/bar-bravo-hat-navy',
    shopifyUrl: '',
  },
  {
    slug: 'bar-bravo-hat-cream',
    name: 'Bar Bravo Cap — Cream',
    price: '38.00',
    description: 'Unstructured dad cap in warm cream. Tone-on-tone embroidered logo. Adjustable strap.',
    images: ['https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Cream'],
    category: 'Hat',
    tag: 'Hat',
    path: '/shop/bar-bravo/products/bar-bravo-hat-cream',
    shopifyUrl: '',
  },
]

export function getBarBravoProduct(slug: string) {
  return barBravoProducts.find(p => p.slug === slug)
}
