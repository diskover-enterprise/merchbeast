'use client'

import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products, getProduct } from '../../../../products/products-data'
import { useCart } from '../../../../cart-context'

const NAV = '#1C2E54'
const RED = '#C84020'
const CREAM = '#f5f2ee'

export default function ProductPage({ params }: { params: Promise<{ collection: string; slug: string }> }) {
  const { slug } = use(params)
  const product = getProduct(slug)
  if (!product) notFound()

  const { addToCart, count, setBrandColor } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [colorError, setColorError] = useState(false)

  function handleColorSelect(c: string) {
    setSelectedColor(c)
    if (product!.colors) {
      if (c === 'White') setActiveImg(1)
      if (c === 'Black') setActiveImg(3)
    }
  }

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
    setBrandColor('#1C2E54')
    addToCart(product!, selectedSize, selectedColor)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = products.filter(p => p.slug !== product!.slug).slice(0, 3)

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#fff', color: '#111', minHeight: '100vh', border: '12px solid #D4911E', boxSizing: 'border-box' }}>

      <style>{`
        .llp-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; height: 100px; background: #1C2E54; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .llp-nav-logo { height: 80px; object-fit: contain; display: block; }
        .llp-nav-back { font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.6); text-decoration: none; white-space: nowrap; }
        .llp-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 8px 18px; border: 1px solid rgba(255,255,255,0.4); white-space: nowrap; }
        .llp-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 40px; }
        .llp-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .llp-related { margin-top: 80px; }
        .llp-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px 24px; }
        .llp-footer { margin-top: 80px; padding: 40px; background: #1C2E54; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .llp-footer-logo { height: 56px; object-fit: contain; opacity: 0.85; }
        .llp-footer-copy { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
        @media (max-width: 768px) {
          .llp-nav { padding: 0 16px; height: 68px; }
          .llp-nav-logo { height: 48px; }
          .llp-nav-back { font-size: 10px; letter-spacing: 0.15em; }
          .llp-nav-cart { font-size: 11px; padding: 7px 12px; }
          .llp-wrap { padding: 32px 20px; }
          .llp-layout { grid-template-columns: 1fr; gap: 28px; }
          .llp-related-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .llp-related { margin-top: 48px; }
          .llp-footer { padding: 28px 20px; margin-top: 48px; }
        }
        @media (max-width: 480px) {
          .llp-related-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className="llp-nav">
        <Link href="/shop/lunch-lady" className="llp-nav-back">← Lunch Lady</Link>
        <Link href="/shop/lunch-lady">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lunch-lady-logo.png" alt="Lunch Lady" className="llp-nav-logo" />
        </Link>
        <Link href="/cart" className="llp-nav-cart">
          Cart{count > 0 ? ` (${count})` : ''}
        </Link>
      </nav>

      {/* PRODUCT LAYOUT */}
      <div className="llp-wrap">
        <div className="llp-layout">

          {/* GALLERY */}
          <div>
            <div style={{
              aspectRatio: '4/5',
              background: CREAM,
              overflow: 'hidden',
              marginBottom: 12,
            }}>
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
                      border: i === activeImg ? `2px solid ${NAV}` : '2px solid transparent',
                      background: CREAM, cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
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
              <p style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: RED, marginBottom: 16 }}>
                {product!.tag}
              </p>
            )}
            <h1 style={{ fontSize: 28, fontWeight: 400, lineHeight: 1.3, marginBottom: 16, letterSpacing: '-0.01em' }}>
              {product!.name.replace('Lunch Lady — ', '')}
            </h1>
            <p style={{ fontSize: 22, color: RED, fontWeight: 600, marginBottom: 24 }}>
              {product!.price}
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#555', marginBottom: 32 }}>
              {product!.description}
            </p>

            {/* SIZES */}
            {product!.sizes && (
              <div style={{ marginBottom: 24 }}>
                <p style={{
                  fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: sizeError ? '#e53e3e' : '#888',
                  marginBottom: 12,
                }}>
                  {sizeError ? 'Please select a size' : 'Select Size'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product!.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        width: 52, height: 52,
                        fontSize: 13, fontFamily: 'Georgia, serif',
                        cursor: 'pointer',
                        border: selectedSize === s ? `2px solid ${NAV}` : '2px solid #ddd',
                        background: selectedSize === s ? NAV : '#fff',
                        color: selectedSize === s ? '#fff' : '#111',
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
                <p style={{
                  fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: colorError ? '#e53e3e' : '#888',
                  marginBottom: 12,
                }}>
                  {colorError ? 'Please select a colour' : 'Select Colour'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product!.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => handleColorSelect(c)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 16px',
                        fontSize: 13, fontFamily: 'Georgia, serif',
                        cursor: 'pointer',
                        border: selectedColor === c ? `2px solid ${NAV}` : '2px solid #ddd',
                        background: selectedColor === c ? NAV : '#fff',
                        color: selectedColor === c ? '#fff' : '#111',
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={{
                        width: 12, height: 12, borderRadius: '50%',
                        background: c === 'Black' ? '#111' : '#fff',
                        border: '1px solid #ccc', flexShrink: 0,
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
                fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase',
                fontFamily: 'Georgia, serif',
                background: added ? '#2d7a3a' : NAV,
                color: '#fff', border: 'none', cursor: 'pointer',
                marginBottom: 12,
                transition: 'background 0.2s',
              }}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link href="/cart" style={{
              display: 'block', width: '100%', padding: '16px 32px',
              fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase',
              fontFamily: 'Georgia, serif', textAlign: 'center',
              border: `1px solid ${NAV}`, color: NAV, textDecoration: 'none',
              boxSizing: 'border-box',
            }}>
              View Cart{count > 0 ? ` (${count})` : ''}
            </Link>

            <p style={{ fontSize: 11, color: '#bbb', marginTop: 20, letterSpacing: '0.1em', textAlign: 'center' }}>
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="llp-related">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
              <div style={{ width: 24, height: 2, background: RED }} />
              <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: RED }}>
                More from the Collection
              </p>
            </div>
            <div className="llp-related-grid" style={{ marginTop: 24 }}>
              {related.map(p => (
                <Link key={p.slug} href={p.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ aspectRatio: '4/5', background: CREAM, overflow: 'hidden', marginBottom: 12 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.4 }}>
                      {p.name.replace('Lunch Lady — ', '')}
                    </h3>
                    <span style={{ fontSize: 13, color: RED, fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>
                      {p.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="llp-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lunch-lady-logo.png" alt="Lunch Lady" className="llp-footer-logo" />
        <p className="llp-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
