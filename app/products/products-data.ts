export type Product = {
  slug: string
  name: string
  price: string
  description: string
  shopifyUrl: string
  path: string
  images: string[]
  sizes?: string[]
  colors?: string[]
  tag?: string
}

export const products: Product[] = [
  {
    slug: 'lunch-lady-scooter-nap-tee',
    name: 'Lunch Lady — Scooter Take a Nap Tee',
    price: '$45.00 CAD',
    description: 'Signature Lunch Lady tee printed on Comfort Colours premium quality material. Bold graphics, heavyweight feel.',
    shopifyUrl: 'https://merchbeast.shop/collections/lunch-lady/products/lunch-lady-scooter-nap-tee',
    path: '/collections/lunch-lady/products/lunch-lady-scooter-nap-tee',
    images: [
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/1_dfd19b03-6acf-403b-afa0-e953c560678b.png?v=1749521801',
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/2_c18845f2-d05c-472f-90d0-4679155647bc.png?v=1749521801',
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/3_cc4a2969-ff24-49a7-9f90-926a343da9cb.png?v=1749521801',
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/4_265960c1-fe2c-46b6-8a6a-d345731a01c9.png?v=1749521801',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    tag: 'Tee',
  },
  {
    slug: 'copy-of-lunch-lady-legacy-crewneck-grey',
    name: 'Lunch Lady — Legacy Crewneck Grey',
    price: '$65.00 CAD',
    description: 'The Legacy Crewneck in grey. Premium heavyweight fleece built to last.',
    shopifyUrl: 'https://merchbeast.shop/products/copy-of-lunch-lady-legacy-crewneck-grey',
    path: '/products/copy-of-lunch-lady-legacy-crewneck-grey',
    images: [
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/1.jpg?v=1711413610',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tag: 'Crewneck',
  },
  {
    slug: 'lunch-lady-legacy-crewneck-black',
    name: 'Lunch Lady — Legacy Crewneck Black',
    price: '$65.00 CAD',
    description: 'The Legacy Crewneck in black. Premium heavyweight fleece built to last.',
    shopifyUrl: 'https://merchbeast.shop/products/lunch-lady-legacy-crewneck-black',
    path: '/products/lunch-lady-legacy-crewneck-black',
    images: [
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/3.jpg?v=1711413689',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tag: 'Crewneck',
  },
  {
    slug: 'lunch-lady-legacy-crewneck-navy',
    name: 'Lunch Lady — Legacy Crewneck Royal',
    price: '$65.00 CAD',
    description: 'The Legacy Crewneck in royal blue. Premium heavyweight fleece built to last.',
    shopifyUrl: 'https://merchbeast.shop/products/lunch-lady-legacy-crewneck-navy',
    path: '/products/lunch-lady-legacy-crewneck-navy',
    images: [
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/2.jpg?v=1711413648',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tag: 'Crewneck',
  },
  {
    slug: 'lunch-lady-new-era-trucker-cap-black-black',
    name: 'Lunch Lady — New Era Trucker Cap Black/Black',
    price: '$55.00 CAD',
    description: 'New Era quality with expertly embroidered Lunch Lady branding. Adjustable back strap for a perfect fit.',
    shopifyUrl: 'https://merchbeast.shop/collections/lunch-lady/products/lunch-lady-new-era-trucker-cap-black-black',
    path: '/collections/lunch-lady/products/lunch-lady-new-era-trucker-cap-black-black',
    images: [
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/4_2f94b6b8-6070-4c81-b3f8-52005c23c7f0.png?v=1697578878',
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/5.png?v=1697578878',
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/6.png?v=1697578879',
    ],
    tag: 'Cap',
  },
  {
    slug: 'lunch-lady-new-era-trucker-cap-white-navy',
    name: 'Lunch Lady — New Era Trucker Cap White/Navy',
    price: '$55.00 CAD',
    description: 'New Era quality with expertly embroidered Lunch Lady branding. Adjustable back strap for a perfect fit.',
    shopifyUrl: 'https://merchbeast.shop/collections/lunch-lady/products/lunch-lady-new-era-trucker-cap-white-navy',
    path: '/collections/lunch-lady/products/lunch-lady-new-era-trucker-cap-white-navy',
    images: [
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/3_6b0bb43d-fb81-4c5d-b697-44749ab9c579.png?v=1697578843',
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/2_d5a32b15-cfdc-4e46-aa61-afb024c05c51.png?v=1697578844',
      'https://cdn.shopify.com/s/files/1/0831/9654/3268/files/1_ff6a5771-b1b1-42d7-a607-018a325c8573.png?v=1697578843',
    ],
    tag: 'Cap',
  },
]

export function getProduct(slug: string) {
  return products.find(p => p.slug === slug)
}
