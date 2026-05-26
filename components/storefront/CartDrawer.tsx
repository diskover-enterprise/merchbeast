'use client'

import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/lib/utils'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: Props) {
  const { cart, removeItem, updateQuantity, total, mounted } = useCart()

  if (!mounted) return null

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0DFDB]">
          <h2 className="text-xs tracking-[0.2em] uppercase font-medium text-[#0A0A0A]">
            Cart
          </h2>
          <button
            onClick={onClose}
            className="text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={36} className="text-[#E0DFDB] mb-4" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#6B6B6B]">Your cart is empty</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E0DFDB]">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex gap-4 py-4">
                  <div className="w-14 h-14 overflow-hidden bg-[#F0EFEC] shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F0EFEC]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0A0A0A] truncate">{item.name}</p>
                    <p className="text-[10px] tracking-wider uppercase text-[#6B6B6B] mt-0.5">{item.restaurantName}</p>
                    <p className="text-sm font-medium text-[#0A0A0A] mt-1">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                    <div className="flex items-center border border-[#E0DFDB]">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#F8F7F4] transition-colors text-[#0A0A0A]"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-xs text-[#0A0A0A]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#F8F7F4] transition-colors text-[#0A0A0A]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="px-6 py-6 border-t border-[#E0DFDB]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-[0.2em] uppercase text-[#6B6B6B]">Total</span>
              <span className="text-base font-medium text-[#0A0A0A]">{formatCurrency(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-[#0A0A0A] text-white text-xs tracking-[0.2em] uppercase py-4 hover:opacity-80 transition-opacity"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
