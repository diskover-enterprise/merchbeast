'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'

type Product = {
  id: string; slug: string; name: string; price: string; description: string
  images: string[]; sizes: string[]; colors: string[]; tag: string | null
}

export default function BarBravoProductClient({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart, count, setBrandColor, setShopPath } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    setBrandColor('#2d6b65')
    setShopPath('/shop/bar-bravo')
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
    <div style={{ fontFamily: "'Cinzel', 'Trajan Pro', serif", background: '#0d1117', color: '#f0ead6', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');
        .bb-pnav { position: sticky; top: 0; z-index: 100; height: 68px; background: #f0ead6; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; border-bottom: 1px solid rgba(0,0,0,0.1); }
        .bb-pnav-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #2d6b65; text-decoration: none; font-family: Georgia, serif; font-weight: 700; transition: opacity 0.2s; }
        .bb-pnav-back:hover { opacity: 0.7; }
        .bb-pnav-logo { height: 44px; object-fit: contain; }
        .bb-pnav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 10px 22px; border: 1.5px solid #2d6b65; color: #2d6b65; font-family: Georgia, serif; font-weight: 700; transition: background 0.2s, color 0.2s; }
        .bb-pnav-cart:hover { background: #2d6b65; color: #f0ead6; }
        .bb-pwrap { max-width: 1200px; margin: 0 auto; padding: 60px 48px; }
        .bb-playout { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
        .bb-related { margin-top: 80px; padding-top: 40px; border-top: 1px solid rgba(240,234,214,0.08); }
        .bb-related-title { font-size: 11px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(240,234,214,0.35); margin-bottom: 40px; font-family: Georgia, serif; }
        .bb-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 20px; }
        .bb-footer { background: #060a0f; border-top: 1px solid rgba(240,234,214,0.06); padding: 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 80px; }
        .bb-footer-brand { font-size: 20px; font-weight: 900; color: #2d6b65; font-family: 'Cinzel', 'Trajan Pro', serif; }
        .bb-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(240,234,214,0.2); font-family: Georgia, serif; }
        @media (max-width: 768px) {
          .bb-pnav { padding: 0 20px; height: 58px; }
          .bb-pnav-logo { height: 36px; }
          .bb-pwrap { padding: 32px 20px; }
          .bb-playout { grid-template-columns: 1fr; gap: 28px; }
          .bb-related-grid { grid-template-columns: repeat(2, 1fr); }
          .bb-footer { padding: 28px 20px; margin-top: 48px; }
        }
        @media (max-width: 480px) { .bb-related-grid { grid-template-columns: 1fr; } }
      `}</style>

      <nav className="bb-pnav">
        <Link href="/shop/bar-bravo" className="bb-pnav-back">← Shop</Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bar-bravo-logo.png" alt="Bar Bravo" className="bb-pnav-logo" />
        <Link href="/shop/bar-bravo/cart" className="bb-pnav-cart">Cart{count > 0 ? ` (${count})` : ''}</Link>
      </nav>

      <div className="bb-pwrap">
        <div className="bb-playout">
          <div>
            <div style={{ marginBottom: 12, background: '#162030', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[activeImg]} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, padding: 0, border: i === activeImg ? '2px solid #2d6b65' : '2px solid transparent', background: '#162030', cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ paddingTop: 16 }}>
            <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#2d6b65', marginBottom: 12, fontFamily: 'Georgia, serif' }}>
              {product.tag || 'Apparel'}
            </p>
            <h1 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.01em', color: '#f0ead6' }}>{product.name}</h1>
            <p style={{ fontSize: 26, color: '#2d6b65', fontWeight: 700, marginBottom: 24 }}>${product.price}</p>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(240,234,214,0.55)', marginBottom: 32, fontFamily: 'Georgia, serif' }}>{product.description}</p>

            {product.sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, color: sizeError ? '#c0392b' : 'rgba(240,234,214,0.4)', marginBottom: 12, fontFamily: 'Georgia, serif' }}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{ minWidth: 52, height: 52, padding: '0 12px', fontSize: 12, fontWeight: 700, fontFamily: 'Georgia, serif', cursor: 'pointer', border: selectedSize === s ? '2px solid #2d6b65' : '2px solid rgba(240,234,214,0.15)', background: selectedSize === s ? '#2d6b65' : 'transparent', color: '#f0ead6', letterSpacing: '0.05em', transition: 'all 0.15s' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors.length > 1 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(240,234,214,0.4)', marginBottom: 12, fontFamily: 'Georgia, serif' }}>Colour</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.colors.map(c => (
                    <button key={c} onClick={() => setSelectedColor(c)} style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, fontFamily: 'Georgia, serif', cursor: 'pointer', border: selectedColor === c ? '2px solid #2d6b65' : '2px solid rgba(240,234,214,0.15)', background: selectedColor === c ? '#2d6b65' : 'transparent', color: '#f0ead6', transition: 'all 0.15s' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleAddToCart} style={{ width: '100%', padding: '18px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', fontWeight: 700, background: added ? '#1d4d49' : '#2d6b65', color: '#f0ead6', border: 'none', cursor: 'pointer', marginBottom: 12, transition: 'background 0.2s' }}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link href="/shop/bar-bravo/cart" style={{ display: 'block', width: '100%', padding: '16px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', fontWeight: 700, textAlign: 'center', border: '1.5px solid rgba(240,234,214,0.2)', color: '#f0ead6', textDecoration: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}>
              View Cart{count > 0 ? ` (${count})` : ''}
            </Link>

            <p style={{ fontSize: 11, color: 'rgba(240,234,214,0.25)', marginTop: 20, letterSpacing: '0.1em', textAlign: 'center', fontFamily: 'Georgia, serif' }}>Secure checkout powered by Stripe</p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="bb-related">
            <p className="bb-related-title">More from the shop</p>
            <div className="bb-related-grid">
              {related.map(p => (
                <Link key={p.slug} href={`/shop/bar-bravo/products/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ background: '#162030', overflow: 'hidden', marginBottom: 12 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.4, color: '#f0ead6', flex: 1, marginRight: 8, fontFamily: "'Cinzel', 'Trajan Pro', serif" }}>{p.name}</h3>
                    <span style={{ fontSize: 13, color: '#2d6b65', fontWeight: 700, flexShrink: 0 }}>${p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bb-footer">
        <span className="bb-footer-brand">Bar Bravo</span>
        <p className="bb-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
