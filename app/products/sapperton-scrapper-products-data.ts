export type SappertonProduct = {
  slug: string
  name: string
  price: string
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  tag: 'Tee' | 'Hat'
  category: 'Tee' | 'Hat'
  path: string
  shopifyUrl: string
}

export const sappertonProducts: SappertonProduct[] = [
  {
    slug: 'sapperton-scrapper-tee-black',
    name: 'Scrapper Tee — Black',
    price: '45',
    description: 'Heavyweight cotton tee. Built for the gym, worn everywhere else. Screen-printed Sapperton Scrapper logo front and centre.',
    images: ['/sapperton-tee-black.png', '/sapperton-front.png', '/sapperton-back.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    tag: 'Tee',
    category: 'Tee',
    path: '/shop/sapperton-scrapper/products/sapperton-scrapper-tee-black',
    shopifyUrl: '',
  },
  {
    slug: 'sapperton-scrapper-tee-white',
    name: 'Scrapper Tee — White',
    price: '45',
    description: 'Heavyweight cotton tee in clean white. Sapperton Scrapper logo printed in bold black and red.',
    images: ['/sapperton-tee-white.png', '/sapperton-front.png', '/sapperton-back.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
    tag: 'Tee',
    category: 'Tee',
    path: '/shop/sapperton-scrapper/products/sapperton-scrapper-tee-white',
    shopifyUrl: '',
  },
  {
    slug: 'sapperton-scrapper-tee-red',
    name: 'Scrapper Tee — Red',
    price: '45',
    description: 'Fight-night red. Heavyweight cotton with the Sapperton Scrapper script across the chest.',
    images: ['/sapperton-tee-red.png', '/sapperton-front.png', '/sapperton-back.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red'],
    tag: 'Tee',
    category: 'Tee',
    path: '/shop/sapperton-scrapper/products/sapperton-scrapper-tee-red',
    shopifyUrl: '',
  },
  {
    slug: 'sapperton-scrapper-snapback',
    name: 'Scrapper Snapback',
    price: '40',
    description: 'Structured snapback cap. Embroidered Sapperton Scrapper logo. One size fits all.',
    images: ['/sapperton-logo.png'],
    sizes: ['One Size'],
    colors: ['Black'],
    tag: 'Hat',
    category: 'Hat',
    path: '/shop/sapperton-scrapper/products/sapperton-scrapper-snapback',
    shopifyUrl: '',
  },
]
