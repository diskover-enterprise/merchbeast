'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { LittleFlowerShell } from '@/components/storefront/little-flower/LittleFlowerShell'
import { LITTLE_FLOWER_PATH } from '@/components/storefront/little-flower/Header'
import { ProductImage } from '@/components/storefront/little-flower/Products'

export default function LittleFlowerCartPage() {
  return (
    <LittleFlowerShell>
      <Bag />
    </LittleFlowerShell>
  )
}

function Bag() {
  const { items, removeFromCart, updateQuantity, total, isUS, currency } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function checkout() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ slug: i.product.slug, quantity: i.quantity, size: i.size, color: i.color, image: i.image })),
          shopSlug: 'little-flower',
          isUS,
        }),
      })
      const data = await res.json()
      if (data.url) { window.location.href = data.url; return }
      setError('Checkout didn’t open. Try again in a moment.')
    } catch {
      setError('Checkout didn’t open. Try again in a moment.')
    }
    setLoading(false)
  }

  const unit = (p: (typeof items)[number]['product']) =>
    currency === 'USD' ? p.priceUsd! / 100 : parseFloat(p.price.replace(/[^0-9.]/g, ''))

  return (
    <div className="lf-wrap">
      <div className="lf-cart">
        <h1 className="lf-heading-l" style={{ margin: '0 0 40px' }}>Your bag</h1>

        {items.length === 0 ? (
          <div style={{ display: 'grid', gap: 24, maxWidth: 320 }}>
            <p className="lf-body lf-muted" style={{ margin: 0 }}>Nothing in here yet.</p>
            <Link href={LITTLE_FLOWER_PATH} className="lf-btn">Back to the shop</Link>
          </div>
        ) : (
          <>
            <div style={{ borderTop: '2px solid var(--lf-ink)' }}>
              {items.map(item => (
                <div key={`${item.product.slug}-${item.size}-${item.color}`} className="lf-cart-item">
                  <div className="lf-cart-thumb">
                    <ProductImage src={item.image || item.product.images?.[0]} alt={item.product.name} />
                  </div>
                  <div style={{ display: 'grid', gap: 6 }}>
                    <Link href={`${LITTLE_FLOWER_PATH}/products/${item.product.slug}`} style={{ textDecoration: 'none', fontWeight: 500 }}>{item.product.name}</Link>
                    <span className="lf-label">{[item.size, item.color].filter(Boolean).join(' · ')}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 6 }}>
                      <div className="lf-qty">
                        <button onClick={() => item.quantity === 1 ? removeFromCart(item.product.slug, item.size, item.color) : updateQuantity(item.product.slug, item.quantity - 1, item.size, item.color)} aria-label="Fewer">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.slug, item.quantity + 1, item.size, item.color)} aria-label="More">+</button>
                      </div>
                      <button className="lf-textlink" onClick={() => removeFromCart(item.product.slug, item.size, item.color)}>Remove</button>
                    </div>
                  </div>
                  <span style={{ fontSize: 15 }}>${(unit(item.product) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="lf-cart-summary">
              <div className="lf-cart-row" style={{ fontWeight: 600 }}><span>Subtotal</span><span>${total.toFixed(2)} {currency}</span></div>
              <div className="lf-cart-row lf-muted" style={{ fontSize: 13 }}><span>Shipping</span><span>{isUS ? '$15 to the US' : '$10 across Canada'}, added at checkout</span></div>
              <button className="lf-btn" onClick={checkout} disabled={loading} style={{ marginTop: 16 }}>
                {loading ? 'Opening checkout…' : 'Check out'}
              </button>
              {error && <p className="lf-label" style={{ color: 'var(--lf-maroon)', margin: 0 }}>{error}</p>}
              <Link href={LITTLE_FLOWER_PATH} className="lf-textlink" style={{ justifySelf: 'center', marginTop: 8 }}>Keep shopping</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
