'use client'

import Link from 'next/link'
import { useState } from 'react'
import { the1982Products, type The1982Product } from '@/app/products/the1982-products-data'
import { useCart } from '@/app/cart-context'

const LOGO = '/1982-logo.avif'

export function The1982Storefront() {
  const { count } = useCart()
  const tees = the1982Products.filter(p => p.category === 'Tee')
  const crewnecks = the1982Products.filter(p => p.category === 'Crewneck')

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#fff', color: '#111', minHeight: '100vh' }}>

      <style>{`
        /* NAV */
        .n82-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 72px; background: #000; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .n82-nav-logo { height: 44px; object-fit: contain; }
        .n82-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 9px 20px; border: 1px solid rgba(255,255,255,0.4); white-space: nowrap; transition: border-color 0.2s; }
        .n82-nav-cart:hover { border-color: #fff; }

        /* HERO */
        .n82-hero { padding-top: 72px; background: #000; display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; padding-bottom: 80px; padding-left: 24px; padding-right: 24px; min-height: 420px; }
        .n82-hero-tag { font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 24px; }
        .n82-hero-title { font-size: clamp(48px, 8vw, 96px); font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1; margin-bottom: 16px; text-transform: uppercase; }
        .n82-hero-sub { font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.5); }

        /* SECTION */
        .n82-section { padding: 80px 40px; }
        .n82-section-head { display: flex; align-items: flex-end; justify-content: space-between; max-width: 1200px; margin: 0 auto 48px; border-bottom: 1px solid #e8e8e8; padding-bottom: 20px; }
        .n82-section-title { font-size: 11px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: #111; }
        .n82-section-count { font-size: 11px; color: #999; }
        .n82-section.dark { background: #0a0a0a; }
        .n82-section.dark .n82-section-head { border-bottom-color: rgba(255,255,255,0.1); }
        .n82-section.dark .n82-section-title { color: #fff; }
        .n82-section.dark .n82-section-count { color: rgba(255,255,255,0.3); }

        /* GRID */
        .n82-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px 20px; max-width: 1200px; margin: 0 auto; }

        /* FOOTER */
        .n82-footer { background: #000; padding: 48px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .n82-footer-logo { height: 40px; object-fit: contain; opacity: 0.7; }
        .n82-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }

        /* TABLET */
        @media (max-width: 1024px) {
          .n82-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .n82-nav { padding: 0 20px; height: 60px; }
          .n82-nav-logo { height: 36px; }
          .n82-hero { min-height: 300px; }
          .n82-section { padding: 48px 20px; }
          .n82-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; }
          .n82-footer { padding: 32px 20px; }
        }
        @media (max-width: 480px) {
          .n82-grid { grid-template-columns: repeat(2, 1fr); gap: 16px 10px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="n82-nav">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="nineteen82" className="n82-nav-logo" />
        <Link href="/cart" className="n82-nav-cart">
          Cart{count > 0 ? ` (${count})` : ''}
        </Link>
      </nav>

      {/* HERO */}
      <section className="n82-hero">
        <p className="n82-hero-tag">Vintage by Design</p>
        <h1 className="n82-hero-title">nineteen82</h1>
        <p className="n82-hero-sub">Legendary moments. Worn forever.</p>
      </section>

      {/* TEES */}
      <section className="n82-section">
        <div className="n82-section-head">
          <h2 className="n82-section-title">Signature Tees</h2>
          <span className="n82-section-count">{tees.length} styles</span>
        </div>
        <div className="n82-grid">
          {tees.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* CREWNECKS */}
      <section className="n82-section dark">
        <div className="n82-section-head">
          <h2 className="n82-section-title">Crewnecks</h2>
          <span className="n82-section-count">{crewnecks.length} styles</span>
        </div>
        <div className="n82-grid">
          {crewnecks.map(p => <ProductCard key={p.slug} product={p} dark />)}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="n82-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="nineteen82" className="n82-footer-logo" />
        <p className="n82-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}

function ProductCard({ product, dark }: { product: The1982Product; dark?: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={product.path}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '4/5', background: dark ? '#1a1a1a' : '#f5f5f5', overflow: 'hidden', marginBottom: 12, position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {product.tag && (
          <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', background: '#fff', color: '#000', padding: '3px 8px', fontWeight: 700 }}>
            {product.tag}
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff', border: '1px solid rgba(255,255,255,0.8)', padding: '10px 18px', fontWeight: 600 }}>View Product</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: dark ? '#fff' : '#111', flex: 1, marginRight: 8 }}>
          {product.name}
        </h3>
        <span style={{ fontSize: 13, color: dark ? 'rgba(255,255,255,0.6)' : '#555', fontWeight: 600, flexShrink: 0 }}>
          {product.price.replace(' CAD', '')}
        </span>
      </div>
      {product.colors && (
        <p style={{ fontSize: 10, color: dark ? 'rgba(255,255,255,0.3)' : '#999', letterSpacing: '0.05em', marginTop: 3 }}>
          {product.colors.join(' · ')}
        </p>
      )}
    </Link>
  )
}
