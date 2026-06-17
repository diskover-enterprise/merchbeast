'use client'

import Link from 'next/link'
import { useState } from 'react'
import { islandProducts, type IslandProduct } from '@/app/products/island-apparel-products-data'
import { useCart } from '@/app/cart-context'

export function IslandApparelStorefront() {
  const { count } = useCart()
  const tees = islandProducts.filter(p => p.category === 'Tee')
  const hats = islandProducts.filter(p => p.category === 'Hat')

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#f9f6f0', color: '#1a1a2e', overflowX: 'hidden' }}>

      <style>{`
        /* NAV */
        .ia-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 64px; background: rgba(0,58,92,0.97); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .ia-nav-brand { font-size: 15px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; text-decoration: none; }
        .ia-nav-brand span { color: #F4A261; }
        .ia-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 9px 20px; border: 1px solid rgba(255,255,255,0.35); white-space: nowrap; transition: border-color 0.2s, color 0.2s; }
        .ia-nav-cart:hover { border-color: #F4A261; color: #F4A261; }

        /* HERO */
        .ia-hero { padding-top: 64px; position: relative; background: #003A5C; min-height: 520px; display: flex; align-items: flex-end; overflow: hidden; }
        .ia-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.45; }
        .ia-hero-content { position: relative; z-index: 2; padding: 60px 40px 64px; max-width: 700px; }
        .ia-hero-tag { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: #F4A261; font-weight: 700; margin-bottom: 20px; }
        .ia-hero-title { font-size: clamp(40px, 7vw, 80px); font-weight: 900; color: #fff; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; margin-bottom: 20px; }
        .ia-hero-title span { color: #F4A261; }
        .ia-hero-sub { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.6; max-width: 420px; }

        /* WAVE DIVIDER */
        .ia-wave { background: #003A5C; line-height: 0; }
        .ia-wave svg { display: block; width: 100%; }

        /* SECTION */
        .ia-section { padding: 72px 40px; }
        .ia-section.dark { background: #003A5C; }
        .ia-section-head { display: flex; align-items: flex-end; justify-content: space-between; max-width: 1200px; margin: 0 auto 48px; padding-bottom: 20px; border-bottom: 2px solid rgba(0,58,92,0.12); }
        .ia-section.dark .ia-section-head { border-bottom-color: rgba(255,255,255,0.1); }
        .ia-section-title { font-size: 26px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; color: #003A5C; }
        .ia-section.dark .ia-section-title { color: #fff; }
        .ia-section-count { font-size: 11px; color: #F4A261; font-weight: 700; letter-spacing: 0.1em; }

        /* GRID */
        .ia-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px 20px; max-width: 1200px; margin: 0 auto; }

        /* FOOTER */
        .ia-footer { background: #001f33; padding: 48px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .ia-footer-brand { font-size: 14px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; }
        .ia-footer-brand span { color: #F4A261; }
        .ia-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }

        @media (max-width: 1024px) {
          .ia-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .ia-nav { padding: 0 20px; height: 56px; }
          .ia-hero { min-height: 400px; }
          .ia-hero-content { padding: 40px 20px 48px; }
          .ia-section { padding: 48px 20px; }
          .ia-section-title { font-size: 18px; }
          .ia-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; }
          .ia-footer { padding: 32px 20px; }
        }
        @media (max-width: 480px) {
          .ia-grid { gap: 16px 10px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="ia-nav">
        <span className="ia-nav-brand">Island<span> Apparel</span></span>
        <Link href="/cart" className="ia-nav-cart">
          Cart{count > 0 ? ` (${count})` : ''}
        </Link>
      </nav>

      {/* HERO */}
      <section className="ia-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=80"
          alt="Caribbean"
          className="ia-hero-img"
        />
        <div className="ia-hero-content">
          <p className="ia-hero-tag">Island Apparel</p>
          <h1 className="ia-hero-title">Born<br />from the<br /><span>Island.</span></h1>
          <p className="ia-hero-sub">Apparel inspired by the Caribbean — the water, the sun, the culture. Wear it like you live there.</p>
        </div>
      </section>

      {/* WAVE */}
      <div className="ia-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" height="60">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f9f6f0" />
        </svg>
      </div>

      {/* TEES */}
      <section className="ia-section">
        <div className="ia-section-head">
          <h2 className="ia-section-title">Tees</h2>
          <span className="ia-section-count">{tees.length} styles</span>
        </div>
        <div className="ia-grid">
          {tees.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* HATS */}
      <section className="ia-section">
        <div className="ia-section-head">
          <h2 className="ia-section-title">Hats</h2>
          <span className="ia-section-count">{hats.length} styles</span>
        </div>
        <div className="ia-grid">
          {hats.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ia-footer">
        <span className="ia-footer-brand">Island<span> Apparel</span></span>
        <p className="ia-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}

function ProductCard({ product, dark }: { product: IslandProduct; dark?: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={product.path}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '4/5', background: dark ? '#012a40' : '#ede8df', overflow: 'hidden', marginBottom: 12, position: 'relative', borderRadius: 4 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />
        {product.tag && (
          <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', background: '#F4A261', color: '#fff', padding: '3px 8px', fontWeight: 700, borderRadius: 2 }}>
            {product.tag}
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,58,92,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', borderRadius: 4 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff', border: '1px solid rgba(255,255,255,0.7)', padding: '10px 18px', fontWeight: 600 }}>View Product</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: dark ? '#fff' : '#1a1a2e', flex: 1, marginRight: 8 }}>
          {product.name}
        </h3>
        <span style={{ fontSize: 13, color: '#F4A261', fontWeight: 700, flexShrink: 0 }}>
          {product.price}
        </span>
      </div>
      {product.colors && (
        <p style={{ fontSize: 10, color: dark ? 'rgba(255,255,255,0.3)' : '#aaa', letterSpacing: '0.05em', marginTop: 3 }}>
          {product.colors.join(' · ')}
        </p>
      )}
    </Link>
  )
}
