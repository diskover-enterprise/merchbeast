export type The1982Product = {
  slug: string
  name: string
  price: string
  description: string
  path: string
  images: string[]
  sizes?: string[]
  colors?: string[]
  tag?: string
  category?: string
}

export const the1982Products: The1982Product[] = [
  {
    slug: 'kobe-bryant-forever-mamba',
    name: 'Kobe Bryant "Forever Mamba"',
    price: '$60.00 CAD',
    description: 'A timeless tribute to the legendary basketball icon featuring embroidered jersey numbers 8 and 24 on the sleeves and iconic photographs on the front showcasing his athleticism and passion for basketball.',
    path: '/shop/the-1982/products/kobe-bryant-forever-mamba',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/kbblack.png?v=1684891957',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/kbwhite.png?v=1684891995',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/kbvintage.png?v=1684891978',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'White', 'Vintage Black'],
    category: 'Tee',
  },
  {
    slug: 'allen-iverson',
    name: 'Allen Iverson',
    price: '$50.00 CAD',
    description: 'Vintage by Design. Oversized street style fit paying tribute to one of the most electrifying players to ever lace up.',
    path: '/shop/the-1982/products/allen-iverson',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/iversonblack.jpg?v=1685646004',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/iversonwhite.jpg?v=1685646014',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/iversonvintageblack.jpg?v=1685646008',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'White', 'Vintage Black'],
    category: 'Tee',
  },
  {
    slug: 'allen-iverson-draft-day-tee',
    name: 'Allen Iverson — Draft Day Tee',
    price: '$45.00 CAD',
    description: 'Vintage by Design. Capturing the moment AI entered the league and changed the game forever.',
    path: '/shop/the-1982/products/allen-iverson-draft-day-tee',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/Iversondraftday.png?v=1705355175',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black'],
    category: 'Draft Day',
  },
  {
    slug: 'ja-morant',
    name: 'Ja Morant',
    price: '$50.00 CAD',
    description: 'Celebrates Morant\'s NCAA assist leadership and his historic 40+ point, 10+ assist, 5+ steal game. Accolades include NBA Rookie of the Year (2020), NBA All-Star (2022), All-NBA Second Team (2022), NBA Most Improved Player (2022). Oversized street style fit.',
    path: '/shop/the-1982/products/ja-morant',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/jamorantblack.jpg?v=1684895154',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/jamorantwhite.jpg?v=1684895128',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/jamorantvintageblack.jpg?v=1684895141',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'White', 'Vintage Black'],
    category: 'Tee',
  },
  {
    slug: 'jason-williams-white-chocolate',
    name: 'Jason Williams aka "White Chocolate"',
    price: '$50.00 CAD',
    description: 'Vintage by Design. Honouring the most creative passer the game has ever seen.',
    path: '/shop/the-1982/products/jason-williams-white-chocolate',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/1_2020e493-886a-43c8-b065-e2ef405515f2.jpg?v=1714640546',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/2_3f794782-cee5-419a-8d1e-fa39e9b672df.jpg?v=1714640547',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/3_d8a33f54-e9dc-4dbe-a78e-b926e63fa64d.jpg?v=1714640546',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Vintage Black', 'White', 'Black'],
    category: 'Tee',
  },
  {
    slug: 'jordan-clarkson',
    name: 'Jordan Clarkson',
    price: '$50.00 CAD',
    description: 'Oversized street style look celebrating one of the most exciting sixth men in NBA history.',
    path: '/shop/the-1982/products/jordan-clarkson',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/jordanclarksonblack.jpg?v=1684894699',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/jordanclarksonwhite.jpg?v=1684894668',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/Jordanclarksonvintageblack.jpg?v=1684894683',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'White', 'Vintage Black'],
    category: 'Tee',
  },
  {
    slug: 'lebron-james',
    name: 'LeBron James',
    price: '$50.00 CAD',
    description: 'Oversized street style look. A tribute to the King — four championships, four Finals MVPs, and a legacy unmatched.',
    path: '/shop/the-1982/products/lebron-james',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/lebronjamesblack.jpg?v=1684894565',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/lebronjameswhite.jpg?v=1684894524',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/lebronjamesvintage.jpg?v=1684894538',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'White', 'Vintage Black'],
    category: 'Tee',
  },
  {
    slug: 'lebron-james-draft-day-tee',
    name: 'LeBron James — Draft Day Tee',
    price: '$45.00 CAD',
    description: 'Vintage by Design. The moment the chosen one arrived.',
    path: '/shop/the-1982/products/lebron-james-draft-day-tee',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/lebrondraftdaytee.png?v=1705355233',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black'],
    category: 'Draft Day',
  },
  {
    slug: 'stephen-curry-draft-day-tee',
    name: 'Stephen Curry — Draft Day Tee',
    price: '$45.00 CAD',
    description: 'Vintage by Design. The moment that started the greatest shooting career in NBA history.',
    path: '/shop/the-1982/products/stephen-curry-draft-day-tee',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/stephcurrydraftdaytee.png?v=1705355258',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black'],
    category: 'Draft Day',
  },
  {
    slug: 'kobe-bryant-draft-day-tee',
    name: 'Kobe Bryant — Draft Day Tee',
    price: '$45.00 CAD',
    description: 'Vintage by Design. The day the Mamba entered the league at 17 years old.',
    path: '/shop/the-1982/products/kobe-bryant-draft-day-tee',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/kobedraftdayupdatedfinal.png?v=1705355024',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black'],
    category: 'Draft Day',
  },
  {
    slug: 'the-goats-kobe-x-mike',
    name: 'The Goats — Kobe x Mike',
    price: '$50.00 CAD',
    description: 'Kobe and Mike collide in championship fashion. Pay tribute to the GOATs of the game.',
    path: '/shop/the-1982/products/the-goats-kobe-x-mike',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/2.jpg?v=1714295626',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/1.jpg?v=1714295658',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/3.jpg?v=1714295665',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Vintage Black', 'White', 'Black'],
    category: 'Tee',
  },
  {
    slug: 'victor-wembanyama',
    name: 'Victor Wembanyama',
    price: '$50.00 CAD',
    description: 'Vintage by Design. The alien has landed. Celebrating the most unique talent the NBA has ever seen.',
    path: '/shop/the-1982/products/victor-wembanyama',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/Wembyblack.jpg?v=1699037681',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/Wembywhite.jpg?v=1699037681',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/Wembyvintage.jpg?v=1699037681',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Vintage Black'],
    category: 'Tee',
  },
  {
    slug: 'charlotte-hornets-crewneck',
    name: 'Charlotte Hornets Crewneck',
    price: '$50.00 CAD',
    description: 'Our crewnecks fit with unisex sizing. Celebrating one of the most iconic jerseys in NBA history.',
    path: '/shop/the-1982/products/charlotte-hornets-crewneck',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/hornetsgrey.png?v=1700814899',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/hornetscrewblack.png?v=1700814899',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black'],
    category: 'Crewneck',
  },
  {
    slug: 'vancouver-grizzlies-crewneck',
    name: 'Vancouver Grizzlies Crewneck',
    price: '$50.00 CAD',
    description: 'Our crewnecks fit with unisex sizing. A tribute to one of the most beloved franchises that never should have left.',
    path: '/shop/the-1982/products/vancouver-grizzlies-crewneck',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/grizzliescrewnecklack.png',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/VancouverGrizzliesGrey.png',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey'],
    category: 'Crewneck',
  },
  {
    slug: 'seattle-supersonics-crewneck',
    name: 'Seattle Supersonics Crewneck',
    price: '$50.00 CAD',
    description: 'Our crewnecks fit with unisex sizing. Celebrating one of the greatest teams and cities the NBA has ever seen.',
    path: '/shop/the-1982/products/seattle-supersonics-crewneck',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/sonicscrewneck_e1c19114-41b1-40e8-86af-0c3cd1a99057.png?v=1700369492',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/sonicsblack.png?v=1700814318',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/sonicsgrey.png?v=1700814320',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Green', 'Black', 'Grey'],
    category: 'Crewneck',
  },
  {
    slug: 'rock-chalk-ku-big-men',
    name: 'Rock Chalk — KU Big Men',
    price: '$50.00 CAD',
    description: 'Celebrating some of the best Bigs from Kansas University. Rock Chalk, Jayhawk.',
    path: '/shop/the-1982/products/rock-chalk-ku-big-men',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/3_bf214c14-d95b-419f-85b4-efdf76459fb0.jpg?v=1717705467',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/2_d0bd1637-c991-4b11-8cc7-af2844f1ca67.jpg?v=1717705467',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/1_9f4dfa56-16e5-48b6-99aa-a840091f0eca.jpg?v=1717705467',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Vintage Black'],
    category: 'Tee',
  },
  {
    slug: 'unlv-running-rebels-crewneck',
    name: 'UNLV Running Rebels Crewneck',
    price: '$50.00 CAD',
    description: 'Our crewnecks fit with unisex sizing. A tribute to one of the most dominant college basketball programs of all time.',
    path: '/shop/the-1982/products/unlv-running-rebels-crewneck',
    images: [
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/unlvsweater_1.png?v=1700369881',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/UNLVBLACK.png?v=1700813769',
      'https://cdn.shopify.com/s/files/1/0633/8258/5529/files/UNLVGrey.png?v=1700814021',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Black', 'Grey'],
    category: 'Crewneck',
  },
]

export function getThe1982Product(slug: string) {
  return the1982Products.find(p => p.slug === slug)
}
