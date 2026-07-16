'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { PromoCodeInput } from '@/components/PromoCodeInput'
import { calcSaleDiscountCents } from '@/lib/sale'
import type { ActiveSale } from '@/lib/sale'

export default function SappertonCartPage() {
  const { items, removeFromCart, updateQuantity, total, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#b8860b'); setShopPath('/shop/sapperton-scrapper') }, [setBrandColor, setShopPath])
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [appliedCode, setAppliedCode] = useState<string | null>(null)
  const [discountCents, setDiscountCents] = useState(0)
  const [activeSale, setActiveSale] = useState<ActiveSale>(null)

  const totalCents = Math.round(total * 100)
  const saleDiscountCents = calcSaleDiscountCents(totalCents, activeSale)
  const discountedTotal = Math.max(0, total - saleDiscountCents / 100 - discountCents / 100)

  useEffect(() => {
    fetch('/api/sale/active?shopSlug=sapperton-scrapper').then(r => r.json()).then(setActiveSale).catch(() => {})
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
          shopSlug: 'sapperton-scrapper',
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
    <div style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", background: '#5a5850', color: '#b8860b', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,700;1,900&family=Barlow:wght@400;600&display=swap');
        .ss-cart-nav { position: sticky; top: 0; z-index: 100; height: 88px; background: #5a5850; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; border-bottom: 2px solid #b8860b; }
        .ss-cart-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #b8860b; text-decoration: none; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; transition: opacity 0.2s; }
        .ss-cart-back:hover { opacity: 0.7; }
        .ss-cart-logo { height: 60px; object-fit: contain; filter: none; }
        .ss-cart-body { flex: 1; max-width: 960px; margin: 0 auto; padding: 60px 48px; width: 100%; box-sizing: border-box; }
        .ss-cart-heading { font-size: 56px; font-weight: 900; font-style: italic; text-transform: uppercase; letter-spacing: -0.02em; color: #b8860b; margin-bottom: 40px; }
        .ss-cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 48px; align-items: start; }
        .ss-cart-item { display: grid; grid-template-columns: 88px 1fr auto auto; gap: 20px; align-items: center; padding: 24px 0; border-bottom: 1px solid rgba(184,134,11,0.1); }
        .ss-cart-item-img { width: 88px; height: 110px; object-fit: cover; display: block; }
        .ss-cart-item-name { font-size: 16px; font-weight: 700; font-style: italic; text-transform: uppercase; color: #b8860b; line-height: 1.3; margin-bottom: 4px; display: block; text-decoration: none; transition: color 0.2s; }
        .ss-cart-item-name:hover { color: rgba(184,134,11,0.5); }
        .ss-cart-item-meta { font-size: 12px; color: rgba(184,134,11,0.4); margin-bottom: 6px; font-family: 'Barlow', sans-serif; }
        .ss-cart-item-price { font-size: 15px; color: #b8860b; font-weight: 700; }
        .ss-cart-qty { display: flex; align-items: center; gap: 12px; }
        .ss-cart-qty-btn { width: 32px; height: 32px; border: 1px solid rgba(184,134,11,0.2); background: transparent; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #b8860b; transition: border-color 0.2s; }
        .ss-cart-qty-btn:hover { border-color: #c8102e; }
        .ss-cart-qty-num { font-size: 14px; min-width: 20px; text-align: center; font-weight: 700; }
        .ss-cart-remove { background: none; border: none; color: rgba(184,134,11,0.3); font-size: 16px; cursor: pointer; padding: 4px; transition: color 0.2s; }
        .ss-cart-remove:hover { color: #b8860b; }
        .ss-cart-summary { background: rgba(184,134,11,0.08); border: 2px solid rgba(184,134,11,0.15); padding: 32px; }
        .ss-cart-summary-title { font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #b8860b; margin-bottom: 24px; font-family: 'Barlow', sans-serif; }
        .ss-cart-summary-row { display: flex; justify-content: space-between; font-size: 14px; color: rgba(184,134,11,0.5); margin-bottom: 12px; font-family: 'Barlow', sans-serif; }
        .ss-cart-summary-total { font-size: 16px; font-weight: 700; color: #b8860b; border-top: 1px solid rgba(184,134,11,0.1); padding-top: 16px; margin-top: 8px; }
        .ss-cart-checkout-btn { width: 100%; margin-top: 24px; padding: 18px; color: #fff; background: #b8860b; border: none; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 900; font-style: italic; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s; }
        .ss-cart-checkout-btn:hover { opacity: 0.9; }
        .ss-cart-checkout-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .ss-cart-secure { font-size: 10px; color: rgba(184,134,11,0.35); text-align: center; margin-top: 14px; letter-spacing: 0.1em; font-family: 'Barlow', sans-serif; }
        .ss-cart-empty { text-align: center; padding: 80px 20px; }
        .ss-cart-empty p { font-size: 16px; color: rgba(184,134,11,0.5); margin-bottom: 32px; font-family: 'Barlow', sans-serif; }
        .ss-cart-browse { display: inline-block; padding: 16px 40px; background: #b8860b; color: #5a5850; text-decoration: none; font-size: 13px; font-weight: 900; font-style: italic; letter-spacing: 0.2em; text-transform: uppercase; font-family: 'Barlow Condensed', sans-serif; }
        .ss-cart-footer { background: #b8860b; border-top: 4px solid #b8860b; padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: auto; }
        .ss-cart-footer-brand { font-size: 20px; font-weight: 900; font-style: italic; color: #5a5850; text-transform: uppercase; }
        .ss-cart-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(154,148,136,0.4); font-family: 'Barlow', sans-serif; }
        @media (max-width: 768px) {
          .ss-cart-nav { padding: 0 20px; height: 72px; }
          .ss-cart-logo { height: 36px; }
          .ss-cart-body { padding: 32px 20px; }
          .ss-cart-heading { font-size: 40px; margin-bottom: 24px; }
          .ss-cart-layout { grid-template-columns: 1fr; gap: 32px; }
          .ss-cart-item { grid-template-columns: 72px 1fr auto auto; gap: 12px; padding: 16px 0; }
          .ss-cart-item-img { width: 72px; height: 90px; }
          .ss-cart-footer { padding: 24px 20px; }
        }
      `}</style>

      <nav className="ss-cart-nav">
        <Link href="/shop/sapperton-scrapper" className="ss-cart-back">← Continue Shopping</Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sapperton-logo.png" alt="Sapperton Scrapper" className="ss-cart-logo" />
        <span />
      </nav>

      <div className="ss-cart-body">
        <h1 className="ss-cart-heading">Your Cart</h1>

        {items.length === 0 ? (
          <div className="ss-cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop/sapperton-scrapper" className="ss-cart-browse">Browse Products</Link>
          </div>
        ) : (
          <div className="ss-cart-layout">
            <div>
              {items.map(({ product, quantity, size, color }) => (
                <div key={`${product.slug}-${size}-${color}`} className="ss-cart-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.images?.[0]} alt={product.name} className="ss-cart-item-img" />
                  <div>
                    <Link href={`/shop/sapperton-scrapper/products/${product.slug}`} className="ss-cart-item-name">{product.name}</Link>
                    {(size || color) && (
                      <p className="ss-cart-item-meta">{[size, color].filter(Boolean).join(' · ')}</p>
                    )}
                    <p className="ss-cart-item-price">${product.price}</p>
                  </div>
                  <div className="ss-cart-qty">
                    <button className="ss-cart-qty-btn" onClick={() => quantity === 1 ? removeFromCart(product.slug, size, color) : updateQuantity(product.slug, quantity - 1, size, color)}>−</button>
                    <span className="ss-cart-qty-num">{quantity}</span>
                    <button className="ss-cart-qty-btn" onClick={() => updateQuantity(product.slug, quantity + 1, size, color)}>+</button>
                  </div>
                  <button className="ss-cart-remove" onClick={() => removeFromCart(product.slug, size, color)}>✕</button>
                </div>
              ))}
            </div>

            <div className="ss-cart-summary">
              <p className="ss-cart-summary-title">Order Summary</p>
              <div className="ss-cart-summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)} CAD</span>
              </div>
              {saleDiscountCents > 0 && (
                <div className="ss-cart-summary-row" style={{ color: '#ff6b6b' }}>
                  <span>{activeSale!.name}</span>
                  <span>−${(saleDiscountCents / 100).toFixed(2)} CAD</span>
                </div>
              )}
              {discountCents > 0 && (
                <div className="ss-cart-summary-row" style={{ color: '#86efac' }}>
                  <span>Promo Code</span>
                  <span>−${(discountCents / 100).toFixed(2)} CAD</span>
                </div>
              )}
              <div className="ss-cart-summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="ss-cart-summary-row ss-cart-summary-total">
                <span>Total</span>
                <span>${discountedTotal.toFixed(2)} CAD</span>
              </div>
              <PromoCodeInput
                shopSlug="sapperton-scrapper"
                orderTotalCents={totalCents}
                appliedCode={appliedCode}
                discountCents={discountCents}
                onApply={(code, cents) => { setAppliedCode(code); setDiscountCents(cents) }}
                onRemove={() => { setAppliedCode(null); setDiscountCents(0) }}
                theme="dark"
              />
              <button className="ss-cart-checkout-btn" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirecting...' : 'Proceed to Checkout'}
              </button>
              {checkoutError && (
                <p style={{ color: '#e74c3c', fontSize: 12, textAlign: 'center', marginTop: 12 }}>{checkoutError}</p>
              )}
              <p className="ss-cart-secure">Secure checkout powered by Stripe</p>
            </div>
          </div>
        )}
      </div>

      <footer className="ss-cart-footer">
        <span className="ss-cart-footer-brand">Sapperton Scrapper</span>
        <p className="ss-cart-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
