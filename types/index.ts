export interface Restaurant {
  id: string
  name: string
  slug: string
  description: string
  logo: string | null
  bannerImage: string | null
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  ownerEmail?: string
  tagline?: string | null
  about?: string | null
  heroHeadline?: string | null
  instagram?: string | null
  websiteUrl?: string | null
  address?: string | null
  createdAt: Date
}

export interface Product {
  id: string
  restaurantId: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  stock: number
  createdAt: Date
  restaurant?: Restaurant
}

export interface Customer {
  id: string
  email: string
  name: string
  createdAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  priceAtPurchase: number
  product?: Product
}

export interface Order {
  id: string
  customerId: string
  restaurantId: string
  status: 'pending' | 'paid' | 'fulfilled' | 'cancelled'
  total: number
  stripePaymentId: string | null
  createdAt: Date
  customer?: Customer
  items?: OrderItem[]
  restaurant?: Restaurant
}

export interface CartItem {
  productId: string
  restaurantId: string
  restaurantSlug: string
  restaurantName: string
  name: string
  price: number
  image: string | null
  quantity: number
}

export interface Cart {
  items: CartItem[]
}

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string
      restaurantId?: string
      customerId?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
