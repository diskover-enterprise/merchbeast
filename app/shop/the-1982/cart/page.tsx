'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { PromoCodeInput } from '@/components/PromoCodeInput'
import { calcSaleDiscountCents } from '@/lib/sale'
import type { ActiveSale } from '@/lib/sale'

export default function The1982CartPage() {
  const { items, removeFromCart, updateQuantity, total, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#B8860B'); setShopPath('/shop/the-1982') }, [setBrandColor, setShopPath])
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [appliedCode, setAppliedCode] = useState<string | null>(null)
  const [discountCents, setDiscountCents] = useState(0)
  const [activeSale, setActiveSale] = useState<ActiveSale>(null)

  const totalCents = Math.round(total * 100)
  const saleDiscountCents = calcSaleDiscountCents(totalCents, activeSale)
  const discountedTotal = Math.max(0, total - saleDiscountCents / 100 - discountCents / 100)

  useEffect(() => {
    fetch('/api/sale/active?shopSlug=the-1982').then(r => r.json()).then(setActiveSale).catch(() => {})
  }, [])

  async function handleCheckout() {
    setCheckoutError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ slug: i.product.slug, quantity: i.quantity, size: i.size, color: i.color })),
          shopSlug: 'the-1982',
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
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#0a0a0a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .t82-cart-nav { position: sticky; top: 0; z-index: 100; height: 64px; background: rgba(10,10,10,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .t82-cart-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
        .t82-cart-back:hover { color: #B8860B; }
        .t82-cart-brand { font-size: 15px; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; color: #fff; }
        .t82-cart-brand span { color: #B8860B; }
        .t82-cart-body { flex: 1; max-width: 960px; margin: 0 auto; padding: 60px 40px; width: 100%; box-sizing: border-box; }
        .t82-cart-heading { font-size: 48px; font-weight: 900; letter-spacing: -0.02em; color: #fff; margin-bottom: 40px; text-transform: uppercase; }
        .t82-cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 48px; align-items: start; }
        .t82-cart-item { display: grid; grid-template-columns: 88px 1fr auto auto; gap: 20px; align-items: center; padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .t82-cart-item-img { width: 88px; height: 110px; object-fit: contain; background: #1a1a1a; display: block; padding: 6px; }
        .t82-cart-item-name { font-size: 14px; font-weight: 600; color: #fff; line-height: 1.4; margin-bottom: 4px; display: block; text-decoration: none; }
        .t82-cart-item-name:hover { color: #B8860B; }
        .t82-cart-item-meta { font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 6px; }
        .t82-cart-item-price { font-size: 14px; color: #B8860B; font-weight: 700; }
        .t82-cart-qty { display: flex; align-items: center; gap: 12px; }
        .t82-cart-qty-btn { width: 32px; height: 32px; border: 1px solid rgba(255,255,255,0.15); background: transparent; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; transition: border-color 0.2s; }
        .t82-cart-qty-btn:hover { border-color: #B8860B; }
        .t82-cart-qty-num { font-size: 14px; min-width: 20px; text-align: center; font-weight: 600; }
        .t82-cart-remove { background: none; border: none; color: rgba(255,255,255,0.3); font-size: 16px; cursor: pointer; padding: 4px; transition: color 0.2s; }
        .t82-cart-remove:hover { color: #fff; }
        .t82-cart-summary { background: #111; border: 1px solid rgba(255,255,255,0.08); padding: 32px; }
        .t82-cart-summary-title { font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #fff; margin-bottom: 24px; }
        .t82-cart-summary-row { display: flex; justify-content: space-between; font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 12px; }
        .t82-cart-summary-total { font-size: 16px; font-weight: 700; color: #fff; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; margin-top: 8px; }
        .t82-cart-checkout-btn { width: 100%; margin-top: 24px; padding: 18px; color: #0a0a0a; background: #B8860B; border: none; font-family: "'Helvetica Neue', sans-serif"; font-size: 11px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s; }
        .t82-cart-checkout-btn:hover { opacity: 0.9; }
        .t82-cart-checkout-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .t82-cart-secure { font-size: 10px; color: rgba(255,255,255,0.25); text-align: center; margin-top: 14px; letter-spacing: 0.1em; }
        .t82-cart-empty { text-align: center; padding: 80px 20px; }
        .t82-cart-empty p { font-size: 16px; color: rgba(255,255,255,0.4); margin-bottom: 32px; }
        .t82-cart-browse { display: inline-block; padding: 16px 40px; background: #B8860B; color: #0a0a0a; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; }
        .t82-cart-footer { background: #000; border-top: 1px solid rgba(255,255,255,0.06); padding: 32px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: auto; }
        .t82-cart-footer-brand { font-size: 14px; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; color: #B8860B; }
        .t82-cart-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          .t82-cart-nav { padding: 0 16px; height: 56px; }
          .t82-cart-body { padding: 32px 16px; }
          .t82-cart-heading { font-size: 36px; margin-bottom: 24px; }
          .t82-cart-layout { grid-template-columns: 1fr; gap: 32px; }
          .t82-cart-item { grid-template-columns: 72px 1fr auto auto; gap: 12px; padding: 16px 0; }
          .t82-cart-item-img { width: 72px; height: 90px; }
          .t82-cart-footer { padding: 24px 16px; }
        }
      `}</style>

      <nav className="t82-cart-nav">
        <Link href="/shop/the-1982" className="t82-cart-back">← Continue Shopping</Link>
        <span className="t82-cart-brand">The <span>1982</span></span>
        <span />
      </nav>

      <div className="t82-cart-body">
        <h1 className="t82-cart-heading">Your Cart</h1>

        {items.length === 0 ? (
          <div className="t82-cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop/the-1982" className="t82-cart-browse">Browse Products</Link>
          </div>
        ) : (
          <div className="t82-cart-layout">
            <div>
              {items.map(({ product, quantity, size, color }) => (
                <div key={`${product.slug}-${size}-${color}`} className="t82-cart-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.images[0]} alt={product.name} className="t82-cart-item-img" />
                  <div>
                    <Link href={`/shop/the-1982/products/${product.slug}`} className="t82-cart-item-name">{product.name}</Link>
                    {(size || color) && (
                      <p className="t82-cart-item-meta">{[size, color].filter(Boolean).join(' · ')}</p>
                    )}
                    <p className="t82-cart-item-price">{product.price}</p>
                  </div>
                  <div className="t82-cart-qty">
                    <button className="t82-cart-qty-btn" onClick={() => quantity === 1 ? removeFromCart(product.slug, size, color) : updateQuantity(product.slug, quantity - 1, size, color)}>−</button>
                    <span className="t82-cart-qty-num">{quantity}</span>
                    <button className="t82-cart-qty-btn" onClick={() => updateQuantity(product.slug, quantity + 1, size, color)}>+</button>
                  </div>
                  <button className="t82-cart-remove" onClick={() => removeFromCart(product.slug, size, color)}>✕</button>
                </div>
              ))}
            </div>

            <div className="t82-cart-summary">
              <p className="t82-cart-summary-title">Order Summary</p>
              <div className="t82-cart-summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)} CAD</span>
              </div>
              {saleDiscountCents > 0 && (
                <div className="t82-cart-summary-row" style={{ color: '#B8860B' }}>
                  <span>{activeSale!.name}</span>
                  <span>−${(saleDiscountCents / 100).toFixed(2)} CAD</span>
                </div>
              )}
              {discountCents > 0 && (
                <div className="t82-cart-summary-row" style={{ color: '#86efac' }}>
                  <span>Promo Code</span>
                  <span>−${(discountCents / 100).toFixed(2)} CAD</span>
                </div>
              )}
              <div className="t82-cart-summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="t82-cart-summary-row t82-cart-summary-total">
                <span>Total</span>
                <span>${discountedTotal.toFixed(2)} CAD</span>
              </div>
              <PromoCodeInput
                shopSlug="the-1982"
                orderTotalCents={totalCents}
                appliedCode={appliedCode}
                discountCents={discountCents}
                onApply={(code, cents) => { setAppliedCode(code); setDiscountCents(cents) }}
                onRemove={() => { setAppliedCode(null); setDiscountCents(0) }}
                theme="dark"
              />
              <button className="t82-cart-checkout-btn" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirecting...' : 'Proceed to Checkout'}
              </button>
              {checkoutError && (
                <p style={{ color: '#B8860B', fontSize: 12, textAlign: 'center', marginTop: 12 }}>{checkoutError}</p>
              )}
              <p className="t82-cart-secure">Secure checkout powered by Stripe</p>
            </div>
          </div>
        )}
      </div>

      <footer className="t82-cart-footer">
        <span className="t82-cart-footer-brand">The 1982</span>
        <p className="t82-cart-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
