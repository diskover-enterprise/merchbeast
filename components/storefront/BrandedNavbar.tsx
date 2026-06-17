'use client'

import Link from 'next/link'

import { Shop } from '@/types'
import { CartDrawer } from './CartDrawer'
import { ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/useCart'

export function BrandedNavbar({ shop }: { shop: Shop }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'var(--color-primary)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
          color: 'var(--color-secondary)',
          fontFamily: 'var(--font-family)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-14 h-14 flex items-center justify-between">
          <Link
            href={`/shop/${shop.slug}`}
            className="flex items-center gap-3 hover:opacity-70 transition-opacity"
          >
            {shop.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.logo}
                alt={shop.name}
                style={{ height: '80px', width: 'auto' }}
              />
            )}
            <span
              className="text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-secondary)' }}
            >
              {shop.name}
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <a
              href="#collection"
              className="text-[10px] tracking-[0.2em] uppercase hidden sm:block hover:opacity-60 transition-opacity"
              style={{ color: 'var(--color-secondary)' }}
            >
              Shop
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1 hover:opacity-60 transition-opacity"
              style={{ color: 'var(--color-secondary)' }}
              aria-label="Open cart"
            >
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-medium flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
