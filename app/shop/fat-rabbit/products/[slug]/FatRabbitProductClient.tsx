'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'

type Product = {
  id: string; slug: string; name: string; price: string; description: string
  images: string[]; sizes: string[]; colors: string[]; tag: string | null
}

export default function FatRabbitProductClient({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart, count, setBrandColor, setShopPath } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    setBrandColor('#C5442A')
    setShopPath('/shop/fat-rabbit')
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
    <div style={{ fontFamily: "'Georgia', serif", background: '#E8E4DC', color: '#1a1a1a', minHeight: '100vh' }}>
      <style>{`
        .fr-pnav { position: sticky; top: 0; z-index: 100; height: 72px; background: rgba(232,228,220,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(197,68,42,0.15); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .fr-pnav-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #999; text-decoration: none; transition: color 0.2s; }
        .fr-pnav-back:hover { color: #C5442A; }
        .fr-pnav-logo { height: 48px; object-fit: contain; }
        .fr-pnav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #1a1a1a; text-decoration: none; padding: 9px 20px; border: 1px solid #C5442A; white-space: nowrap; transition: all 0.2s; }
        .fr-pnav-cart:hover { background: #C5442A; color: #fff; }
        .fr-pwrap { max-width: 1200px; margin: 0 auto; padding: 60px 40px; }
        .fr-playout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .fr-related { margin-top: 80px; padding-top: 40px; border-top: 2px solid #C5442A; }
        .fr-related-title { font-size: 11px; font-weight: 400; letter-spacing: 0.4em; text-transform: uppercase; color: #999; margin-bottom: 40px; }
        .fr-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 20px; }
        .fr-footer { padding: 40px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(197,68,42,0.2); flex-wrap: wrap; gap: 12px; margin-top: 80px; }
        .fr-footer-logo { height: 40px; object-fit: contain; }
        .fr-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #aaa; }
        @media (max-width: 768px) {
          .fr-pnav { padding: 0 16px; height: 60px; }
          .fr-pwrap { padding: 32px 20px; }
          .fr-playout { grid-template-columns: 1fr; gap: 28px; }
          .fr-related-grid { grid-template-columns: repeat(2, 1fr); }
          .fr-footer { padding: 28px 20px; margin-top: 48px; }
        }
        @media (max-width: 480px) { .fr-related-grid { grid-template-columns: 1fr; } }
      `}</style>

      <nav className="fr-pnav">
        <Link href="/shop/fat-rabbit" className="fr-pnav-back">← Shop</Link>
        <Link href="/shop/fat-rabbit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fat-rabbit-logo.png" alt="Fat Rabbit" className="fr-pnav-logo" />
        </Link>
        <Link href="/shop/fat-rabbit/cart" className="fr-pnav-cart">Cart{count > 0 ? ` (${count})` : ''}</Link>
      </nav>

      <div className="fr-pwrap">
        <div className="fr-playout">
          <div>
            <div style={{ aspectRatio: '4/5', background: '#D9D4CA', overflow: 'hidden', marginBottom: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, padding: 0, border: i === activeImg ? '2px solid #C5442A' : '2px solid transparent', background: '#D9D4CA', cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ paddingTop: 16 }}>
            <h1 style={{ fontSize: 36, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.2, marginBottom: 16 }}>{product.name}</h1>
            <p style={{ fontSize: 26, color: '#C5442A', fontWeight: 600, marginBottom: 24 }}>${product.price}</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666', marginBottom: 32 }}>{product.description}</p>

            {product.sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: sizeError ? '#C5442A' : '#999', marginBottom: 12 }}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.sizes.filter(s => s !== '2XL').map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{ width: 52, height: 52, fontSize: 12, fontFamily: 'Georgia, serif', cursor: 'pointer', border: selectedSize === s ? '2px solid #C5442A' : '2px solid #ccc', background: selectedSize === s ? '#C5442A' : 'transparent', color: selectedSize === s ? '#fff' : '#1a1a1a', transition: 'all 0.15s' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#999', marginBottom: 12 }}>Colour</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.colors.map(c => (
                    <button key={c} onClick={() => setSelectedColor(c)} style={{ padding: '6px 14px', fontSize: 12, fontFamily: 'Georgia, serif', cursor: 'pointer', border: selectedColor === c ? '2px solid #C5442A' : '2px solid #ccc', background: selectedColor === c ? '#C5442A' : 'transparent', color: selectedColor === c ? '#fff' : '#1a1a1a', transition: 'all 0.15s' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleAddToCart} style={{ width: '100%', padding: '18px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', fontWeight: 400, background: added ? '#2d7a3a' : '#C5442A', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: 12, transition: 'background 0.2s' }}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link href="/shop/fat-rabbit/cart" style={{ display: 'block', width: '100%', padding: '16px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', fontWeight: 400, textAlign: 'center', border: '1px solid #C5442A', color: '#C5442A', textDecoration: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}>
              View Cart{count > 0 ? ` (${count})` : ''}
            </Link>

            <p style={{ fontSize: 11, color: '#aaa', marginTop: 20, letterSpacing: '0.1em', textAlign: 'center' }}>Secure checkout powered by Stripe</p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="fr-related">
            <p className="fr-related-title">More from the shop</p>
            <div className="fr-related-grid">
              {related.map(p => (
                <Link key={p.slug} href={`/shop/fat-rabbit/products/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ aspectRatio: '4/5', background: '#D9D4CA', overflow: 'hidden', marginBottom: 12 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.4, color: '#1a1a1a', flex: 1, marginRight: 8 }}>{p.name}</h3>
                    <span style={{ fontSize: 13, color: '#C5442A', fontWeight: 600, flexShrink: 0 }}>${p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="fr-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/fat-rabbit-logo.png" alt="Fat Rabbit" className="fr-footer-logo" />
        <p className="fr-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
