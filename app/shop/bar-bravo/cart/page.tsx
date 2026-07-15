'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { PromoCodeInput } from '@/components/PromoCodeInput'
import { calcSaleDiscountCents } from '@/lib/sale'
import type { ActiveSale } from '@/lib/sale'

export default function BarBravoCartPage() {
  const { items, removeFromCart, updateQuantity, total, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#2d6b65'); setShopPath('/shop/bar-bravo') }, [setBrandColor, setShopPath])
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [appliedCode, setAppliedCode] = useState<string | null>(null)
  const [discountCents, setDiscountCents] = useState(0)
  const [activeSale, setActiveSale] = useState<ActiveSale>(null)

  const totalCents = Math.round(total * 100)
  const saleDiscountCents = calcSaleDiscountCents(totalCents, activeSale)
  const discountedTotal = Math.max(0, total - saleDiscountCents / 100 - discountCents / 100)

  useEffect(() => {
    fetch('/api/sale/active?shopSlug=bar-bravo').then(r => r.json()).then(setActiveSale).catch(() => {})
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
          shopSlug: 'bar-bravo',
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
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", background: '#0d1117', color: '#f0ead6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
        .bb-cart-nav { position: sticky; top: 0; z-index: 100; height: 68px; background: #f0ead6; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; border-bottom: 1px solid rgba(0,0,0,0.1); }
        .bb-cart-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #2d6b65; text-decoration: none; font-family: Georgia, serif; font-weight: 700; transition: opacity 0.2s; }
        .bb-cart-back:hover { opacity: 0.7; }
        .bb-cart-logo { height: 44px; object-fit: contain; }
        .bb-cart-body { flex: 1; max-width: 960px; margin: 0 auto; padding: 60px 48px; width: 100%; box-sizing: border-box; }
        .bb-cart-heading { font-size: 48px; font-weight: 900; letter-spacing: -0.02em; color: #f0ead6; margin-bottom: 40px; }
        .bb-cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 48px; align-items: start; }
        .bb-cart-item { display: grid; grid-template-columns: 88px 1fr auto auto; gap: 20px; align-items: center; padding: 24px 0; border-bottom: 1px solid rgba(240,234,214,0.08); }
        .bb-cart-item-img { width: 88px; height: 110px; object-fit: cover; background: #162030; display: block; }
        .bb-cart-item-name { font-size: 14px; font-weight: 700; color: #f0ead6; line-height: 1.4; margin-bottom: 4px; display: block; text-decoration: none; transition: color 0.2s; font-family: 'Playfair Display', Georgia, serif; }
        .bb-cart-item-name:hover { color: #2d6b65; }
        .bb-cart-item-meta { font-size: 12px; color: rgba(240,234,214,0.4); margin-bottom: 6px; font-family: Georgia, serif; }
        .bb-cart-item-price { font-size: 14px; color: #2d6b65; font-weight: 700; }
        .bb-cart-qty { display: flex; align-items: center; gap: 12px; }
        .bb-cart-qty-btn { width: 32px; height: 32px; border: 1px solid rgba(240,234,214,0.15); background: transparent; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #f0ead6; transition: border-color 0.2s; }
        .bb-cart-qty-btn:hover { border-color: #2d6b65; }
        .bb-cart-qty-num { font-size: 14px; min-width: 20px; text-align: center; font-weight: 600; }
        .bb-cart-remove { background: none; border: none; color: rgba(240,234,214,0.3); font-size: 16px; cursor: pointer; padding: 4px; transition: color 0.2s; }
        .bb-cart-remove:hover { color: #f0ead6; }
        .bb-cart-summary { background: #111820; border: 1px solid rgba(240,234,214,0.08); padding: 32px; }
        .bb-cart-summary-title { font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #f0ead6; margin-bottom: 24px; font-family: Georgia, serif; }
        .bb-cart-summary-row { display: flex; justify-content: space-between; font-size: 14px; color: rgba(240,234,214,0.5); margin-bottom: 12px; font-family: Georgia, serif; }
        .bb-cart-summary-total { font-size: 16px; font-weight: 700; color: #f0ead6; border-top: 1px solid rgba(240,234,214,0.1); padding-top: 16px; margin-top: 8px; }
        .bb-cart-checkout-btn { width: 100%; margin-top: 24px; padding: 18px; color: #f0ead6; background: #2d6b65; border: none; font-family: Georgia, serif; font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s; }
        .bb-cart-checkout-btn:hover { opacity: 0.9; }
        .bb-cart-checkout-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .bb-cart-secure { font-size: 10px; color: rgba(240,234,214,0.25); text-align: center; margin-top: 14px; letter-spacing: 0.1em; font-family: Georgia, serif; }
        .bb-cart-empty { text-align: center; padding: 80px 20px; }
        .bb-cart-empty p { font-size: 16px; color: rgba(240,234,214,0.4); margin-bottom: 32px; font-family: Georgia, serif; }
        .bb-cart-browse { display: inline-block; padding: 16px 40px; background: #2d6b65; color: #f0ead6; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; font-family: Georgia, serif; }
        .bb-cart-footer { background: #060a0f; border-top: 1px solid rgba(240,234,214,0.06); padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: auto; }
        .bb-cart-footer-brand { font-size: 20px; font-weight: 900; color: #2d6b65; font-family: 'Playfair Display', Georgia, serif; }
        .bb-cart-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(240,234,214,0.2); font-family: Georgia, serif; }
        @media (max-width: 768px) {
          .bb-cart-nav { padding: 0 20px; height: 58px; }
          .bb-cart-logo { height: 36px; }
          .bb-cart-body { padding: 32px 20px; }
          .bb-cart-heading { font-size: 36px; margin-bottom: 24px; }
          .bb-cart-layout { grid-template-columns: 1fr; gap: 32px; }
          .bb-cart-item { grid-template-columns: 72px 1fr auto auto; gap: 12px; padding: 16px 0; }
          .bb-cart-item-img { width: 72px; height: 90px; }
          .bb-cart-footer { padding: 24px 20px; }
        }
      `}</style>

      <nav className="bb-cart-nav">
        <Link href="/shop/bar-bravo" className="bb-cart-back">← Continue Shopping</Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bar-bravo-logo.png" alt="Bar Bravo" className="bb-cart-logo" />
        <span />
      </nav>

      <div className="bb-cart-body">
        <h1 className="bb-cart-heading">Your Cart</h1>

        {items.length === 0 ? (
          <div className="bb-cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop/bar-bravo" className="bb-cart-browse">Browse Products</Link>
          </div>
        ) : (
          <div className="bb-cart-layout">
            <div>
              {items.map(({ product, quantity, size, color }) => (
                <div key={`${product.slug}-${size}-${color}`} className="bb-cart-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.images?.[0]} alt={product.name} className="bb-cart-item-img" />
                  <div>
                    <Link href={`/shop/bar-bravo/products/${product.slug}`} className="bb-cart-item-name">{product.name}</Link>
                    {(size || color) && (
                      <p className="bb-cart-item-meta">{[size, color].filter(Boolean).join(' · ')}</p>
                    )}
                    <p className="bb-cart-item-price">${product.price}</p>
                  </div>
                  <div className="bb-cart-qty">
                    <button className="bb-cart-qty-btn" onClick={() => quantity === 1 ? removeFromCart(product.slug, size, color) : updateQuantity(product.slug, quantity - 1, size, color)}>−</button>
                    <span className="bb-cart-qty-num">{quantity}</span>
                    <button className="bb-cart-qty-btn" onClick={() => updateQuantity(product.slug, quantity + 1, size, color)}>+</button>
                  </div>
                  <button className="bb-cart-remove" onClick={() => removeFromCart(product.slug, size, color)}>✕</button>
                </div>
              ))}
            </div>

            <div className="bb-cart-summary">
              <p className="bb-cart-summary-title">Order Summary</p>
              <div className="bb-cart-summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)} CAD</span>
              </div>
              {saleDiscountCents > 0 && (
                <div className="bb-cart-summary-row" style={{ color: '#ff6b6b' }}>
                  <span>{activeSale!.name}</span>
                  <span>−${(saleDiscountCents / 100).toFixed(2)} CAD</span>
                </div>
              )}
              {discountCents > 0 && (
                <div className="bb-cart-summary-row" style={{ color: '#86efac' }}>
                  <span>Promo Code</span>
                  <span>−${(discountCents / 100).toFixed(2)} CAD</span>
                </div>
              )}
              <div className="bb-cart-summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="bb-cart-summary-row bb-cart-summary-total">
                <span>Total</span>
                <span>${discountedTotal.toFixed(2)} CAD</span>
              </div>
              <PromoCodeInput
                shopSlug="bar-bravo"
                orderTotalCents={totalCents}
                appliedCode={appliedCode}
                discountCents={discountCents}
                onApply={(code, cents) => { setAppliedCode(code); setDiscountCents(cents) }}
                onRemove={() => { setAppliedCode(null); setDiscountCents(0) }}
                theme="dark"
              />
              <button className="bb-cart-checkout-btn" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirecting...' : 'Proceed to Checkout'}
              </button>
              {checkoutError && (
                <p style={{ color: '#e74c3c', fontSize: 12, textAlign: 'center', marginTop: 12 }}>{checkoutError}</p>
              )}
              <p className="bb-cart-secure">Secure checkout powered by Stripe</p>
            </div>
          </div>
        )}
      </div>

      <footer className="bb-cart-footer">
        <span className="bb-cart-footer-brand">Bar Bravo</span>
        <p className="bb-cart-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
