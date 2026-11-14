'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { BELLI_PATH } from '@/app/products/belli-content'
import { BelliShell } from '@/components/storefront/belli/BelliShell'
import { BelliProductImage } from '@/components/storefront/belli/Products'

export default function BelliCartPage() {
  return (
    <BelliShell>
      <Bag />
    </BelliShell>
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
          shopSlug: 'belli',
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
    <div className="bl-wrap">
      <div className="bl-page">
        <h1 className="bl-display bl-page-title">Your bag</h1>

        {items.length === 0 ? (
          <div style={{ display: 'grid', gap: 24, maxWidth: 320 }}>
            <p className="bl-mono" style={{ margin: 0 }}>Nothing in here yet.</p>
            <Link href={`${BELLI_PATH}#merch`} className="bl-btn">Shop merch</Link>
          </div>
        ) : (
          <>
            <div style={{ borderTop: '2px solid var(--bl-black)' }}>
              {items.map(item => (
                <div key={`${item.product.slug}-${item.size}-${item.color}`} className="bl-cart-item">
                  <div className="bl-cart-thumb" style={item.image ? { background: '#fff' } : undefined}>
                    <BelliProductImage src={item.image || item.product.images?.[0]} alt={item.product.name} />
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <Link href={`${BELLI_PATH}/products/${item.product.slug}`} className="bl-cart-name">{item.product.name}</Link>
                    <span className="bl-label" style={{ fontWeight: 400 }}>{[item.size, item.color].filter(Boolean).join(' · ')}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
                      <div className="bl-qty">
                        <button onClick={() => item.quantity === 1 ? removeFromCart(item.product.slug, item.size, item.color) : updateQuantity(item.product.slug, item.quantity - 1, item.size, item.color)} aria-label="Fewer">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.slug, item.quantity + 1, item.size, item.color)} aria-label="More">+</button>
                      </div>
                      <button className="bl-textlink" style={{ fontSize: 13 }} onClick={() => removeFromCart(item.product.slug, item.size, item.color)}>Remove</button>
                    </div>
                  </div>
                  <span className="bl-mono" style={{ fontWeight: 700 }}>${(unit(item.product) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="bl-cart-summary">
              <div className="bl-cart-row" style={{ fontWeight: 700 }}><span>Subtotal</span><span>${total.toFixed(2)} {currency}</span></div>
              <div className="bl-cart-row" style={{ fontSize: 13 }}><span>Shipping</span><span>{isUS ? '$15 to the US' : '$10 across Canada'}, added at checkout</span></div>
              <button className="bl-btn" onClick={checkout} disabled={loading} style={{ marginTop: 12 }}>
                {loading ? 'Opening checkout…' : 'Check out'}
              </button>
              {error && <p className="bl-label" style={{ margin: 0 }}>{error}</p>}
              <Link href={`${BELLI_PATH}#merch`} className="bl-textlink" style={{ justifySelf: 'center', fontSize: 13 }}>Keep shopping</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
