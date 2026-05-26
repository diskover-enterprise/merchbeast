'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Product, Restaurant } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'

interface Props {
  product: Product
  restaurant: Restaurant
}

export function ProductCard({ product, restaurant }: Props) {
  const { addItem, replaceCartWith, cartRestaurantName } = useCart()
  const [showConflictDialog, setShowConflictDialog] = useState(false)
  const [pendingItem, setPendingItem] = useState<Parameters<typeof addItem>[0] | null>(null)
  const firstImage = product.images[0] ?? null

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    const item = {
      productId: product.id,
      restaurantId: restaurant.id,
      restaurantSlug: restaurant.slug,
      restaurantName: restaurant.name,
      name: product.name,
      price: product.price,
      image: firstImage,
      quantity: 1,
    }
    const result = addItem(item)
    if (result === 'conflict') {
      setPendingItem(item)
      setShowConflictDialog(true)
    }
  }

  function handleReplaceCart() {
    if (pendingItem) {
      replaceCartWith(pendingItem)
    }
    setShowConflictDialog(false)
    setPendingItem(null)
  }

  function handleCancelConflict() {
    setShowConflictDialog(false)
    setPendingItem(null)
  }

  return (
    <>
      <Link
        href={`/shop/${restaurant.slug}/products/${product.id}`}
        className="group block"
      >
        {/* Image */}
        <div className="aspect-square relative flex items-center justify-center">
          {firstImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={firstImage}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:-translate-y-2"
              style={{ filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.13)) drop-shadow(0 2px 8px rgba(0,0,0,0.07))' }}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ backgroundColor: `${restaurant.primaryColor}12` }}
            />
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-end justify-start pb-2">
              <span className="text-[9px] tracking-[0.2em] uppercase font-medium px-2 py-0.5 bg-black/70 text-white">Sold Out</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B]">
            {product.category}
          </span>
          <div className="flex items-start justify-between mt-0.5">
            <h3
              className="text-sm font-medium line-clamp-1 flex-1 pr-2"
              style={{ color: 'var(--color-primary)' }}
            >
              {product.name}
            </h3>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
              {formatCurrency(product.price)}
            </span>
            {product.stock > 0 && (
              <button
                onClick={handleAddToCart}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-wider uppercase underline text-[#0A0A0A]"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Conflict dialog */}
      {showConflictDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white max-w-sm w-full p-6">
            <h3 className="text-sm font-medium tracking-wide text-[#0A0A0A] mb-2">
              Replace your cart?
            </h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6">
              Your cart has items from <span className="font-medium text-[#0A0A0A]">{cartRestaurantName}</span>. Adding this item will clear your cart. Continue?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelConflict}
                className="flex-1 border border-[#E0DFDB] text-xs tracking-[0.15em] uppercase py-3 text-[#6B6B6B] hover:bg-[#F8F7F4] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReplaceCart}
                className="flex-1 bg-[#0A0A0A] text-white text-xs tracking-[0.15em] uppercase py-3 hover:opacity-80 transition-opacity"
              >
                Replace Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
