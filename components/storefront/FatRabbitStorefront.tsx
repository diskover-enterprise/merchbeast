'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/app/cart-context'

type Product = { slug: string; name: string; price: string; description: string; images: string[]; sizes: string[]; colors: string[]; tag: string | null }

export function FatRabbitStorefront({ heroImage, dbProducts }: { heroImage?: string | null; dbProducts?: Product[] }) {
  const { setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#C5442A'); setShopPath('/shop/fat-rabbit') }, [setBrandColor, setShopPath])

  const products = dbProducts !== undefined ? dbProducts : []

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: '#E8E4DC', color: '#1a1a1a', minHeight: '100vh' }}>
      <style>{`
        .fr-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 72px; background: rgba(232,228,220,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(197,68,42,0.15); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .fr-nav-logo { height: 52px; object-fit: contain; }
        .fr-nav-brand { font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: #C5442A; font-family: 'Georgia', serif; font-style: italic; }
        .fr-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #1a1a1a; text-decoration: none; padding: 9px 20px; border: 1px solid #C5442A; white-space: nowrap; transition: all 0.2s; font-family: 'Georgia', serif; }
        .fr-nav-cart:hover { background: #C5442A; color: #fff; }

        .fr-hero { padding-top: 72px; background: #E8E4DC; }
        .fr-hero img { width: 100%; height: auto; display: block; }
        .fr-hero-placeholder { padding-top: 72px; min-height: 400px; background: #C5442A; display: flex; align-items: center; justify-content: center; }
        .fr-hero-placeholder img { height: 180px; object-fit: contain; opacity: 0.9; }

        .fr-collection-head { padding: 64px 40px 32px; max-width: 1200px; margin: 0 auto; border-bottom: 2px solid #C5442A; display: flex; align-items: flex-end; justify-content: space-between; }
        .fr-collection-title { font-size: 36px; font-weight: 400; font-style: italic; color: #1a1a1a; }
        .fr-collection-count { font-size: 12px; color: #999; letter-spacing: 0.1em; text-transform: uppercase; }

        .fr-grid-wrap { padding: 48px 40px 80px; max-width: 1200px; margin: 0 auto; }
        .fr-product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px 28px; }

        .fr-empty { text-align: center; padding: 80px 40px; }
        .fr-empty p { font-size: 16px; color: #999; font-style: italic; }

        .fr-band { background: #C5442A; padding: 56px 40px; text-align: center; }
        .fr-band-logo { height: 100px; object-fit: contain; filter: brightness(0) invert(1); opacity: 0.85; margin-bottom: 16px; }
        .fr-band p { font-size: 14px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.7); }

        .fr-footer { padding: 40px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(197,68,42,0.2); flex-wrap: wrap; gap: 16px; background: #E8E4DC; }
        .fr-footer-logo { height: 48px; object-fit: contain; }
        .fr-footer-copy { font-size: 10px; color: #aaa; letter-spacing: 0.15em; text-transform: uppercase; }

        @media (max-width: 900px) { .fr-product-grid { grid-template-columns: repeat(2, 1fr); gap: 32px 20px; } }
        @media (max-width: 640px) {
          .fr-nav { padding: 0 16px; height: 60px; }
          .fr-nav-logo { height: 40px; }
          .fr-collection-head { padding: 40px 20px 24px; }
          .fr-collection-title { font-size: 26px; }
          .fr-grid-wrap { padding: 32px 20px 60px; }
          .fr-product-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; }
          .fr-footer { padding: 28px 20px; }
        }
        @media (max-width: 380px) { .fr-product-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* NAV */}
      <nav className="fr-nav">
        <span className="fr-nav-brand">The Merch</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://res.cloudinary.com/dwjvblzu9/image/upload/v1783059789/scrol-to-top_uitiui.png" alt="Fat Rabbit" className="fr-nav-logo" />
        <Link href="/shop/fat-rabbit/cart" className="fr-nav-cart">Cart</Link>
      </nav>

      {/* HERO */}
      {heroImage ? (
        <section className="fr-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt="Fat Rabbit" />
        </section>
      ) : (
        <section className="fr-hero-placeholder">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://res.cloudinary.com/dwjvblzu9/image/upload/v1783059789/scrol-to-top_uitiui.png" alt="Fat Rabbit" />
        </section>
      )}

      {/* COLLECTION */}
      <div className="fr-collection-head">
        <h2 className="fr-collection-title">The Collection</h2>
        <span className="fr-collection-count">{products.length} pieces</span>
      </div>

      <div className="fr-grid-wrap">
        {products.length === 0 ? (
          <div className="fr-empty"><p>New drops coming soon.</p></div>
        ) : (
          <div className="fr-product-grid">
            {products.map(p => <ProductCard key={p.slug} product={p} />)}
          </div>
        )}
      </div>

      {/* BAND */}
      <section className="fr-band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://res.cloudinary.com/dwjvblzu9/image/upload/v1783059789/scrol-to-top_uitiui.png" alt="Fat Rabbit" className="fr-band-logo" />
        <p>Fat Rabbit · Vancouver, BC</p>
      </section>

      {/* FOOTER */}
      <footer className="fr-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://res.cloudinary.com/dwjvblzu9/image/upload/v1783059789/scrol-to-top_uitiui.png" alt="Fat Rabbit" className="fr-footer-logo" />
        <p className="fr-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={`/shop/fat-rabbit/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ marginBottom: 14, position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block', transition: 'filter 0.3s ease', filter: hovered ? 'grayscale(100%)' : 'none' }} />
        {product.tag && (
          <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', background: '#C5442A', color: '#fff', padding: '3px 8px' }}>{product.tag}</div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: 15, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.4, marginBottom: 3, flex: 1, marginRight: 8, color: '#1a1a1a' }}>{product.name}</h3>
        <span style={{ fontSize: 15, color: '#C5442A', fontWeight: 600, flexShrink: 0 }}>${product.price}</span>
      </div>
      {product.sizes && product.sizes.length > 0 && (
        <p style={{ fontSize: 10, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{product.sizes.filter(s => s !== '2XL').join(' · ')}</p>
      )}
    </Link>
  )
}
