'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { Product } from './products/products-data'

export type CartItem = {
  product: Product
  quantity: number
  size?: string
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product, size?: string) => void
  removeFromCart: (slug: string, size?: string) => void
  updateQuantity: (slug: string, quantity: number, size?: string) => void
  clearCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

function itemKey(slug: string, size?: string) {
  return size ? `${slug}__${size}` : slug
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Persist cart to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mb-cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('mb-cart', JSON.stringify(items))
    } catch {}
  }, [items])

  const addToCart = useCallback((product: Product, size?: string) => {
    setItems(prev => {
      const key = itemKey(product.slug, size)
      const existing = prev.find(i => itemKey(i.product.slug, i.size) === key)
      if (existing) {
        return prev.map(i => itemKey(i.product.slug, i.size) === key ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { product, quantity: 1, size }]
    })
  }, [])

  const removeFromCart = useCallback((slug: string, size?: string) => {
    const key = itemKey(slug, size)
    setItems(prev => prev.filter(i => itemKey(i.product.slug, i.size) !== key))
  }, [])

  const updateQuantity = useCallback((slug: string, quantity: number, size?: string) => {
    if (quantity < 1) return
    const key = itemKey(slug, size)
    setItems(prev => prev.map(i => itemKey(i.product.slug, i.size) === key ? { ...i, quantity } : i))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    try { localStorage.removeItem('mb-cart') } catch {}
  }, [])

  const total = items.reduce((sum, i) => {
    const price = parseFloat(i.product.price.replace(/[^0-9.]/g, ''))
    return sum + price * i.quantity
  }, 0)

  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
