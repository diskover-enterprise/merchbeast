'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { barBravoProducts, type BarBravoProduct } from '@/app/products/bar-bravo-products-data'
import { useCart } from '@/app/cart-context'
import type { ActiveSale } from '@/lib/sale'
import { calcSalePrice } from '@/lib/sale'

type DBProduct = {
  slug: string; name: string; price: string; description: string
  images: string[]; sizes: string[]; colors: string[]; tag: string | null
}

export function BarBravoStorefront({ heroImage, activeSale, dbProducts }: {
  heroImage?: string | null
  activeSale?: ActiveSale
  dbProducts?: DBProduct[]
}) {
  const { count, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#2d6b65'); setShopPath('/shop/bar-bravo') }, [setBrandColor, setShopPath])

  const products: BarBravoProduct[] = dbProducts !== undefined
    ? dbProducts.map(p => ({ ...p, path: `/shop/bar-bravo/products/${p.slug}`, shopifyUrl: '', category: (p.tag || 'Tee') as 'Tee' | 'Hat', tag: (p.tag || 'Tee') as 'Tee' | 'Hat' }))
    : barBravoProducts

  const tees = products.filter(p => p.category === 'Tee')
  const hats = products.filter(p => p.category === 'Hat')

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: '#0d1117', color: '#f0ead6', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');
        .bb-wrap { font-family: 'Cinzel', 'Trajan Pro', serif; }
        .bb-nav { position: sticky; top: 0; z-index: 100; height: 68px; background: #f0ead6; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; border-bottom: 1px solid rgba(0,0,0,0.1); }
        .bb-nav-logo { height: 44px; object-fit: contain; }
        .bb-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #0d1117; text-decoration: none; padding: 10px 22px; border: 1.5px solid #2d6b65; color: #2d6b65; font-family: 'Georgia', serif; font-weight: 700; transition: background 0.2s, color 0.2s; }
        .bb-nav-cart:hover { background: #2d6b65; color: #f0ead6; }
        .bb-hero { width: 100%; background: #162030; position: relative; }
        .bb-hero-img { width: 100%; height: auto; display: block; }
        .bb-hero-placeholder { width: 100%; height: 320px; background: #162030; display: block; }
        .bb-hero-glow { position: absolute; inset: 0; pointer-events: none; mix-blend-mode: screen; }
        .bb-hero-tagline { position: absolute; top: 50%; left: 3.5%; pointer-events: none; }
        .bb-hero-tagline p { font-family: 'Cinzel', 'Trajan Pro', serif; font-size: clamp(14px, 2.2vw, 28px); font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(240,220,160,0.82); line-height: 1.7; text-shadow: 0 1px 6px rgba(0,0,0,0.7); }
        .bb-hero-glow::before {
          content: '';
          position: absolute;
          top: 2%; left: 3%;
          width: 38%; height: 55%;
          background: radial-gradient(ellipse at 40% 45%, rgba(255,185,30,0.45) 0%, rgba(255,140,0,0.18) 45%, transparent 72%);
          animation: neonPulse 2.8s ease-in-out infinite;
        }
        .bb-hero-glow::after {
          content: '';
          position: absolute;
          top: 2%; left: 3%;
          width: 38%; height: 55%;
          background: radial-gradient(ellipse at 40% 45%, rgba(255,220,80,0.3) 0%, transparent 55%);
          animation: neonPulse 2.8s ease-in-out infinite 0.4s;
        }
        @keyframes neonPulse {
          0%, 100% { opacity: 1; }
          30% { opacity: 0.6; }
          35% { opacity: 1; }
          60% { opacity: 0.75; }
          65% { opacity: 1; }
        }
        .bb-section { padding: 72px 48px 56px; max-width: 1280px; margin: 0 auto; }
        .bb-section-head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 40px; padding-bottom: 16px; border-bottom: 1px solid rgba(240,234,214,0.12); }
        .bb-section-title { font-size: 28px; font-weight: 700; color: #f0ead6; font-family: 'Cinzel', 'Trajan Pro', serif; letter-spacing: -0.01em; }
        .bb-section-count { font-size: 11px; color: rgba(240,234,214,0.35); letter-spacing: 0.2em; text-transform: uppercase; font-family: Georgia, serif; }
        .bb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 36px 24px; }
        .bb-divider { padding: 0; max-width: 100%; margin: 0 0 16px; }
        .bb-divider-inner { display: flex; align-items: center; gap: 20px; background: #2d6b65; padding: 14px 48px; }
        .bb-divider-line { flex: 1; height: 1px; background: rgba(240,234,214,0.25); }
        .bb-divider-anchor { font-size: 18px; color: #f0ead6; }
        .bb-footer { background: #060a0f; border-top: 1px solid rgba(240,234,214,0.06); padding: 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .bb-footer-brand { font-size: 20px; font-weight: 900; color: #2d6b65; font-family: 'Cinzel', 'Trajan Pro', serif; }
        .bb-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(240,234,214,0.2); font-family: Georgia, serif; }
        @media (max-width: 768px) {
          .bb-nav { padding: 0 20px; height: 58px; }
          .bb-nav-logo { height: 36px; }
          .bb-section { padding: 40px 20px 32px; }
          .bb-section-head { margin-bottom: 24px; }
          .bb-section-title { font-size: 21px; }
          .bb-hero-tagline p { font-size: 9px; }
          .bb-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; }
          .bb-divider { padding: 0 20px; }
          .bb-footer { padding: 32px 20px; }
        }
      `}</style>

      <div className="bb-wrap">
        {/* NAV */}
        <nav className="bb-nav">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bar-bravo-logo.png" alt="Bar Bravo" className="bb-nav-logo" />
          <Link href="/shop/bar-bravo/cart" className="bb-nav-cart">
            Cart{count > 0 ? ` (${count})` : ''}
          </Link>
        </nav>

        {/* HERO */}
        <div className="bb-hero">
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={heroImage} alt="Bar Bravo" className="bb-hero-img" />
          ) : (
            <div className="bb-hero-placeholder" />
          )}
          {heroImage && <div className="bb-hero-glow" />}
          {heroImage && (
            <div className="bb-hero-tagline">
              <p>Crafted on the Coast.<br />Worn Everywhere.</p>
            </div>
          )}
        </div>

        {/* HATS */}
        {hats.length > 0 && (
          <section className="bb-section">
            <div className="bb-section-head">
              <h2 className="bb-section-title">Hats</h2>
              <span className="bb-section-count">{hats.length} styles</span>
            </div>
            <div className="bb-grid">
              {hats.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} />)}
            </div>
          </section>
        )}

        {hats.length > 0 && tees.length > 0 && (
          <div className="bb-divider">
            <div className="bb-divider-inner">
              <div className="bb-divider-line" />
              <span className="bb-divider-anchor">⚓</span>
              <div className="bb-divider-line" />
            </div>
          </div>
        )}

        {/* TEES */}
        {tees.length > 0 && (
          <section className="bb-section">
            <div className="bb-section-head">
              <h2 className="bb-section-title">Tees</h2>
              <span className="bb-section-count">{tees.length} styles</span>
            </div>
            <div className="bb-grid">
              {tees.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} />)}
            </div>
          </section>
        )}

        <footer className="bb-footer">
          <span className="bb-footer-brand">Bar Bravo</span>
          <p className="bb-footer-copy">Powered by Merch Beast</p>
        </footer>
      </div>
    </div>
  )
}

function ProductCard({ product, activeSale }: { product: BarBravoProduct; activeSale?: ActiveSale }) {
  const [hovered, setHovered] = useState(false)
  const salePrice = calcSalePrice(product.price, activeSale ?? null, product.slug)

  return (
    <Link
      href={product.path}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ marginBottom: 10, overflow: 'hidden', background: 'transparent' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.4s ease, opacity 0.3s ease', opacity: hovered ? 0.75 : 1, transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4, color: '#f0ead6', margin: 0, fontFamily: "'Cinzel', 'Trajan Pro', serif" }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {salePrice && <span style={{ fontSize: 14, color: '#2d6b65', fontWeight: 700 }}>${salePrice}</span>}
          <span style={{ fontSize: 14, color: salePrice ? 'rgba(240,234,214,0.3)' : '#f0ead6', fontWeight: 600, textDecoration: salePrice ? 'line-through' : 'none' }}>${product.price}</span>
        </div>
      </div>
      {product.colors && (
        <p style={{ fontSize: 10, color: 'rgba(240,234,214,0.3)', letterSpacing: '0.05em', marginTop: 3, fontFamily: 'Georgia, serif' }}>
          {product.colors.join(' · ')}
        </p>
      )}
    </Link>
  )
}
