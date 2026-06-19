'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'

type Product = {
  id: string; slug: string; name: string; price: string; description: string
  images: string[]; sizes: string[]; colors: string[]; tag: string | null
}

export default function The1982ProductClient({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart, count, setBrandColor, setShopPath } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  function handleAddToCart() {
    if (product.sizes.length > 1 && !selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    setBrandColor('#B8860B')
    setShopPath('/shop/the-1982')
    addToCart(product as any, selectedSize || product.sizes[0], selectedColor || product.colors[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <style>{`
        .t82-pnav { position: sticky; top: 0; z-index: 100; height: 64px; background: rgba(10,10,10,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .t82-pnav-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
        .t82-pnav-back:hover { color: #B8860B; }
        .t82-pnav-brand { font-size: 15px; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; color: #fff; }
        .t82-pnav-brand span { color: #B8860B; }
        .t82-pnav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 9px 20px; border: 1px solid rgba(255,255,255,0.25); white-space: nowrap; transition: border-color 0.2s, color 0.2s; }
        .t82-pnav-cart:hover { border-color: #B8860B; color: #B8860B; }
        .t82-pwrap { max-width: 1200px; margin: 0 auto; padding: 60px 40px; }
        .t82-playout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .t82-related { margin-top: 80px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.08); }
        .t82-related-title { font-size: 11px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 40px; }
        .t82-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 20px; }
        .t82-footer { background: #000; border-top: 1px solid rgba(255,255,255,0.06); padding: 48px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 80px; }
        .t82-footer-brand { font-size: 14px; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; color: #B8860B; }
        .t82-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          .t82-pnav { padding: 0 16px; height: 56px; }
          .t82-pwrap { padding: 32px 20px; }
          .t82-playout { grid-template-columns: 1fr; gap: 28px; }
          .t82-related-grid { grid-template-columns: repeat(2, 1fr); }
          .t82-footer { padding: 28px 20px; margin-top: 48px; }
        }
        @media (max-width: 480px) { .t82-related-grid { grid-template-columns: 1fr; } }
      `}</style>

      <nav className="t82-pnav">
        <Link href="/shop/the-1982" className="t82-pnav-back">← Shop</Link>
        <span className="t82-pnav-brand">The <span>1982</span></span>
        <Link href="/shop/the-1982/cart" className="t82-pnav-cart">Cart{count > 0 ? ` (${count})` : ''}</Link>
      </nav>

      <div className="t82-pwrap">
        <div className="t82-playout">
          <div>
            <div style={{ aspectRatio: '4/5', background: '#1a1a1a', overflow: 'hidden', marginBottom: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 12 }} />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, padding: 0, border: i === activeImg ? '2px solid #B8860B' : '2px solid transparent', background: '#1a1a1a', cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 4 }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ paddingTop: 16 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>{product.name}</h1>
            <p style={{ fontSize: 24, color: '#B8860B', fontWeight: 700, marginBottom: 24 }}>{product.price}</p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>{product.description}</p>

            {product.sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, color: sizeError ? '#e53e3e' : 'rgba(255,255,255,0.4)', marginBottom: 12 }}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{ width: 52, height: 52, fontSize: 12, fontWeight: 700, fontFamily: "'Helvetica Neue', sans-serif", cursor: 'pointer', border: selectedSize === s ? '2px solid #B8860B' : '2px solid rgba(255,255,255,0.15)', background: selectedSize === s ? '#B8860B' : 'transparent', color: '#fff', letterSpacing: '0.05em', transition: 'all 0.15s' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleAddToCart} style={{ width: '100%', padding: '18px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, background: added ? '#2d7a3a' : '#B8860B', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: 12, transition: 'background 0.2s' }}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link href="/shop/the-1982/cart" style={{ display: 'block', width: '100%', padding: '16px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', textDecoration: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}>
              View Cart{count > 0 ? ` (${count})` : ''}
            </Link>

            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 20, letterSpacing: '0.1em', textAlign: 'center' }}>Secure checkout powered by Stripe</p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="t82-related">
            <p className="t82-related-title">More from the shop</p>
            <div className="t82-related-grid">
              {related.map(p => (
                <Link key={p.slug} href={`/shop/the-1982/products/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ aspectRatio: '4/5', background: '#1a1a1a', overflow: 'hidden', marginBottom: 12 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 8 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: '#fff', flex: 1, marginRight: 8 }}>{p.name}</h3>
                    <span style={{ fontSize: 13, color: '#B8860B', fontWeight: 700, flexShrink: 0 }}>{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="t82-footer">
        <span className="t82-footer-brand">The 1982</span>
        <p className="t82-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
