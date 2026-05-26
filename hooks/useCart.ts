'use client'

import { useState, useEffect, useCallback } from 'react'
import { Cart, CartItem } from '@/types'

const CART_KEY = 'afterdessert_cart'
const emptyCart: Cart = { items: [] }

function readCart(): Cart {
  if (typeof window === 'undefined') return emptyCart
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : emptyCart
  } catch {
    return emptyCart
  }
}

function writeCart(cart: Cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function useCart() {
  const [cart, setCart] = useState<Cart>(emptyCart)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCart(readCart())
    setMounted(true)
  }, [])

  const saveCart = useCallback((updated: Cart) => {
    writeCart(updated)
    setCart(updated)
  }, [])

  // Returns 'added' | 'conflict' — caller shows confirm dialog on conflict
  const addItem = useCallback(
    (item: CartItem): 'added' | 'conflict' => {
      const current = readCart()
      const currentRestaurantId = current.items[0]?.restaurantId
      if (currentRestaurantId && currentRestaurantId !== item.restaurantId) {
        return 'conflict'
      }
      const existing = current.items.findIndex((i) => i.productId === item.productId)
      if (existing >= 0) {
        current.items[existing].quantity += item.quantity
      } else {
        current.items.push(item)
      }
      saveCart(current)
      return 'added'
    },
    [saveCart]
  )

  // Used after user confirms replacing cart from a different restaurant
  const replaceCartWith = useCallback(
    (item: CartItem) => {
      saveCart({ items: [item] })
    },
    [saveCart]
  )

  const removeItem = useCallback(
    (productId: string) => {
      const current = readCart()
      current.items = current.items.filter((i) => i.productId !== productId)
      saveCart(current)
    },
    [saveCart]
  )

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      const current = readCart()
      if (quantity <= 0) {
        current.items = current.items.filter((i) => i.productId !== productId)
      } else {
        const item = current.items.find((i) => i.productId === productId)
        if (item) item.quantity = quantity
      }
      saveCart(current)
    },
    [saveCart]
  )

  const clearCart = useCallback(() => {
    saveCart(emptyCart)
  }, [saveCart])

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0)
  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const cartRestaurantId = cart.items[0]?.restaurantId ?? null
  const cartRestaurantSlug = cart.items[0]?.restaurantSlug ?? null
  const cartRestaurantName = cart.items[0]?.restaurantName ?? null

  return {
    cart,
    mounted,
    addItem,
    replaceCartWith,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    total,
    cartRestaurantId,
    cartRestaurantSlug,
    cartRestaurantName,
  }
}
