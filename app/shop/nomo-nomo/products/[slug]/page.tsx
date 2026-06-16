'use client'

import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { nomoProducts, getNomoProduct } from '@/app/products/nomo-nomo-products-data'
import { useCart } from '@/app/cart-context'

export default function NomoProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = getNomoProduct(slug)
  if (!product) notFound()

  const { addToCart, count, setBrandColor, setShopPath } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  function handleAddToCart() {
    if (product!.sizes && product!.sizes.length > 1 && !selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    setBrandColor('#C41E1E')
    setShopPath('/shop/nomo-nomo')
    addToCart(product! as any, selectedSize || product!.sizes?.[0], selectedColor || product!.colors?.[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = nomoProducts.filter(p => p.slug !== product!.slug && p.category === product!.category).slice(0, 3)

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#0d0d0d', color: '#fff', minHeight: '100vh' }}>

      <style>{`
        .nn-pnav { position: sticky; top: 0; z-index: 100; height: 64px; background: rgba(13,13,13,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .nn-pnav-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
        .nn-pnav-back:hover { color: #fff; }
        .nn-pnav-logo { height: 36px; object-fit: contain; }
        .nn-pnav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 9px 20px; border: 1px solid rgba(255,255,255,0.25); white-space: nowrap; transition: border-color 0.2s, color 0.2s; }
        .nn-pnav-cart:hover { border-color: #C41E1E; color: #C41E1E; }
        .nn-pwrap { max-width: 1200px; margin: 0 auto; padding: 60px 40px; }
        .nn-playout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .nn-related { margin-top: 80px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.08); }
        .nn-related-title { font-size: 11px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 40px; }
        .nn-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 20px; }
        .nn-footer { background: #000; border-top: 1px solid rgba(255,255,255,0.06); padding: 48px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 80px; }
        .nn-footer-brand { font-size: 18px; font-weight: 900; color: #C41E1E; }
        .nn-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          .nn-pnav { padding: 0 16px; height: 56px; }
          .nn-pwrap { padding: 32px 20px; }
          .nn-playout { grid-template-columns: 1fr; gap: 28px; }
          .nn-related-grid { grid-template-columns: repeat(2, 1fr); }
          .nn-footer { padding: 28px 20px; margin-top: 48px; }
        }
        @media (max-width: 480px) {
          .nn-related-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nn-pnav">
        <Link href="/shop/nomo-nomo" className="nn-pnav-back">← Shop</Link>
        <Link href="/shop/nomo-nomo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nomo-nomo-logo.png" alt="Nomo Nomo" className="nn-pnav-logo" />
        </Link>
        <Link href="/cart" className="nn-pnav-cart">
          Cart{count > 0 ? ` (${count})` : ''}
        </Link>
      </nav>

      <div className="nn-pwrap">
        <div className="nn-playout">

          {/* GALLERY */}
          <div>
            <div style={{ aspectRatio: '4/5', background: '#1a1a1a', overflow: 'hidden', marginBottom: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product!.images[activeImg]} alt={product!.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {product!.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {product!.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, padding: 0, border: i === activeImg ? '2px solid #C41E1E' : '2px solid transparent', background: '#1a1a1a', cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div style={{ paddingTop: 16 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
              {product!.name}
            </h1>
            <p style={{ fontSize: 24, color: '#C41E1E', fontWeight: 700, marginBottom: 24 }}>
              {product!.price}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>
              {product!.description}
            </p>

            {/* SIZES */}
            {product!.sizes && product!.sizes.length > 1 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, color: sizeError ? '#C41E1E' : 'rgba(255,255,255,0.4)', marginBottom: 12 }}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product!.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{ width: 52, height: 52, fontSize: 12, fontWeight: 700, fontFamily: "'Helvetica Neue', sans-serif", cursor: 'pointer', border: selectedSize === s ? '2px solid #C41E1E' : '2px solid rgba(255,255,255,0.15)', background: selectedSize === s ? '#C41E1E' : 'transparent', color: '#fff', letterSpacing: '0.05em', transition: 'all 0.15s' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ADD TO CART */}
            <button onClick={handleAddToCart} style={{ width: '100%', padding: '18px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, background: added ? '#2d7a3a' : '#C41E1E', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: 12, transition: 'background 0.2s' }}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link href="/cart" style={{ display: 'block', width: '100%', padding: '16px 32px', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', textDecoration: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}>
              View Cart{count > 0 ? ` (${count})` : ''}
            </Link>

            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 20, letterSpacing: '0.1em', textAlign: 'center' }}>
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="nn-related">
            <p className="nn-related-title">More from the shop</p>
            <div className="nn-related-grid">
              {related.map(p => (
                <Link key={p.slug} href={p.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ aspectRatio: '4/5', background: '#1a1a1a', overflow: 'hidden', marginBottom: 12 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: '#fff', flex: 1, marginRight: 8 }}>{p.name}</h3>
                    <span style={{ fontSize: 13, color: '#C41E1E', fontWeight: 700, flexShrink: 0 }}>{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="nn-footer">
        <span className="nn-footer-brand">NOMO NOMO</span>
        <p className="nn-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}
