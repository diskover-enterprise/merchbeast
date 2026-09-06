'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/cart-context'

type Product = {
  id: string; slug: string; name: string; price: string; description: string
  images: string[]; sizes: string[]; colors: string[]; tag: string | null; stock: number | null
}

type ColorVariant = { slug: string; label: string; current: boolean }

const SIZE_GUIDE = [
  { size: 'S',   chest: '18"', length: '27"' },
  { size: 'M',   chest: '20"', length: '28"' },
  { size: 'L',   chest: '22"', length: '29"' },
  { size: 'XL',  chest: '24"', length: '30"' },
  { size: '2XL', chest: '26"', length: '31"' },
  { size: '3XL', chest: '28"', length: '32"' },
]

export default function FatRabbitProductClient({
  product,
  related,
  colorVariants = [],
}: {
  product: Product
  related: Product[]
  colorVariants?: ColorVariant[]
}) {
  const router = useRouter()
  const { addToCart, count, setBrandColor, setShopPath } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors[0])
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [policyOpen, setPolicyOpen] = useState(false)

  const outOfStock = product.stock !== null && product.stock === 0

  useEffect(() => {
    setBrandColor('#C5442A')
    setShopPath('/shop/fat-rabbit')
  }, [setBrandColor, setShopPath])

  function handleAddToCart() {
    if (outOfStock) return
    if (product.sizes.length > 1 && !selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2500)
      return
    }
    addToCart(product as any, selectedSize || product.sizes[0], selectedColor || product.colors[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: '#E8E4DC', color: '#1a1a1a', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&display=swap');
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
        .fr-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 20px; justify-items: center; }
        .fr-related-img { width: 100%; aspect-ratio: 4/5; background: #D9D4CA; overflow: hidden; margin-bottom: 12px; position: relative; }
        .fr-accordion { border-top: 1px solid rgba(197,68,42,0.2); margin-top: 24px; }
        .fr-accordion-btn { width: 100%; background: none; border: none; padding: 14px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-family: Georgia, serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #666; }
        .fr-accordion-btn:hover { color: #C5442A; }
        .fr-size-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 8px; margin-bottom: 16px; }
        .fr-size-table th { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #999; font-weight: 400; padding: 6px 8px; text-align: left; border-bottom: 1px solid rgba(197,68,42,0.15); }
        .fr-size-table td { padding: 8px; border-bottom: 1px solid rgba(197,68,42,0.08); font-size: 12px; color: #444; }
        .fr-policy-text { font-size: 13px; line-height: 1.7; color: #666; padding-bottom: 16px; }
        .fr-policy-text strong { color: #1a1a1a; font-weight: 600; font-style: normal; }
        .fr-footer { border-top: 1px solid rgba(197,68,42,0.2); background: #E8E4DC; padding: 28px 40px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-top: 80px; }
        .fr-footer-logo { height: 40px; object-fit: contain; }
        .fr-footer-links { display: flex; gap: 24px; align-items: center; }
        .fr-footer-link { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(197,68,42,0.5); text-decoration: none; transition: color 0.2s; }
        .fr-footer-link:hover { color: #C5442A; }
        .fr-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(197,68,42,0.3); }
        .fr-color-swatch { padding: 6px 14px; font-size: 11px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; border: 2px solid #ccc; background: transparent; color: #1a1a1a; transition: all 0.15s; text-decoration: none; display: inline-block; }
        .fr-color-swatch.active { border-color: #C5442A; background: #C5442A; color: #fff; }
        @media (max-width: 768px) {
          .fr-pnav { padding: 0 16px; height: 60px; }
          .fr-pwrap { padding: 24px 16px 40px; }
          .fr-playout { grid-template-columns: 1fr; gap: 20px; }
          .fr-related-grid { grid-template-columns: repeat(2, 1fr); }
          .fr-footer { padding: 28px 20px; margin-top: 48px; }
        }
        @media (max-width: 480px) { .fr-related-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* NAV */}
      <nav className="fr-pnav">
        <Link href="/shop/fat-rabbit" className="fr-pnav-back">← Shop</Link>
        <Link href="/shop/fat-rabbit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://res.cloudinary.com/dwjvblzu9/image/upload/v1783059789/scrol-to-top_uitiui.png" alt="Fat Rabbit" className="fr-pnav-logo" />
        </Link>
        <Link href="/shop/fat-rabbit/cart" className="fr-pnav-cart">Cart{count > 0 ? ` (${count})` : ''}</Link>
      </nav>

      <div className="fr-pwrap">
        <div className="fr-playout">
          {/* IMAGES */}
          <div>
            <div style={{ marginBottom: 12, position: 'relative', width: '100%', aspectRatio: '1/1', background: '#D9D4CA' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, padding: 0, border: i === activeImg ? '2px solid #C5442A' : '2px solid transparent', background: '#D9D4CA', cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div style={{ paddingTop: 16 }}>
            <h1 style={{ fontSize: 36, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.2, marginBottom: 16 }}>{product.name}</h1>
            <p style={{ fontSize: 26, color: '#C5442A', fontWeight: 600, marginBottom: 8 }}>${product.price} <span style={{ fontSize: 12, color: '#aaa', fontWeight: 400, letterSpacing: '0.05em' }}>CAD</span></p>
            <p style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>+ $9.95 CAD flat-rate shipping across Canada</p>

            {/* Brand blurb */}
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666', marginBottom: 12, fontStyle: 'italic' }}>{product.description}</p>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: '#888', marginBottom: 32 }}>
              Fat Rabbit merch is designed in-house and made for people who know good food and good style. Printed on quality blanks and shipped directly from St. Catharines — wear it proudly.
            </p>

            {/* Colour variants toggle */}
            {colorVariants.length > 1 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#999', marginBottom: 12 }}>Colour</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {colorVariants.map(v => (
                    <Link key={v.slug} href={`/shop/fat-rabbit/products/${v.slug}`} className={`fr-color-swatch${v.current ? ' active' : ''}`}>
                      {v.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: sizeError ? '#C5442A' : '#999', margin: 0 }}>
                    {sizeError ? '⚠ Please select a size' : 'Size'}
                  </p>
                  {product.sizes.length > 1 && (
                    <button onClick={() => setSizeGuideOpen(v => !v)} style={{ background: 'none', border: 'none', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C5442A', cursor: 'pointer', fontFamily: 'Georgia, serif', padding: 0 }}>
                      Size Guide
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{ width: 52, height: 52, fontSize: 12, fontFamily: 'Georgia, serif', cursor: 'pointer', border: selectedSize === s ? '2px solid #C5442A' : '2px solid #ccc', background: selectedSize === s ? '#C5442A' : 'transparent', color: selectedSize === s ? '#fff' : '#1a1a1a', transition: 'all 0.15s' }}>
                      {s}
                    </button>
                  ))}
                </div>
                {sizeGuideOpen && (
                  <table className="fr-size-table">
                    <thead>
                      <tr>
                        <th>Size</th><th>Chest Width</th><th>Body Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_GUIDE.map(row => (
                        <tr key={row.size}>
                          <td>{row.size}</td><td>{row.chest}</td><td>{row.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              style={{ width: '100%', padding: '18px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', fontWeight: 400, background: outOfStock ? '#ccc' : added ? '#2d7a3a' : '#C5442A', color: '#fff', border: 'none', cursor: outOfStock ? 'not-allowed' : 'pointer', marginBottom: 12, transition: 'background 0.2s' }}
            >
              {outOfStock ? 'Out of Stock' : added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link href="/shop/fat-rabbit/cart" style={{ display: 'block', width: '100%', padding: '16px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', fontWeight: 400, textAlign: 'center', border: '1px solid #C5442A', color: '#C5442A', textDecoration: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}>
              View Cart{count > 0 ? ` (${count})` : ''}
            </Link>

            <p style={{ fontSize: 11, color: '#aaa', marginTop: 16, letterSpacing: '0.1em', textAlign: 'center' }}>Secure checkout powered by Stripe</p>

            {/* Shipping & Returns accordion */}
            <div className="fr-accordion">
              <button className="fr-accordion-btn" onClick={() => setPolicyOpen(v => !v)}>
                <span>Shipping &amp; Returns</span>
                <span>{policyOpen ? '−' : '+'}</span>
              </button>
              {policyOpen && (
                <div className="fr-policy-text">
                  <p><strong>Shipping</strong><br />
                  $9.95 CAD flat rate within Canada. Orders ship within 2–5 business days. Allow 5–10 business days for delivery.</p>
                  <p style={{ marginTop: 12 }}><strong>Returns</strong><br />
                  We accept returns within 14 days of delivery for unused items in original condition. Sale items are final sale. To initiate a return, email <a href="mailto:bee@fat-rabbit.ca" style={{ color: '#C5442A' }}>bee@fat-rabbit.ca</a>.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="fr-related">
            <p className="fr-related-title">More from the shop</p>
            <div className="fr-related-grid">
              {related.map(p => (
                <Link key={p.slug} href={`/shop/fat-rabbit/products/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <div className="fr-related-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
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

      {/* FOOTER */}
      <footer className="fr-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://res.cloudinary.com/dwjvblzu9/image/upload/v1783059789/scrol-to-top_uitiui.png" alt="Fat Rabbit" className="fr-footer-logo" />
        <div className="fr-footer-links">
          <Link href="/shop/fat-rabbit/return-policy" className="fr-footer-link">Return Policy</Link>
          <a href="mailto:bee@fat-rabbit.ca" className="fr-footer-link">Contact Us</a>
        </div>
        <span className="fr-footer-copy">Powered by Merch Beast</span>
      </footer>
    </div>
  )
}
