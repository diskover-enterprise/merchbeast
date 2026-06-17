'use client'

import { useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCart } from '../../cart-context'

const BRANDS: Record<string, { name: string; shopPath: string; bg: string; color: string; accent: string; font: string }> = {
  'the-1982': {
    name: 'The 1982',
    shopPath: '/shop/the-1982',
    bg: '#fff',
    color: '#111',
    accent: '#111',
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  'nomo-nomo': {
    name: 'Nomo Nomo',
    shopPath: '/shop/nomo-nomo',
    bg: '#0d0d0d',
    color: '#fff',
    accent: '#C41E1E',
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  'island-apparel': {
    name: 'Island Apparel',
    shopPath: '/shop/island-apparel',
    bg: '#f9f6f0',
    color: '#1a1a2e',
    accent: '#003A5C',
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  'lunch-lady': {
    name: 'Lunch Lady',
    shopPath: '/shop/lunch-lady',
    bg: '#fafafa',
    color: '#111',
    accent: '#C84020',
    font: 'Georgia, serif',
  },
}

function SuccessContent() {
  const { clearCart } = useCart()
  const params = useSearchParams()
  const shop = params.get('shop') || 'lunch-lady'
  const brand = BRANDS[shop] || BRANDS['lunch-lady']

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div style={{ fontFamily: brand.font, background: brand.bg, color: brand.color, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <nav style={{ height: 64, background: brand.bg, borderBottom: `1px solid ${brand.color === '#fff' ? 'rgba(255,255,255,0.08)' : '#e8e8e8'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href={brand.shopPath} style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: brand.color === '#fff' ? 'rgba(255,255,255,0.4)' : '#888', textDecoration: 'none' }}>
          ← Back to Shop
        </Link>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: brand.color }}>
          {brand.name}
        </span>
      </nav>

      {/* BODY */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>

          {/* Check */}
          <div style={{ width: 72, height: 72, borderRadius: '50%', border: `2px solid ${brand.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: 28, color: brand.accent }}>
            ✓
          </div>

          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 16, color: brand.color }}>
            Order Confirmed
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: brand.color === '#fff' ? 'rgba(255,255,255,0.55)' : '#666', marginBottom: 40 }}>
            Thanks for your order. You&apos;ll receive a confirmation email shortly. We&apos;ll get your gear into production right away.
          </p>

          <Link href={brand.shopPath} style={{ display: 'inline-block', padding: '14px 36px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, background: brand.accent, color: '#fff', textDecoration: 'none' }}>
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${brand.color === '#fff' ? 'rgba(255,255,255,0.08)' : '#e8e8e8'}`, padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', color: brand.color }}>{brand.name}</span>
        <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: brand.color === '#fff' ? 'rgba(255,255,255,0.3)' : '#bbb' }}>Powered by Merch Beast</span>
      </footer>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
