'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { PromoCodeInput } from '@/components/PromoCodeInput'
import { calcSaleDiscountCents } from '@/lib/sale'
import type { ActiveSale } from '@/lib/sale'

export default function LunchLadyCartPage() {
  const { items, removeFromCart, updateQuantity, total, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#1C2E54'); setShopPath('/shop/lunch-lady') }, [setBrandColor, setShopPath])
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [appliedCode, setAppliedCode] = useState<string | null>(null)
  const [discountCents, setDiscountCents] = useState(0)
  const [activeSale, setActiveSale] = useState<ActiveSale>(null)

  const totalCents = Math.round(total * 100)
  const saleDiscountCents = calcSaleDiscountCents(totalCents, activeSale)
  const discountedTotal = Math.max(0, total - saleDiscountCents / 100 - discountCents / 100)

  useEffect(() => {
    fetch('/api/sale/active?shopSlug=lunch-lady').then(r => r.json()).then(setActiveSale).catch(() => {})
  }, [])

  async function handleCheckout() {
    setCheckoutError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ slug: i.product.slug, quantity: i.quantity })),
          shopSlug: 'lunch-lady',
          ...(appliedCode ? { discountCode: appliedCode } : {}),
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setCheckoutError(`Error: ${data.error || 'Unknown error'}`)
      }
    } catch (e: any) {
      setCheckoutError(`Network error: ${e?.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#fff', color: '#111', minHeight: '100vh', display: 'flex', flexDirection: 'column', border: '12px solid #D4911E', boxSizing: 'border-box' }}>
      <style>{`
        .ll-cart-nav { position: sticky; top: 0; z-index: 100; height: 64px; background: rgba(255,255,255,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid #e8e8e8; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .ll-cart-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; text-decoration: none; transition: color 0.2s; }
        .ll-cart-back:hover { color: #111; }
        .ll-cart-brand { font-size: 13px; font-style: italic; color: #111; }
        .ll-cart-body { flex: 1; max-width: 960px; margin: 0 auto; padding: 60px 40px; width: 100%; box-sizing: border-box; }
        .ll-cart-heading { font-size: 40px; font-weight: 400; color: #111; margin-bottom: 8px; }
        .ll-cart-heading-rule { width: 40px; height: 2px; background: #C84020; margin-bottom: 40px; }
        .ll-cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 48px; align-items: start; }
        .ll-cart-item { display: grid; grid-template-columns: 88px 1fr auto auto; gap: 20px; align-items: center; padding: 24px 0; border-bottom: 1px solid #e8e8e8; }
        .ll-cart-item-img { width: 88px; height: 110px; object-fit: contain; background: #f5f2ee; display: block; padding: 6px; }
        .ll-cart-item-name { font-size: 14px; font-weight: 400; color: #111; line-height: 1.4; margin-bottom: 4px; display: block; text-decoration: none; }
        .ll-cart-item-name:hover { color: #C84020; }
        .ll-cart-item-meta { font-size: 12px; color: #999; margin-bottom: 6px; }
        .ll-cart-item-price { font-size: 14px; color: #C84020; font-weight: 600; }
        .ll-cart-qty { display: flex; align-items: center; gap: 12px; }
        .ll-cart-qty-btn { width: 32px; height: 32px; border: 1px solid #ddd; background: transparent; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #111; transition: border-color 0.2s; }
        .ll-cart-qty-btn:hover { border-color: #111; }
        .ll-cart-qty-num { font-size: 14px; min-width: 20px; text-align: center; font-weight: 400; }
        .ll-cart-remove { background: none; border: none; color: #ccc; font-size: 16px; cursor: pointer; padding: 4px; transition: color 0.2s; }
        .ll-cart-remove:hover { color: #111; }
        .ll-cart-summary { background: #1C2E54; padding: 32px; }
        .ll-cart-summary-title { font-size: 13px; font-style: italic; color: #fff; margin-bottom: 24px; }
        .ll-cart-summary-row { display: flex; justify-content: space-between; font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 12px; }
        .ll-cart-summary-total { font-size: 16px; font-weight: 400; color: #fff; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 16px; margin-top: 8px; }
        .ll-cart-checkout-btn { width: 100%; margin-top: 24px; padding: 18px; color: #fff; background: #C84020; border: none; font-family: Georgia, serif; font-size: 11px; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s; }
        .ll-cart-checkout-btn:hover { opacity: 0.9; }
        .ll-cart-checkout-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .ll-cart-secure { font-size: 10px; color: rgba(255,255,255,0.3); text-align: center; margin-top: 14px; letter-spacing: 0.1em; }
        .ll-cart-empty { text-align: center; padding: 80px 20px; }
        .ll-cart-empty p { font-size: 16px; color: #999; margin-bottom: 32px; }
        .ll-cart-browse { display: inline-block; padding: 16px 40px; background: #1C2E54; color: #fff; text-decoration: none; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; }
        .ll-cart-footer { padding: 40px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e8e8e8; flex-wrap: wrap; gap: 16px; margin-top: auto; }
        .ll-cart-footer-brand { font-size: 14px; font-style: italic; color: #111; }
        .ll-cart-footer-copy { font-size: 10px; color: #ccc; letter-spacing: 0.15em; text-transform: uppercase; }
        @media (max-width: 768px) {
          .ll-cart-nav { padding: 0 16px; height: 56px; }
          .ll-cart-body { padding: 32px 16px; }
          .ll-cart-heading { font-size: 30px; margin-bottom: 6px; }
          .ll-cart-layout { grid-template-columns: 1fr; gap: 32px; }
          .ll-cart-item { grid-template-columns: 72px 1fr auto auto; gap: 12px; padding: 16px 0; }
          .ll-cart-item-img { width: 72px; height: 90px; }
          .ll-cart-footer { padding: 24px 16px; }
        }
      `}</style>

      <nav className="ll-cart-nav">
        <Link href="/shop/lunch-lady" className="ll-cart-back">← Continue Shopping</Link>
        <span className="ll-cart-brand">Lunch Lady</span>
        <span />
      </nav>

      <div className="ll-cart-body">
        <h1 className="ll-cart-heading">Your Cart</h1>
        <div className="ll-cart-heading-rule" />

        {items.length === 0 ? (
          <div className="ll-cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop/lunch-lady" className="ll-cart-browse">Browse Products</Link>
          </div>
        ) : (
          <div className="ll-cart-layout">
            <div>
              {items.map(({ product, quantity, size, color }) => (
                <div key={`${product.slug}-${size}-${color}`} className="ll-cart-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.images[0]} alt={product.name} className="ll-cart-item-img" />
                  <div>
                    <Link href={`/shop/lunch-lady/products/${product.slug}`} className="ll-cart-item-name">{product.name}</Link>
                    {(size || color) && (
                      <p className="ll-cart-item-meta">{[size, color].filter(Boolean).join(' · ')}</p>
                    )}
                    <p className="ll-cart-item-price">{product.price}</p>
                  </div>
                  <div className="ll-cart-qty">
                    <button className="ll-cart-qty-btn" onClick={() => quantity === 1 ? removeFromCart(product.slug, size, color) : updateQuantity(product.slug, quantity - 1, size, color)}>−</button>
                    <span className="ll-cart-qty-num">{quantity}</span>
                    <button className="ll-cart-qty-btn" onClick={() => updateQuantity(product.slug, quantity + 1, size, color)}>+</button>
                  </div>
                  <button className="ll-cart-remove" onClick={() => removeFromCart(product.slug, size, color)}>✕</button>
                </div>
              ))}
            </div>

            <div className="ll-cart-summary">
              <p className="ll-cart-summary-title">Order Summary</p>
              <div className="ll-cart-summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)} CAD</span>
              </div>
              {saleDiscountCents > 0 && (
                <div className="ll-cart-summary-row" style={{ color: '#86efac' }}>
                  <span>{activeSale!.name}</span>
                  <span>−${(saleDiscountCents / 100).toFixed(2)} CAD</span>
                </div>
              )}
              {discountCents > 0 && (
                <div className="ll-cart-summary-row" style={{ color: '#86efac' }}>
                  <span>Promo Code</span>
                  <span>−${(discountCents / 100).toFixed(2)} CAD</span>
                </div>
              )}
              <div className="ll-cart-summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="ll-cart-summary-row ll-cart-summary-total">
                <span>Total</span>
                <span>${discountedTotal.toFixed(2)} CAD</span>
              </div>
              <PromoCodeInput
                shopSlug="lunch-lady"
                orderTotalCents={totalCents}
                appliedCode={appliedCode}
                discountCents={discountCents}
                onApply={(code, cents) => { setAppliedCode(code); setDiscountCents(cents) }}
                onRemove={() => { setAppliedCode(null); setDiscountCents(0) }}
                theme="dark"
              />
              <button className="ll-cart-checkout-btn" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirecting...' : 'Proceed to Checkout'}
              </button>
              {checkoutError && (
                <p style={{ color: '#D4911E', fontSize: 12, textAlign: 'center', marginTop: 12 }}>{checkoutError}</p>
              )}
              <p className="ll-cart-secure">Secure checkout powered by Stripe</p>
            </div>
          </div>
        )}
      </div>

      <footer className="ll-cart-footer">
        <span className="ll-cart-footer-brand">Lunch Lady</span>
        <p className="ll-cart-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
