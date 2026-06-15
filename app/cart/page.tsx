'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../cart-context'
import '../merch-homepage.css'
import '../products/products.css'
import './cart.css'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart()

  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setCheckoutError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ slug: i.product.slug, quantity: i.quantity })),
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setCheckoutError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (e) {
      setCheckoutError('Failed to connect to checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-page">

      <header className="mb-nav">
        <a href="/" className="mb-logo">
          <span className="mb-logo-dot" />
          MERCH&nbsp;BEAST
        </a>
        <nav className="mb-nav-links">
          <a href="/#services">Services</a>
          <a href="/#work">Work</a>
          <a href="/#how">Process</a>
          <a href="/products" style={{color:'var(--green)'}}>Shop</a>
          <a href="/#cta" className="mb-btn-nav">Get A Quote</a>
        </nav>
      </header>

      <div className="cart-page">
        <div className="mb-container">
          <div className="cart-header">
            <Link href="/products" className="cart-back">← Back to Shop</Link>
            <h1 className="cart-title">Your Cart</h1>
          </div>

          {items.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty-msg">Your cart is empty.</p>
              <Link href="/products" className="mb-btn mb-btn-primary">Browse Products</Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {items.map(({ product, quantity, size, color }) => (
                  <div key={`${product.slug}-${size}-${color}`} className="cart-item">
                    <div className="cart-item-img-wrap">
                      <img src={product.images[0]} alt={product.name} className="cart-item-img" />
                    </div>
                    <div className="cart-item-info">
                      <Link href={`/products/${product.slug}`} className="cart-item-name">{product.name}</Link>
                      {(size || color) && <p style={{color:'rgba(255,255,255,0.5)',fontSize:'0.8rem',fontFamily:'var(--font-space)',marginTop:'2px'}}>{[size, color].filter(Boolean).join(' · ')}</p>}
                      <p className="cart-item-price">{product.price}</p>
                    </div>
                    <div className="cart-item-qty">
                      <button onClick={() => updateQuantity(product.slug, quantity - 1, size, color)} className="cart-qty-btn">−</button>
                      <span className="cart-qty-num">{quantity}</span>
                      <button onClick={() => updateQuantity(product.slug, quantity + 1, size, color)} className="cart-qty-btn">+</button>
                    </div>
                    <button onClick={() => removeFromCart(product.slug, size, color)} className="cart-remove">✕</button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)} CAD</span>
                </div>
                <div className="cart-summary-row cart-summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)} CAD</span>
                </div>
                <button onClick={handleCheckout} disabled={loading} className="mb-btn mb-btn-primary mb-btn-lg cart-checkout-btn">
                  {loading ? 'Redirecting...' : 'Checkout'}
                </button>
                {checkoutError && <p style={{color:'#ff4444',fontSize:'0.85rem',textAlign:'center',marginTop:'0.5rem'}}>{checkoutError}</p>}
                <p className="cart-secure-note">Secure payment powered by Stripe</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mb-footer">
        <div className="mb-footer-brand">
          <span className="mb-logo-dot" />
          MERCH BEAST
        </div>
        <p className="mb-footer-copy">© 2026 Merch Beast. All rights reserved.</p>
        <nav className="mb-footer-links">
          <a href="mailto:team@merchbeast.shop">team@merchbeast.shop</a>
        </nav>
      </footer>

    </div>
  )
}
