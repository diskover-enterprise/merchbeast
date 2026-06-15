'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../../cart-context'
import '../../merch-homepage.css'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="mb-page">

      <header className="mb-nav">
        <a href="/" className="mb-logo">
          <span className="mb-logo-dot" />
          MERCH&nbsp;BEAST
        </a>
        <nav className="mb-nav-links">
          <a href="/products" style={{color:'var(--green)'}}>Shop</a>
        </nav>
      </header>

      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1rem',
      }}>
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(57,255,20,0.15)',
            border: '2px solid var(--green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '2rem',
          }}>✓</div>
          <h1 style={{
            fontFamily: 'var(--font-beast), sans-serif',
            fontSize: 'clamp(2rem,6vw,3.5rem)',
            color: '#fff',
            letterSpacing: '0.02em',
            marginBottom: '1rem',
          }}>Order Confirmed!</h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'var(--font-space), sans-serif',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}>
            Thanks for your order. You&apos;ll receive a confirmation email shortly. We&apos;ll get your merch into production right away.
          </p>
        </div>
      </div>

      <footer className="mb-footer">
        <div className="mb-footer-brand">
          <span className="mb-logo-dot" />
          MERCH BEAST
        </div>
        <p className="mb-footer-copy">© 2026 Merch Beast. All rights reserved.</p>
      </footer>

    </div>
  )
}
