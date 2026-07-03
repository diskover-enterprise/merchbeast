'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'

export default function FatRabbitCartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, setBrandColor, setShopPath } = useCart()

  useEffect(() => {
    setBrandColor('#C5442A')
    setShopPath('/shop/fat-rabbit')
  }, [setBrandColor, setShopPath])

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: '#E8E4DC', color: '#1a1a1a', minHeight: '100vh' }}>
      <style>{`
        .frc-nav { position: sticky; top: 0; z-index: 100; height: 72px; background: rgba(232,228,220,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(197,68,42,0.15); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .frc-nav-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #999; text-decoration: none; transition: color 0.2s; }
        .frc-nav-back:hover { color: #C5442A; }
        .frc-nav-logo { height: 48px; object-fit: contain; }
        .frc-wrap { max-width: 800px; margin: 0 auto; padding: 60px 40px; }
        .frc-title { font-size: 32px; font-weight: 400; font-style: italic; margin-bottom: 40px; }
        .frc-empty { text-align: center; padding: 80px 0; }
        .frc-empty p { font-size: 16px; color: #999; font-style: italic; margin-bottom: 24px; }
        .frc-item { display: grid; grid-template-columns: 80px 1fr auto; gap: 16px; align-items: center; padding: 20px 0; border-bottom: 1px solid rgba(197,68,42,0.15); }
        .frc-item-img { width: 80px; height: 80px; object-fit: cover; background: #D9D4CA; }
        .frc-item-name { font-size: 15px; font-weight: 400; font-style: italic; margin-bottom: 4px; }
        .frc-item-meta { font-size: 11px; color: #999; letter-spacing: 0.1em; text-transform: uppercase; }
        .frc-qty { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
        .frc-qty-btn { width: 28px; height: 28px; border: 1px solid #ccc; background: transparent; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; color: #1a1a1a; font-family: Georgia, serif; transition: border-color 0.2s; }
        .frc-qty-btn:hover { border-color: #C5442A; color: #C5442A; }
        .frc-remove { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #bbb; background: none; border: none; cursor: pointer; margin-left: 16px; font-family: Georgia, serif; transition: color 0.2s; }
        .frc-remove:hover { color: #C5442A; }
        .frc-item-price { font-size: 16px; color: #C5442A; font-weight: 600; text-align: right; }
        .frc-summary { margin-top: 40px; padding-top: 32px; border-top: 2px solid #C5442A; }
        .frc-subtotal { display: flex; justify-content: space-between; font-size: 18px; margin-bottom: 24px; }
        .frc-subtotal-label { font-style: italic; color: #555; }
        .frc-subtotal-val { font-weight: 600; color: #C5442A; }
        .frc-checkout { display: block; width: 100%; padding: 18px 32px; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; font-family: Georgia, serif; font-weight: 400; background: #C5442A; color: #fff; border: none; cursor: pointer; text-align: center; text-decoration: none; transition: opacity 0.2s; margin-bottom: 12px; box-sizing: border-box; }
        .frc-checkout:hover { opacity: 0.9; }
        .frc-continue { display: block; text-align: center; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #999; text-decoration: none; transition: color 0.2s; }
        .frc-continue:hover { color: #C5442A; }
        @media (max-width: 640px) {
          .frc-nav { padding: 0 16px; height: 60px; }
          .frc-wrap { padding: 32px 20px; }
          .frc-title { font-size: 24px; margin-bottom: 28px; }
          .frc-item { grid-template-columns: 64px 1fr auto; gap: 12px; }
          .frc-item-img { width: 64px; height: 64px; }
        }
      `}</style>

      <nav className="frc-nav">
        <Link href="/shop/fat-rabbit" className="frc-nav-back">← Shop</Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://res.cloudinary.com/dwjvblzu9/image/upload/v1783059789/scrol-to-top_uitiui.png" alt="Fat Rabbit" className="frc-nav-logo" />
        <span style={{ width: 80 }} />
      </nav>

      <div className="frc-wrap">
        <h1 className="frc-title">Your Cart</h1>

        {items.length === 0 ? (
          <div className="frc-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop/fat-rabbit" style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C5442A', textDecoration: 'none', border: '1px solid #C5442A', padding: '12px 24px', display: 'inline-block' }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {items.map(item => (
              <div key={`${item.slug}-${item.size}-${item.color}`} className="frc-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="frc-item-img" />
                <div>
                  <p className="frc-item-name">{item.name}</p>
                  <p className="frc-item-meta">{[item.size, item.color].filter(Boolean).join(' · ')}</p>
                  <div className="frc-qty">
                    <button className="frc-qty-btn" onClick={() => updateQuantity(item.slug, item.size, item.color, item.quantity - 1)}>−</button>
                    <span style={{ fontSize: 14, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                    <button className="frc-qty-btn" onClick={() => updateQuantity(item.slug, item.size, item.color, item.quantity + 1)}>+</button>
                    <button className="frc-remove" onClick={() => removeFromCart(item.slug, item.size, item.color)}>Remove</button>
                  </div>
                </div>
                <div className="frc-item-price">${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
              </div>
            ))}

            <div className="frc-summary">
              <div className="frc-subtotal">
                <span className="frc-subtotal-label">Subtotal</span>
                <span className="frc-subtotal-val">${subtotal.toFixed(2)}</span>
              </div>
              <a href="/api/checkout" className="frc-checkout" onClick={async (e) => {
                e.preventDefault()
                const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items, shopPath: '/shop/fat-rabbit' }) })
                const data = await res.json()
                if (data.url) window.location.href = data.url
              }}>
                Proceed to Checkout
              </a>
              <Link href="/shop/fat-rabbit" className="frc-continue">Continue Shopping</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
