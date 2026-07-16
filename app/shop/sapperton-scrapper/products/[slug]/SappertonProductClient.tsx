'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'

type Product = {
  id: string; slug: string; name: string; price: string; description: string
  images: string[]; sizes: string[]; colors: string[]; tag: string | null
}

export default function SappertonProductClient({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart, count, setBrandColor, setShopPath } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    setBrandColor('#c8102e')
    setShopPath('/shop/sapperton-scrapper')
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
    <div style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", background: '#b8860b', color: '#0a0a0a', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,700;1,900&family=Barlow:wght@400;600&display=swap');
        .ss-pnav { position: sticky; top: 0; z-index: 100; height: 88px; background: #b8860b; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; border-bottom: 2px solid #0a0a0a; }
        .ss-pnav-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #0a0a0a; text-decoration: none; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; transition: opacity 0.2s; }
        .ss-pnav-back:hover { opacity: 0.7; }
        .ss-pnav-logo { height: 60px; object-fit: contain; filter: none; }
        .ss-pnav-cart { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 9px 20px; border: 2px solid #0a0a0a; color: #0a0a0a; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; transition: background 0.15s, color 0.15s; }
        .ss-pnav-cart:hover { background: #0a0a0a; color: #b8860b; }
        .ss-pwrap { max-width: 1200px; margin: 0 auto; padding: 60px 48px; }
        .ss-playout { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
        .ss-related { margin-top: 80px; padding-top: 40px; border-top: 2px solid #0a0a0a; }
        .ss-related-title { font-size: 32px; font-weight: 900; font-style: italic; text-transform: uppercase; color: #0a0a0a; margin-bottom: 32px; letter-spacing: -0.01em; }
        .ss-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 20px; }
        .ss-footer { background: #050505; border-top: 4px solid #0a0a0a; padding: 40px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 80px; }
        .ss-footer-brand { font-size: 20px; font-weight: 900; font-style: italic; color: #b8860b; text-transform: uppercase; }
        .ss-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(200,162,39,0.4); font-family: 'Barlow', sans-serif; }
        @media (max-width: 768px) {
          .ss-pnav { padding: 0 20px; height: 72px; }
          .ss-pnav-logo { height: 36px; }
          .ss-pwrap { padding: 32px 20px; }
          .ss-playout { grid-template-columns: 1fr; gap: 28px; }
          .ss-related-grid { grid-template-columns: repeat(2, 1fr); }
          .ss-footer { padding: 24px 20px; margin-top: 48px; }
        }
        @media (max-width: 480px) { .ss-related-grid { grid-template-columns: 1fr; } }
      `}</style>

      <nav className="ss-pnav">
        <Link href="/shop/sapperton-scrapper" className="ss-pnav-back">← Shop</Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sapperton-logo.png" alt="Sapperton Scrapper" className="ss-pnav-logo" />
        <Link href="/shop/sapperton-scrapper/cart" className="ss-pnav-cart">Cart{count > 0 ? ` (${count})` : ''}</Link>
      </nav>

      <div className="ss-pwrap">
        <div className="ss-playout">
          <div>
            <div style={{ marginBottom: 12, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[activeImg]} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, padding: 0, border: i === activeImg ? '2px solid #0a0a0a' : '2px solid transparent', background: 'transparent', cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ paddingTop: 8 }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#0a0a0a', marginBottom: 10, fontWeight: 600 }}>
              {product.tag || 'Apparel'}
            </p>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 48, fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 16, letterSpacing: '-0.01em', color: '#0a0a0a' }}>{product.name}</h1>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, color: '#0a0a0a', fontWeight: 900, marginBottom: 24 }}>${product.price}</p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, lineHeight: 1.7, color: 'rgba(0,0,0,0.5)', marginBottom: 32 }}>{product.description}</p>

            {product.sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, color: sizeError ? '#0a0a0a' : 'rgba(0,0,0,0.4)', marginBottom: 12 }}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{ minWidth: 52, height: 48, padding: '0 12px', fontSize: 13, fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", cursor: 'pointer', border: selectedSize === s ? '2px solid #c8102e' : '2px solid rgba(245,245,245,0.15)', background: selectedSize === s ? '#0a0a0a' : 'transparent', color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.15s' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors.length > 1 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(0,0,0,0.4)', marginBottom: 12 }}>Colour</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.colors.map(c => (
                    <button key={c} onClick={() => setSelectedColor(c)} style={{ padding: '10px 16px', fontSize: 13, fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", cursor: 'pointer', border: selectedColor === c ? '2px solid #c8102e' : '2px solid rgba(245,245,245,0.15)', background: selectedColor === c ? '#0a0a0a' : 'transparent', color: '#0a0a0a', textTransform: 'uppercase', transition: 'all 0.15s' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleAddToCart} style={{ width: '100%', padding: '18px 32px', fontSize: 14, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, background: added ? '#333' : '#0a0a0a', color: '#b8860b', border: 'none', cursor: 'pointer', marginBottom: 12, transition: 'background 0.2s' }}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link href="/shop/sapperton-scrapper/cart" style={{ display: 'block', width: '100%', padding: '16px 32px', fontSize: 14, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, textAlign: 'center', border: '2px solid rgba(245,245,245,0.2)', color: '#f5f5f5', textDecoration: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}>
              View Cart{count > 0 ? ` (${count})` : ''}
            </Link>

            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: 'rgba(0,0,0,0.35)', marginTop: 20, letterSpacing: '0.1em', textAlign: 'center' }}>Secure checkout powered by Stripe</p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="ss-related">
            <p className="ss-related-title">More from the Shop</p>
            <div className="ss-related-grid">
              {related.map(p => (
                <Link key={p.slug} href={`/shop/sapperton-scrapper/products/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ overflow: 'hidden', marginBottom: 10 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 1.3, color: '#0a0a0a', flex: 1, marginRight: 8 }}>{p.name}</h3>
                    <span style={{ fontSize: 14, color: '#0a0a0a', fontWeight: 700, flexShrink: 0 }}>${p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="ss-footer">
        <span className="ss-footer-brand">Sapperton Scrapper</span>
        <p className="ss-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
