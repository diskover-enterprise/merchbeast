'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../cart-context'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, brandColor, shopPath } = useCart()
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
      const text = await res.text()
      let data: any
      try { data = JSON.parse(text) } catch { data = { error: text.slice(0, 200) } }
      if (data.url) {
        window.location.href = data.url
      } else {
        setCheckoutError(`Error ${res.status}: ${data.error || 'Unknown error'}`)
      }
    } catch (e: any) {
      setCheckoutError(`Network error: ${e?.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#fafafa', color: '#111', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <style>{`
        .cart-nav { background: #fff; border-bottom: 1px solid #e8e8e8; padding: 0 40px; height: 72px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
        .cart-nav-brand { font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: #111; text-decoration: none; }
        .cart-nav-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; text-decoration: none; }
        .cart-body { flex: 1; max-width: 960px; margin: 0 auto; padding: 60px 40px; width: 100%; box-sizing: border-box; }
        .cart-heading { font-size: 28px; font-weight: 400; letter-spacing: -0.01em; margin-bottom: 40px; }
        .cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 48px; align-items: start; }
        .cart-item { display: grid; grid-template-columns: 88px 1fr auto auto; gap: 20px; align-items: center; padding: 24px 0; border-bottom: 1px solid #efefef; }
        .cart-item-img { width: 88px; height: 110px; object-fit: cover; background: #f0ede8; display: block; }
        .cart-item-name { font-size: 14px; font-weight: 400; color: #111; text-decoration: none; line-height: 1.4; margin-bottom: 4px; display: block; }
        .cart-item-meta { font-size: 12px; color: #999; margin-bottom: 6px; }
        .cart-item-price { font-size: 14px; color: #C84020; font-weight: 600; }
        .cart-qty { display: flex; align-items: center; gap: 12px; }
        .cart-qty-btn { width: 32px; height: 32px; border: 1px solid #ddd; background: #fff; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #111; }
        .cart-qty-btn:hover { border-color: #111; }
        .cart-qty-num { font-size: 14px; min-width: 20px; text-align: center; }
        .cart-remove { background: none; border: none; color: #bbb; font-size: 16px; cursor: pointer; padding: 4px; }
        .cart-remove:hover { color: #111; }
        .cart-summary-box { background: #fff; border: 1px solid #e8e8e8; padding: 32px; }
        .cart-summary-title { font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; color: #888; margin-bottom: 24px; }
        .cart-summary-row { display: flex; justify-content: space-between; font-size: 14px; color: #555; margin-bottom: 12px; }
        .cart-summary-total { font-size: 16px; font-weight: 600; color: #111; border-top: 1px solid #e8e8e8; padding-top: 16px; margin-top: 8px; }
        .cart-checkout-btn { width: 100%; margin-top: 24px; padding: 16px; color: #fff; border: none; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; font-family: Georgia, serif; cursor: pointer; transition: opacity 0.2s; }
        .cart-checkout-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .cart-secure { font-size: 11px; color: #bbb; text-align: center; margin-top: 14px; letter-spacing: 0.1em; }
        .cart-empty-wrap { text-align: center; padding: 80px 20px; }
        .cart-empty-msg { font-size: 18px; color: #999; margin-bottom: 32px; font-style: italic; }
        .cart-browse-btn { display: inline-block; padding: 14px 32px; background: #1C2E54; color: #fff; text-decoration: none; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; }
        .cart-footer { background: #fff; border-top: 1px solid #e8e8e8; padding: 24px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .cart-footer p { font-size: 10px; color: #ccc; letter-spacing: 0.15em; text-transform: uppercase; }
        @media (max-width: 768px) {
          .cart-nav { padding: 0 20px; height: 60px; }
          .cart-body { padding: 32px 20px; }
          .cart-heading { font-size: 22px; margin-bottom: 24px; }
          .cart-layout { grid-template-columns: 1fr; gap: 32px; }
          .cart-item { grid-template-columns: 72px 1fr auto auto; gap: 14px; padding: 18px 0; }
          .cart-item-img { width: 72px; height: 90px; }
          .cart-footer { padding: 20px; }
        }
        @media (max-width: 480px) {
          .cart-item { grid-template-columns: 64px 1fr; gap: 12px; }
          .cart-qty { margin-top: 8px; }
          .cart-remove { position: absolute; top: 0; right: 0; }
        }
      `}</style>

      {/* NAV */}
      <nav className="cart-nav">
        <Link href={shopPath} className="cart-nav-back">← Continue Shopping</Link>
        <span className="cart-nav-brand">Merch Beast</span>
      </nav>

      {/* BODY */}
      <div className="cart-body">
        <h1 className="cart-heading">Your Cart</h1>

        {items.length === 0 ? (
          <div className="cart-empty-wrap">
            <p className="cart-empty-msg">Your cart is empty.</p>
            <Link href={shopPath} className="cart-browse-btn" style={{ background: brandColor }}>Browse Products</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items */}
            <div>
              {items.map(({ product, quantity, size, color }) => (
                <div key={`${product.slug}-${size}-${color}`} className="cart-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.images[0]} alt={product.name} className="cart-item-img" />
                  <div>
                    <Link href={`${shopPath}/products/${product.slug}`} className="cart-item-name">
                      {product.name.replace('Lunch Lady — ', '')}
                    </Link>
                    {(size || color) && (
                      <p className="cart-item-meta">{[size, color].filter(Boolean).join(' · ')}</p>
                    )}
                    <p className="cart-item-price">{product.price}</p>
                  </div>
                  <div className="cart-qty">
                    <button className="cart-qty-btn" onClick={() => quantity === 1 ? removeFromCart(product.slug, size, color) : updateQuantity(product.slug, quantity - 1, size, color)}>−</button>
                    <span className="cart-qty-num">{quantity}</span>
                    <button className="cart-qty-btn" onClick={() => updateQuantity(product.slug, quantity + 1, size, color)}>+</button>
                  </div>
                  <button className="cart-remove" onClick={() => removeFromCart(product.slug, size, color)}>✕</button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary-box">
              <p className="cart-summary-title">Order Summary</p>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)} CAD</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span style={{ color: '#999' }}>Calculated at checkout</span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)} CAD</span>
              </div>
              <button className="cart-checkout-btn" style={{ background: brandColor }} onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirecting...' : 'Proceed to Checkout'}
              </button>
              {checkoutError && (
                <p style={{ color: '#e53e3e', fontSize: 12, textAlign: 'center', marginTop: 12 }}>{checkoutError}</p>
              )}
              <p className="cart-secure">Secure checkout powered by Stripe</p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="cart-footer">
        <p>© 2026 Merch Beast</p>
        <p>team@merchbeast.shop</p>
      </footer>
    </div>
  )
}
