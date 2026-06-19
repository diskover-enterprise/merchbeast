'use client'

import Link from 'next/link'
import { useState } from 'react'
import { nomoProducts, type NomoProduct } from '@/app/products/nomo-nomo-products-data'
import { useCart } from '@/app/cart-context'

export function NomoNomoStorefront({ heroImage }: { heroImage?: string | null }) {
  const { count } = useCart()
  const tees = nomoProducts.filter(p => p.category === 'Tee')
  const hats = nomoProducts.filter(p => p.category === 'Hat')

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#0d0d0d', color: '#fff', minHeight: '100vh' }}>

      <style>{`
        /* NAV */
        .nn-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 64px; background: rgba(13,13,13,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .nn-nav-logo { height: 40px; object-fit: contain; }
        .nn-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 9px 20px; border: 1px solid rgba(255,255,255,0.25); white-space: nowrap; transition: border-color 0.2s, color 0.2s; }
        .nn-nav-cart:hover { border-color: #C41E1E; color: #C41E1E; }

        /* HERO */
        .nn-hero { padding-top: 64px; min-height: 560px; background: #0d0d0d; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding-left: 24px; padding-right: 24px; position: relative; overflow: hidden; }
        .nn-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(196,30,30,0.12) 0%, transparent 70%); pointer-events: none; }
        .nn-hero-logo { height: 220px; object-fit: contain; margin-bottom: 32px; filter: drop-shadow(0 0 40px rgba(196,30,30,0.4)); }
        .nn-hero-tag { font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 16px; }
        .nn-hero-sub { font-size: 13px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.4); }

        /* SECTION */
        .nn-section { padding: 80px 40px; }
        .nn-section-head { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto 48px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .nn-section-title { font-size: 28px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; color: #fff; }
        .nn-section-count { font-size: 11px; color: rgba(255,255,255,0.3); }

        /* GRID */
        .nn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 20px; max-width: 1200px; margin: 0 auto; }

        /* DIVIDER */
        .nn-divider { max-width: 1200px; margin: 0 auto; padding: 40px 0; display: flex; align-items: center; gap: 20px; }
        .nn-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
        .nn-divider-text { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: #C41E1E; }

        /* FOOTER */
        .nn-footer { background: #000; border-top: 1px solid rgba(255,255,255,0.06); padding: 48px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .nn-footer-brand { font-size: 18px; font-weight: 900; color: #C41E1E; letter-spacing: 0.05em; }
        .nn-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }

        /* TABLET */
        @media (max-width: 900px) {
          .nn-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 16px; }
        }
        @media (max-width: 640px) {
          .nn-nav { padding: 0 20px; height: 56px; }
          .nn-hero { min-height: 420px; }
          .nn-hero-logo { height: 160px; }
          .nn-section { padding: 48px 20px; }
          .nn-grid { grid-template-columns: repeat(2, 1fr); gap: 20px 12px; }
          .nn-footer { padding: 32px 20px; }
          .nn-section-title { font-size: 20px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nn-nav">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nomo-nomo-logo.png" alt="Nomo Nomo" className="nn-nav-logo" />
        <Link href="/shop/nomo-nomo/cart" className="nn-nav-cart">
          Cart{count > 0 ? ` (${count})` : ''}
        </Link>
      </nav>

      {/* HERO */}
      <section className="nn-hero" style={heroImage ? { backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
        <p className="nn-hero-tag">Vancouver, BC</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nomo-nomo-logo.png" alt="Nomo Nomo" className="nn-hero-logo" />
        <p className="nn-hero-sub">1268 Commercial Dr &nbsp;·&nbsp; The Merch</p>
      </section>

      {/* TEES */}
      <section className="nn-section">
        <div className="nn-section-head">
          <h2 className="nn-section-title">Tees</h2>
          <span className="nn-section-count">{tees.length} styles</span>
        </div>
        <div className="nn-grid">
          {tees.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <div style={{ padding: '0 40px' }}>
        <div className="nn-divider">
          <div className="nn-divider-line" />
          <span className="nn-divider-text">のものも</span>
          <div className="nn-divider-line" />
        </div>
      </div>

      {/* HATS */}
      <section className="nn-section">
        <div className="nn-section-head">
          <h2 className="nn-section-title">Hats</h2>
          <span className="nn-section-count">{hats.length} styles</span>
        </div>
        <div className="nn-grid">
          {hats.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="nn-footer">
        <span className="nn-footer-brand">NOMO NOMO</span>
        <p className="nn-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}

function ProductCard({ product }: { product: NomoProduct }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={product.path}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '4/5', background: '#1a1a1a', overflow: 'hidden', marginBottom: 12, position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff', border: '1px solid rgba(255,255,255,0.7)', padding: '10px 18px', fontWeight: 600 }}>View Product</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: '#fff', flex: 1, marginRight: 8 }}>
          {product.name}
        </h3>
        <span style={{ fontSize: 13, color: '#C41E1E', fontWeight: 700, flexShrink: 0 }}>
          {product.price}
        </span>
      </div>
      {product.colors && (
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em', marginTop: 3 }}>
          {product.colors.join(' · ')}
        </p>
      )}
    </Link>
  )
}
