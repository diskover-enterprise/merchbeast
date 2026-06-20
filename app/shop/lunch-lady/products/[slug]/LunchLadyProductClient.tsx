'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'

type Product = {
  id: string; slug: string; name: string; price: string; description: string
  images: string[]; sizes: string[]; colors: string[]; tag: string | null
}

export default function LunchLadyProductClient({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart, count, setBrandColor, setShopPath } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    setBrandColor('#1C2E54')
    setShopPath('/shop/lunch-lady')
  }, [setBrandColor, setShopPath])

  function handleAddToCart() {
    if (product.sizes.length > 1 && !selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    addToCart(product as any, selectedSize || product.sizes[0], selectedColor || product.colors[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#fff', color: '#111', minHeight: '100vh', border: '12px solid #D4911E', boxSizing: 'border-box' }}>
      <style>{`
        .ll-pnav { position: sticky; top: 0; z-index: 100; height: 64px; background: rgba(255,255,255,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid #e8e8e8; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .ll-pnav-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; text-decoration: none; transition: color 0.2s; font-family: Georgia, serif; }
        .ll-pnav-back:hover { color: #111; }
        .ll-pnav-brand { font-size: 13px; font-weight: 400; letter-spacing: 0.08em; color: #111; font-style: italic; }
        .ll-pnav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #111; text-decoration: none; padding: 9px 20px; border: 1px solid #111; white-space: nowrap; font-family: Georgia, serif; }
        .ll-pwrap { max-width: 1100px; margin: 0 auto; padding: 60px 40px; }
        .ll-playout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .ll-related { margin-top: 80px; padding-top: 40px; border-top: 1px solid #e8e8e8; }
        .ll-related-title { font-size: 11px; font-weight: 400; letter-spacing: 0.4em; text-transform: uppercase; color: #888; margin-bottom: 40px; }
        .ll-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 20px; }
        .ll-footer { padding: 40px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e8e8e8; flex-wrap: wrap; gap: 16px; margin-top: 80px; }
        .ll-footer-brand { font-size: 14px; font-style: italic; color: #111; }
        .ll-footer-copy { font-size: 10px; color: #ccc; letter-spacing: 0.15em; text-transform: uppercase; }
        @media (max-width: 768px) {
          .ll-pnav { padding: 0 16px; height: 56px; }
          .ll-pwrap { padding: 32px 20px; }
          .ll-playout { grid-template-columns: 1fr; gap: 28px; }
          .ll-related-grid { grid-template-columns: repeat(2, 1fr); }
          .ll-footer { padding: 24px 16px; margin-top: 48px; }
        }
        @media (max-width: 480px) { .ll-related-grid { grid-template-columns: 1fr; } }
      `}</style>

      <nav className="ll-pnav">
        <Link href="/shop/lunch-lady" className="ll-pnav-back">← Shop</Link>
        <span className="ll-pnav-brand">Lunch Lady</span>
        <Link href="/shop/lunch-lady/cart" className="ll-pnav-cart">Cart{count > 0 ? ` (${count})` : ''}</Link>
      </nav>

      <div className="ll-pwrap">
        <div className="ll-playout">
          <div>
            <div style={{ aspectRatio: '4/5', background: '#f5f2ee', overflow: 'hidden', marginBottom: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 16 }} />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, padding: 0, border: i === activeImg ? '2px solid #1C2E54' : '2px solid transparent', background: '#f5f2ee', cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 4 }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ paddingTop: 16 }}>
            <div style={{ width: 40, height: 2, background: '#C84020', marginBottom: 20 }} />
            <h1 style={{ fontSize: 28, fontWeight: 400, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.01em', color: '#111' }}>{product.name}</h1>
            <p style={{ fontSize: 22, color: '#C84020', fontWeight: 600, marginBottom: 24, fontFamily: 'Georgia, serif' }}>{product.price}</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666', marginBottom: 32 }}>{product.description}</p>

            {product.sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 400, color: sizeError ? '#C84020' : '#888', marginBottom: 12, fontFamily: 'Georgia, serif' }}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{ width: 52, height: 52, fontSize: 12, fontWeight: 400, fontFamily: 'Georgia, serif', cursor: 'pointer', border: selectedSize === s ? '2px solid #1C2E54' : '1px solid #ddd', background: selectedSize === s ? '#1C2E54' : 'transparent', color: selectedSize === s ? '#fff' : '#111', letterSpacing: '0.05em', transition: 'all 0.15s' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleAddToCart} style={{ width: '100%', padding: '18px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', fontWeight: 400, background: added ? '#2d7a3a' : '#1C2E54', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: 12, transition: 'background 0.2s' }}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link href="/shop/lunch-lady/cart" style={{ display: 'block', width: '100%', padding: '16px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', fontWeight: 400, textAlign: 'center', border: '1px solid #111', color: '#111', textDecoration: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}>
              View Cart{count > 0 ? ` (${count})` : ''}
            </Link>

            <p style={{ fontSize: 11, color: '#ccc', marginTop: 20, letterSpacing: '0.1em', textAlign: 'center', fontFamily: 'Georgia, serif' }}>Secure checkout powered by Stripe</p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="ll-related">
            <p className="ll-related-title">More from the shop</p>
            <div className="ll-related-grid">
              {related.map(p => (
                <Link key={p.slug} href={`/shop/lunch-lady/products/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ aspectRatio: '4/5', background: '#f5f2ee', overflow: 'hidden', marginBottom: 12 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 8 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.4, color: '#111', flex: 1, marginRight: 8 }}>{p.name}</h3>
                    <span style={{ fontSize: 13, color: '#C84020', fontWeight: 600, flexShrink: 0 }}>{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="ll-footer">
        <span className="ll-footer-brand">Lunch Lady</span>
        <p className="ll-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
