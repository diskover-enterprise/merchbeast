'use client'

import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/lib/utils'
import { MarketplaceNavbar } from '@/components/storefront/MarketplaceNavbar'
import { Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeItem, updateQuantity, total, mounted } = useCart()

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col">
      <MarketplaceNavbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cart.items.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <ShoppingBag size={64} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl mb-6">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
            >
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.restaurantName}</p>
                    <p className="font-bold text-gray-800 mt-1">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeItem(item.productId)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-gray-100 font-bold"
                      >
                        −
                      </button>
                      <span className="px-2 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-gray-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-gray-600">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold">{formatCurrency(total)}</span>
              </div>
              <Link
                href="/checkout"
                className="block w-full text-center bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-700 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
