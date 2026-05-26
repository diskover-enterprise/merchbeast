'use client'

import Link from 'next/link'
import { ShoppingCart, User, LogOut, Package } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { CartDrawer } from './CartDrawer'
import { useCart } from '@/hooks/useCart'
import { useSession, signOut } from 'next-auth/react'

export function MarketplaceNavbar() {
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount, mounted } = useCart()
  const { data: session } = useSession()
  const menuRef = useRef<HTMLDivElement>(null)

  const isCustomer = session?.user?.role === 'customer'

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#F8F7F4] border-b border-[#E0DFDB]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-sans text-sm font-semibold tracking-[0.15em] uppercase text-[#0A0A0A]"
          >
            MERCH MARKET
          </Link>

          <div className="flex items-center gap-4">
            {/* Account area */}
            {isCustomer ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-[#0A0A0A] hover:opacity-60 transition-opacity"
                >
                  <div className="w-6 h-6 bg-[#0A0A0A] text-white flex items-center justify-center text-xs font-medium">
                    {session.user?.name?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <span className="hidden sm:block tracking-wide">{session.user?.name}</span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#E0DFDB] z-50">
                    <Link
                      href="/account/orders"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-xs tracking-wider uppercase text-[#0A0A0A] hover:bg-[#F8F7F4] transition-colors"
                    >
                      <Package size={13} /> My Orders
                    </Link>
                    <button
                      onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/' }) }}
                      className="flex items-center gap-2 w-full px-4 py-3 text-xs tracking-wider uppercase text-[#0A0A0A] hover:bg-[#F8F7F4] border-t border-[#E0DFDB] transition-colors"
                    >
                      <LogOut size={13} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/account/login"
                  className="flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
                >
                  <User size={14} /> Sign In
                </Link>
                <Link
                  href="/account/signup"
                  className="hidden sm:inline-block border border-black px-3 py-1.5 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1.5 hover:opacity-60 transition-opacity text-[#0A0A0A]"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0A0A0A] text-white text-[10px] font-medium flex items-center justify-center">
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
