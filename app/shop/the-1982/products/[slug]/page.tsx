'use client'

import { useState, use, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { the1982Products, getThe1982Product } from '@/app/products/the1982-products-data'
import { useCart } from '@/app/cart-context'

const LOGO = '/1982-logo.png'

export default function The1982ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = getThe1982Product(slug)
  if (!product) notFound()

  useEffect(() => {
    fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ shopSlug: 'the-1982', productSlug: slug }) }).catch(() => {})
  }, [slug])

  const { addToCart, count, setBrandColor, setShopPath } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [colorError, setColorError] = useState(false)

  function handleAddToCart() {
    if (product!.sizes && !selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    if (product!.colors && !selectedColor) {
      setColorError(true)
      setTimeout(() => setColorError(false), 2000)
      return
    }
    setBrandColor('#000000')
    setShopPath('/shop/the-1982')
    addToCart(product! as any, selectedSize, selectedColor)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = the1982Products.filter(p => p.slug !== product!.slug && p.category === product!.category).slice(0, 3)

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#fff', color: '#111', minHeight: '100vh' }}>

      <style>{`
        .n82p-nav { position: sticky; top: 0; z-index: 100; height: 64px; background: #000; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .n82p-nav-logo { height: 200px; object-fit: contain; mix-blend-mode: screen; }
        .n82p-nav-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.5); text-decoration: none; }
        .n82p-nav-back:hover { color: #fff; }
        .n82p-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 9px 20px; border: 1px solid rgba(255,255,255,0.4); white-space: nowrap; }
        .n82p-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 40px; }
        .n82p-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .n82p-related { margin-top: 80px; }
        .n82p-related-head { display: flex; align-items: center; gap: 16px; margin-bottom: 40px; border-bottom: 1px solid #e8e8e8; padding-bottom: 20px; }
        .n82p-related-title { font-size: 11px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: #111; }
        .n82p-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px 24px; }
        .n82p-footer { margin-top: 80px; padding: 48px 40px; background: #000; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .n82p-footer-logo { height: 40px; object-fit: contain; mix-blend-mode: screen; }
        .n82p-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #fff; }
        @media (max-width: 768px) {
          .n82p-nav { padding: 0 16px; height: 56px; }
          .n82p-wrap { padding: 32px 20px; }
          .n82p-layout { grid-template-columns: 1fr; gap: 28px; }
          .n82p-related-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .n82p-related { margin-top: 48px; }
          .n82p-footer { padding: 28px 20px; margin-top: 48px; }
        }
        @media (max-width: 480px) {
          .n82p-related-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className="n82p-nav">
        <Link href="/" className="n82p-nav-back">← Shop</Link>
        <Link href="/cart" className="n82p-nav-cart">
          Cart{count > 0 ? ` (${count})` : ''}
        </Link>
      </nav>

      <div className="n82p-wrap">
        <div className="n82p-layout">

          {/* GALLERY */}
          <div>
            <div style={{ aspectRatio: '4/5', background: '#f5f5f5', overflow: 'hidden', marginBottom: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product!.images[activeImg]}
                alt={product!.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {product!.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {product!.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      width: 72, height: 72, padding: 0,
                      border: i === activeImg ? '2px solid #000' : '2px solid transparent',
                      background: '#f5f5f5', cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div style={{ paddingTop: 16 }}>
            {product!.tag && (
              <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#999', marginBottom: 16, fontWeight: 700 }}>
                {product!.tag}
              </p>
            )}
            <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              {product!.name}
            </h1>
            <p style={{ fontSize: 22, color: '#111', fontWeight: 700, marginBottom: 24 }}>
              {product!.price}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#666', marginBottom: 32 }}>
              {product!.description}
            </p>

            {/* SIZES */}
            {product!.sizes && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, color: sizeError ? '#e53e3e' : '#111', marginBottom: 12 }}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product!.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        width: 52, height: 52, fontSize: 12, fontWeight: 700,
                        fontFamily: "'Helvetica Neue', sans-serif",
                        cursor: 'pointer',
                        border: selectedSize === s ? '2px solid #000' : '2px solid #ddd',
                        background: selectedSize === s ? '#000' : '#fff',
                        color: selectedSize === s ? '#fff' : '#111',
                        letterSpacing: '0.05em',
                        transition: 'all 0.15s',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* COLOURS */}
            {product!.colors && (
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, color: colorError ? '#e53e3e' : '#111', marginBottom: 12 }}>
                  {colorError ? 'Please select a colour' : 'Colour'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product!.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 16px', fontSize: 12, fontWeight: 600,
                        fontFamily: "'Helvetica Neue', sans-serif",
                        cursor: 'pointer',
                        border: selectedColor === c ? '2px solid #000' : '2px solid #ddd',
                        background: selectedColor === c ? '#000' : '#fff',
                        color: selectedColor === c ? '#fff' : '#111',
                        transition: 'all 0.15s',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}
                    >
                      <span style={{
                        width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                        background: c === 'Black' ? '#111' : c === 'Vintage Black' ? '#3a3530' : c === 'Grey' ? '#888' : c === 'Red' ? '#cc1e1e' : '#fff',
                        border: '1px solid #ccc',
                      }} />
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              style={{
                width: '100%', padding: '18px 32px',
                fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
                fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700,
                background: added ? '#2d7a3a' : '#000',
                color: '#fff', border: 'none', cursor: 'pointer',
                marginBottom: 12, transition: 'background 0.2s',
              }}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link href="/cart" style={{
              display: 'block', width: '100%', padding: '16px 32px',
              fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
              fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700,
              textAlign: 'center', border: '2px solid #000', color: '#000',
              textDecoration: 'none', boxSizing: 'border-box',
            }}>
              View Cart{count > 0 ? ` (${count})` : ''}
            </Link>

            <p style={{ fontSize: 11, color: '#bbb', marginTop: 20, letterSpacing: '0.1em', textAlign: 'center' }}>
              Secure checkout powered by Stripe
            </p>

            <div style={{ marginTop: 32, padding: '20px 0', borderTop: '1px solid #e8e8e8' }}>
              <p style={{ fontSize: 11, color: '#999', lineHeight: 1.8, letterSpacing: '0.05em' }}>
                Wash inside out on cold. Hang dry to prevent damage to design. Preshrunk.
              </p>
            </div>
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="n82p-related">
            <div className="n82p-related-head">
              <h2 className="n82p-related-title">More from the Collection</h2>
            </div>
            <div className="n82p-related-grid">
              {related.map(p => (
                <Link key={p.slug} href={p.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ aspectRatio: '4/5', background: '#f5f5f5', overflow: 'hidden', marginBottom: 12 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, flex: 1, marginRight: 8 }}>{p.name}</h3>
                    <span style={{ fontSize: 13, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="n82p-footer">
        <span style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '0.05em' }}>1982</span>
        <p className="n82p-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
