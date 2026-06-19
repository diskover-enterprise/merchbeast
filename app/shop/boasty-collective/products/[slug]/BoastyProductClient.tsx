'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'

type Product = {
  id: string; slug: string; name: string; price: string; description: string
  images: string[]; sizes: string[]; colors: string[]; tag: string | null
}

export default function BoastyProductClient({ product, related }: { product: Product; related: Product[] }) {
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
    setBrandColor('#003A5C')
    setShopPath('/shop/boasty-collective')
    addToCart(product as any, selectedSize || product.sizes[0], selectedColor || product.colors[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#f9f6f0', color: '#1a1a2e', minHeight: '100vh' }}>
      <style>{`
        .bc-pnav { position: sticky; top: 0; z-index: 100; height: 64px; background: #003A5C; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .bc-pnav-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
        .bc-pnav-back:hover { color: #F4A261; }
        .bc-pnav-brand { font-size: 13px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; }
        .bc-pnav-brand span { color: #F4A261; }
        .bc-pnav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 9px 20px; border: 1px solid rgba(255,255,255,0.25); white-space: nowrap; transition: border-color 0.2s, color 0.2s; }
        .bc-pnav-cart:hover { border-color: #F4A261; color: #F4A261; }
        .bc-pwrap { max-width: 1200px; margin: 0 auto; padding: 60px 40px; }
        .bc-playout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .bc-related { margin-top: 80px; padding-top: 40px; border-top: 2px solid rgba(0,58,92,0.1); }
        .bc-related-title { font-size: 11px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: #003A5C; margin-bottom: 40px; }
        .bc-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 20px; }
        .bc-footer { background: #001f33; padding: 48px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 80px; }
        .bc-footer-brand { font-size: 14px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; }
        .bc-footer-brand span { color: #F4A261; }
        .bc-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          .bc-pnav { padding: 0 16px; height: 56px; }
          .bc-pwrap { padding: 32px 20px; }
          .bc-playout { grid-template-columns: 1fr; gap: 28px; }
          .bc-related-grid { grid-template-columns: repeat(2, 1fr); }
          .bc-footer { padding: 28px 20px; margin-top: 48px; }
        }
        @media (max-width: 480px) { .bc-related-grid { grid-template-columns: 1fr; } }
      `}</style>

      <nav className="bc-pnav">
        <Link href="/shop/boasty-collective" className="bc-pnav-back">← Shop</Link>
        <span className="bc-pnav-brand">Boasty<span> Collective</span></span>
        <Link href="/shop/boasty-collective/cart" className="bc-pnav-cart">Cart{count > 0 ? ` (${count})` : ''}</Link>
      </nav>

      <div className="bc-pwrap">
        <div className="bc-playout">
          <div>
            <div style={{ aspectRatio: '4/5', background: '#ede8df', overflow: 'hidden', marginBottom: 12, borderRadius: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 12 }} />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, padding: 0, border: i === activeImg ? '2px solid #003A5C' : '2px solid transparent', background: '#ede8df', cursor: 'pointer', overflow: 'hidden', flexShrink: 0, borderRadius: 3 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 4 }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ paddingTop: 16 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.01em', textTransform: 'uppercase', color: '#003A5C' }}>{product.name}</h1>
            <p style={{ fontSize: 24, color: '#F4A261', fontWeight: 700, marginBottom: 24 }}>{product.price}</p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#555', marginBottom: 32 }}>{product.description}</p>

            {product.sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, color: sizeError ? '#e53e3e' : '#003A5C', marginBottom: 12 }}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{ width: 52, height: 52, fontSize: 12, fontWeight: 700, fontFamily: "'Helvetica Neue', sans-serif", cursor: 'pointer', border: selectedSize === s ? '2px solid #003A5C' : '2px solid #d0c8bb', background: selectedSize === s ? '#003A5C' : 'transparent', color: selectedSize === s ? '#fff' : '#1a1a2e', letterSpacing: '0.05em', transition: 'all 0.15s', borderRadius: 3 }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleAddToCart} style={{ width: '100%', padding: '18px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, background: added ? '#2d7a3a' : '#003A5C', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: 12, transition: 'background 0.2s', borderRadius: 3 }}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link href="/shop/boasty-collective/cart" style={{ display: 'block', width: '100%', padding: '16px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, textAlign: 'center', border: '1px solid #d0c8bb', color: '#1a1a2e', textDecoration: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', borderRadius: 3 }}>
              View Cart{count > 0 ? ` (${count})` : ''}
            </Link>

            <p style={{ fontSize: 11, color: '#bbb', marginTop: 20, letterSpacing: '0.1em', textAlign: 'center' }}>Secure checkout powered by Stripe</p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="bc-related">
            <p className="bc-related-title">More from the shop</p>
            <div className="bc-related-grid">
              {related.map(p => (
                <Link key={p.slug} href={`/shop/boasty-collective/products/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ aspectRatio: '4/5', background: '#ede8df', overflow: 'hidden', marginBottom: 12, borderRadius: 4 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 8 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: '#1a1a2e', flex: 1, marginRight: 8 }}>{p.name}</h3>
                    <span style={{ fontSize: 13, color: '#F4A261', fontWeight: 700, flexShrink: 0 }}>{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bc-footer">
        <span className="bc-footer-brand">Boasty<span> Collective</span></span>
        <p className="bc-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
