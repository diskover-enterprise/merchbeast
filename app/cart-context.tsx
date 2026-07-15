'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { Product } from './products/products-data'

export type CartItem = {
  product: Product
  quantity: number
  size?: string
  color?: string
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product, size?: string, color?: string) => void
  removeFromCart: (slug: string, size?: string, color?: string) => void
  updateQuantity: (slug: string, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  total: number
  subtotal: number
  count: number
  brandColor: string
  setBrandColor: (color: string) => void
  shopPath: string
  setShopPath: (path: string) => void
}

const CartContext = createContext<CartContextType | null>(null)

function itemKey(slug: string, size?: string, color?: string) {
  return `${slug}__${size || ''}__${color || ''}`
}

function cartStorageKey(shopPath: string) {
  return `mb-cart-${shopPath.replace(/\//g, '-')}`
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [brandColor, setBrandColorState] = useState('#1C2E54')
  const [shopPath, setShopPathState] = useState('')

  // Load items for the current shopPath whenever it changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(cartStorageKey(shopPath))
      setItems(saved ? JSON.parse(saved) : [])
    } catch {}
  }, [shopPath])

  // Restore brandColor on mount (shopPath is always set by the page, never persisted)
  useEffect(() => {
    try {
      const savedColor = localStorage.getItem('mb-cart-brand-color')
      if (savedColor) setBrandColorState(savedColor)
    } catch {}
  }, [])

  // Persist items under the shop-specific key
  useEffect(() => {
    try {
      localStorage.setItem(cartStorageKey(shopPath), JSON.stringify(items))
    } catch {}
  }, [items, shopPath])

  const setBrandColor = useCallback((color: string) => {
    setBrandColorState(color)
    try { localStorage.setItem('mb-cart-brand-color', color) } catch {}
  }, [])

  const setShopPath = useCallback((path: string) => {
    setShopPathState(path)
  }, [])

  const addToCart = useCallback((product: Product, size?: string, color?: string) => {
    setItems(prev => {
      const key = itemKey(product.slug, size, color)
      const existing = prev.find(i => itemKey(i.product.slug, i.size, i.color) === key)
      if (existing) {
        return prev.map(i => itemKey(i.product.slug, i.size, i.color) === key ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { product, quantity: 1, size, color }]
    })
  }, [])

  const removeFromCart = useCallback((slug: string, size?: string, color?: string) => {
    const key = itemKey(slug, size, color)
    setItems(prev => prev.filter(i => itemKey(i.product.slug, i.size, i.color) !== key))
  }, [])

  const updateQuantity = useCallback((slug: string, quantity: number, size?: string, color?: string) => {
    if (quantity < 1) return
    const key = itemKey(slug, size, color)
    setItems(prev => prev.map(i => itemKey(i.product.slug, i.size, i.color) === key ? { ...i, quantity } : i))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    try { localStorage.removeItem(cartStorageKey(shopPath)) } catch {}
  }, [shopPath])

  const total = items.reduce((sum, i) => {
    const price = parseFloat(i.product.price.replace(/[^0-9.]/g, ''))
    return sum + price * i.quantity
  }, 0)

  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, subtotal: total, count, brandColor, setBrandColor, shopPath, setShopPath }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
