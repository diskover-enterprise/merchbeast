'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { MagariShell } from '@/components/storefront/magari/MagariShell'
import { MAGARI_PATH } from '@/components/storefront/magari/Header'
import { ChalkHeading } from '@/components/storefront/magari/Chalk'

export default function MagariCartPage() {
  return (
    <MagariShell>
      <Bag />
    </MagariShell>
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
          shopSlug: 'magari',
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
    <div className="mg-wrap">
      <div className="mg-cart">
        <ChalkHeading as="h1" size="l" tilt={-1.5} style={{ marginBottom: 40 }}>your bag.</ChalkHeading>

        {items.length === 0 ? (
          <div style={{ display: 'grid', gap: 24, maxWidth: 320 }}>
            <p className="mg-body mg-muted" style={{ margin: 0 }}>Nothing in here yet.</p>
            <Link href={MAGARI_PATH} className="mg-btn">Back to the shop</Link>
          </div>
        ) : (
          <>
            <div style={{ borderTop: '1px solid var(--mg-ink)' }}>
              {items.map(item => (
                <div key={`${item.product.slug}-${item.size}-${item.color}`} className="mg-cart-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {item.image || item.product.images?.[0] ? <img src={item.image || item.product.images[0]} alt={item.product.name} /> : <span style={{ background: '#E8E3D9', aspectRatio: '4 / 5' }} />}
                  <div style={{ display: 'grid', gap: 6 }}>
                    <Link href={`${MAGARI_PATH}/products/${item.product.slug}`} style={{ textDecoration: 'none', fontWeight: 500 }}>{item.product.name}</Link>
                    <span className="mg-label">{[item.size, item.color].filter(Boolean).join(' · ')}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 6 }}>
                      <div className="mg-qty">
                        <button onClick={() => item.quantity === 1 ? removeFromCart(item.product.slug, item.size, item.color) : updateQuantity(item.product.slug, item.quantity - 1, item.size, item.color)} aria-label="Fewer">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.slug, item.quantity + 1, item.size, item.color)} aria-label="More">+</button>
                      </div>
                      <button className="mg-textlink" onClick={() => removeFromCart(item.product.slug, item.size, item.color)}>Remove</button>
                    </div>
                  </div>
                  <span style={{ fontSize: 15 }}>${(unit(item.product) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mg-cart-summary">
              <div className="mg-cart-row"><span>Subtotal</span><span>${total.toFixed(2)} {currency}</span></div>
              <div className="mg-cart-row mg-muted" style={{ fontSize: 13 }}><span>Shipping</span><span>{isUS ? '$15 to the US' : '$10 across Canada'}, added at checkout</span></div>
              <button className="mg-btn" onClick={checkout} disabled={loading} style={{ marginTop: 16 }}>
                {loading ? 'Opening checkout…' : 'Check out'}
              </button>
              {error && <p className="mg-label" style={{ color: 'var(--mg-ink)', margin: 0 }}>{error}</p>}
              <Link href={MAGARI_PATH} className="mg-textlink" style={{ justifySelf: 'center', marginTop: 8 }}>Keep looking</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
