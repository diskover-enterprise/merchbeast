'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { PromoCodeInput } from '@/components/PromoCodeInput'

export default function BoastyCartPage() {
  const { items, removeFromCart, updateQuantity, total, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#003A5C'); setShopPath('/shop/boasty-collective') }, [setBrandColor, setShopPath])
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [appliedCode, setAppliedCode] = useState<string | null>(null)
  const [discountCents, setDiscountCents] = useState(0)

  const totalCents = Math.round(total * 100)
  const discountedTotal = Math.max(0, total - discountCents / 100)

  async function handleCheckout() {
    setCheckoutError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ slug: i.product.slug, quantity: i.quantity })),
          ...(appliedCode ? { discountCode: appliedCode, shopSlug: 'boasty-collective' } : {}),
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
    <div style={{ fontFamily: "'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#f9f6f0', color: '#1a1a2e', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;700;800&display=swap');
        .bc-cart-nav { position: sticky; top: 0; z-index: 100; height: 64px; background: rgba(0,58,92,0.97); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .bc-cart-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s; }
        .bc-cart-back:hover { color: #F4A261; }
        .bc-cart-brand { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.15em; color: #fff; }
        .bc-cart-brand span { color: #F4A261; }
        .bc-cart-body { flex: 1; max-width: 960px; margin: 0 auto; padding: 60px 40px; width: 100%; box-sizing: border-box; }
        .bc-cart-heading { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 0.08em; color: #003A5C; margin-bottom: 40px; }
        .bc-cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 48px; align-items: start; }
        .bc-cart-item { display: grid; grid-template-columns: 88px 1fr auto auto; gap: 20px; align-items: center; padding: 24px 0; border-bottom: 1px solid rgba(0,58,92,0.1); }
        .bc-cart-item-img { width: 88px; height: 110px; object-fit: contain; background: #fff; display: block; border-radius: 3px; padding: 6px; }
        .bc-cart-item-name { font-size: 14px; font-weight: 600; color: #1a1a2e; line-height: 1.4; margin-bottom: 4px; display: block; text-decoration: none; }
        .bc-cart-item-meta { font-size: 12px; color: #999; margin-bottom: 6px; }
        .bc-cart-item-price { font-size: 14px; color: #F4A261; font-weight: 700; }
        .bc-cart-qty { display: flex; align-items: center; gap: 12px; }
        .bc-cart-qty-btn { width: 32px; height: 32px; border: 1px solid #d0c8bb; background: transparent; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #1a1a2e; transition: border-color 0.2s; }
        .bc-cart-qty-btn:hover { border-color: #003A5C; }
        .bc-cart-qty-num { font-size: 14px; min-width: 20px; text-align: center; font-weight: 600; }
        .bc-cart-remove { background: none; border: none; color: #bbb; font-size: 16px; cursor: pointer; padding: 4px; transition: color 0.2s; }
        .bc-cart-remove:hover { color: #003A5C; }
        .bc-cart-summary { background: #003A5C; padding: 32px; border-radius: 4px; }
        .bc-cart-summary-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.1em; color: #fff; margin-bottom: 24px; }
        .bc-cart-summary-row { display: flex; justify-content: space-between; font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 12px; }
        .bc-cart-summary-total { font-size: 16px; font-weight: 700; color: #fff; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 16px; margin-top: 8px; }
        .bc-cart-checkout-btn { width: 100%; margin-top: 24px; padding: 18px; color: #003A5C; background: #F4A261; border: none; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s; border-radius: 3px; }
        .bc-cart-checkout-btn:hover { opacity: 0.9; }
        .bc-cart-checkout-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .bc-cart-secure { font-size: 10px; color: rgba(255,255,255,0.35); text-align: center; margin-top: 14px; letter-spacing: 0.1em; }
        .bc-cart-empty { text-align: center; padding: 80px 20px; }
        .bc-cart-empty p { font-size: 16px; color: #999; margin-bottom: 32px; }
        .bc-cart-browse { display: inline-block; padding: 16px 40px; background: #003A5C; color: #fff; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; border-radius: 3px; }
        .bc-cart-footer { background: #001f33; padding: 32px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: auto; }
        .bc-cart-footer-brand { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 0.15em; color: #fff; }
        .bc-cart-footer-brand span { color: #F4A261; }
        .bc-cart-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          .bc-cart-nav { padding: 0 16px; height: 56px; }
          .bc-cart-body { padding: 32px 16px; }
          .bc-cart-heading { font-size: 36px; margin-bottom: 24px; }
          .bc-cart-layout { grid-template-columns: 1fr; gap: 32px; }
          .bc-cart-item { grid-template-columns: 72px 1fr auto auto; gap: 12px; padding: 16px 0; }
          .bc-cart-item-img { width: 72px; height: 90px; }
          .bc-cart-footer { padding: 24px 16px; }
        }
      `}</style>

      <nav className="bc-cart-nav">
        <Link href="/shop/boasty-collective" className="bc-cart-back">← Continue Shopping</Link>
        <span className="bc-cart-brand">Boasty<span> Collective</span></span>
        <span />
      </nav>

      <div className="bc-cart-body">
        <h1 className="bc-cart-heading">Your Cart</h1>

        {items.length === 0 ? (
          <div className="bc-cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop/boasty-collective" className="bc-cart-browse">Browse Products</Link>
          </div>
        ) : (
          <div className="bc-cart-layout">
            <div>
              {items.map(({ product, quantity, size, color }) => (
                <div key={`${product.slug}-${size}-${color}`} className="bc-cart-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.images[0]} alt={product.name} className="bc-cart-item-img" />
                  <div>
                    <Link href={`/shop/boasty-collective/products/${product.slug}`} className="bc-cart-item-name">{product.name}</Link>
                    {(size || color) && (
                      <p className="bc-cart-item-meta">{[size, color].filter(Boolean).join(' · ')}</p>
                    )}
                    <p className="bc-cart-item-price">{product.price}</p>
                  </div>
                  <div className="bc-cart-qty">
                    <button className="bc-cart-qty-btn" onClick={() => quantity === 1 ? removeFromCart(product.slug, size, color) : updateQuantity(product.slug, quantity - 1, size, color)}>−</button>
                    <span className="bc-cart-qty-num">{quantity}</span>
                    <button className="bc-cart-qty-btn" onClick={() => updateQuantity(product.slug, quantity + 1, size, color)}>+</button>
                  </div>
                  <button className="bc-cart-remove" onClick={() => removeFromCart(product.slug, size, color)}>✕</button>
                </div>
              ))}
            </div>

            <div className="bc-cart-summary">
              <p className="bc-cart-summary-title">Order Summary</p>
              <div className="bc-cart-summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)} CAD</span>
              </div>
              {discountCents > 0 && (
                <div className="bc-cart-summary-row" style={{ color: '#86efac' }}>
                  <span>Discount</span>
                  <span>−${(discountCents / 100).toFixed(2)} CAD</span>
                </div>
              )}
              <div className="bc-cart-summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="bc-cart-summary-row bc-cart-summary-total">
                <span>Total</span>
                <span>${discountedTotal.toFixed(2)} CAD</span>
              </div>
              <PromoCodeInput
                shopSlug="boasty-collective"
                orderTotalCents={totalCents}
                appliedCode={appliedCode}
                discountCents={discountCents}
                onApply={(code, cents) => { setAppliedCode(code); setDiscountCents(cents) }}
                onRemove={() => { setAppliedCode(null); setDiscountCents(0) }}
                theme="light"
              />
              <button className="bc-cart-checkout-btn" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirecting...' : 'Proceed to Checkout'}
              </button>
              {checkoutError && (
                <p style={{ color: '#F4A261', fontSize: 12, textAlign: 'center', marginTop: 12 }}>{checkoutError}</p>
              )}
              <p className="bc-cart-secure">Secure checkout powered by Stripe</p>
            </div>
          </div>
        )}
      </div>

      <footer className="bc-cart-footer">
        <span className="bc-cart-footer-brand">Boasty<span> Collective</span></span>
        <p className="bc-cart-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
