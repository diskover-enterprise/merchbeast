// Belli Goods storefront content: copy, navigation, ticker words and imagery.
// Edit here to change the page without touching components.
import type { BelliCategory } from './belli-products-data'

export const BELLI_PATH = '/shop/belli'

// Official Belli script logo, as published on belli.pizza
// TODO(belli): host copies from Belli's brand files instead of linking their Squarespace CDN.
export const BELLI_LOGO_LIGHT = 'https://images.squarespace-cdn.com/content/v1/68bf961395c0793cecc7c208/bd4c557e-a5d2-4641-87cf-fe3148a5a73d/belli_logo_light%402x.png'
export const BELLI_LOGO_DARK = 'https://images.squarespace-cdn.com/content/v1/68bf961395c0793cecc7c208/296a6f1f-3274-4bf6-9293-3363f8731e6a/belli_logo_dark%402x.png?format=1500w'

export const nav = [
  { label: 'Merch', href: `${BELLI_PATH}#merch` },
  { label: 'Shipping', href: `${BELLI_PATH}/shipping-returns#shipping` },
  { label: 'Returns', href: `${BELLI_PATH}/shipping-returns#returns` },
]

export const hero = {
  lines: ['Belli', 'Goods'],
  sub: ['Merch from your', 'neighbourhood pizzeria.'],
  image: '/belli/hero-trackies.jpg',
  imageAlt: 'Three men laughing over pizza in Belli velour tracksuits and a Belli cap',
}

/** Words in the scrolling ticker, in order. */
export const ticker = ['Tees', 'Hoodies', 'Crewnecks', 'Totes', 'Hats', 'Swag']

export const merch = {
  title: 'The Goods',
  sub: 'Tees, hoodies, hats and more from Belli.',
}

export const categoryFilters: { key: BelliCategory; label: string }[] = [
  { key: 'tees', label: 'Tees' },
  { key: 'hoodies', label: 'Hoodies' },
  { key: 'crewnecks', label: 'Crewnecks' },
  { key: 'hats', label: 'Hats' },
  { key: 'totes', label: 'Totes' },
  { key: 'accessories', label: 'Accessories' },
]

export const lifestyle = {
  lines: ['Good pizza.', 'Good goods.'],
  body: 'NY-style pies, natural wine and a neighbourhood table in Vancouver. Now you can take a bit of it home.',
  cta: { label: 'Shop merch', href: `${BELLI_PATH}#merch` },
  link: { label: 'Order pizza', href: 'https://www.belli.pizza/' },
  // Photos from belli.pizza
  images: [
    { src: 'https://images.squarespace-cdn.com/content/v1/68bf961395c0793cecc7c208/58f864bb-00e6-4246-b2ef-84ed17a0882c/belli+pizza_picture+06.jpg?format=1500w', alt: 'Friends around a table sharing pizza and drinks at Belli' },
    { src: 'https://images.squarespace-cdn.com/content/v1/68bf961395c0793cecc7c208/72e31e6a-8513-4e33-902f-4df6b0aec0bc/belli+pizza_picture+05.jpg?format=1500w', alt: 'A Belli pizza in an open box' },
  ],
}

export const footer = {
  links: [
    { label: 'Shop', href: `${BELLI_PATH}#merch` },
    { label: 'Shipping', href: `${BELLI_PATH}/shipping-returns#shipping` },
    { label: 'Returns', href: `${BELLI_PATH}/shipping-returns#returns` },
    { label: 'Contact', href: 'mailto:team@merchbeast.shop' },
    { label: 'Instagram', href: 'https://www.instagram.com/belli.pizza/' },
  ],
  restaurant: { label: 'belli.pizza', href: 'https://www.belli.pizza/' },
}
