'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { sappertonProducts, type SappertonProduct } from '@/app/products/sapperton-scrapper-products-data'
import { useCart } from '@/app/cart-context'
import type { ActiveSale } from '@/lib/sale'
import { calcSalePrice } from '@/lib/sale'

type DBProduct = {
  slug: string; name: string; price: string; description: string
  images: string[]; sizes: string[]; colors: string[]; tag: string | null
}

export function SappertonStorefront({ heroImage, activeSale, dbProducts }: {
  heroImage?: string | null
  activeSale?: ActiveSale
  dbProducts?: DBProduct[]
}) {
  const { count, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#b8860b'); setShopPath('/shop/sapperton-scrapper') }, [setBrandColor, setShopPath])

  const products: SappertonProduct[] = dbProducts !== undefined
    ? dbProducts.map(p => ({ ...p, path: `/shop/sapperton-scrapper/products/${p.slug}`, shopifyUrl: '', category: (p.tag || 'Tee') as 'Tee' | 'Hat', tag: (p.tag || 'Tee') as 'Tee' | 'Hat' }))
    : sappertonProducts

  const tees = products.filter(p => p.category === 'Tee')
  const hats = products.filter(p => p.category === 'Hat')

  return (
    <div style={{ fontFamily: "'Arial Black', 'Impact', sans-serif", background: '#f5f2ee', color: '#b8860b', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,700;1,900&family=Barlow:wght@400;600&display=swap');
        .ss-wrap { font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif; }
        .ss-nav { position: sticky; top: 0; z-index: 100; height: 148px; background: #f5f2ee; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; border-bottom: 2px solid #b8860b; }
        .ss-nav-logo { height: 128px; object-fit: contain; }
        .ss-nav-cart { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #b8860b; text-decoration: none; padding: 10px 22px; border: 2px solid #b8860b; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; transition: background 0.15s, color 0.15s; }
        .ss-nav-cart:hover { background: #b8860b; color: #f5f2ee; }
        .ss-hero { width: 100%; background: #111; position: relative; overflow: hidden; }
        .ss-hero-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }
        .ss-hero-glow { position: absolute; inset: 0; pointer-events: none; mix-blend-mode: screen; }
        .ss-hero-glow::before {
          content: '';
          position: absolute;
          top: 1%; left: 54%;
          width: 33%; height: 33%;
          background: radial-gradient(ellipse at 50% 40%, rgba(255,185,30,0.6) 0%, rgba(255,130,0,0.25) 45%, transparent 72%);
          animation: neonPulse 3s ease-in-out infinite;
        }
        .ss-hero-glow::after {
          content: '';
          position: absolute;
          top: 1%; left: 54%;
          width: 33%; height: 33%;
          background: radial-gradient(ellipse at 50% 40%, rgba(255,220,80,0.4) 0%, transparent 58%);
          animation: neonPulse 3s ease-in-out infinite 0.5s;
        }
        @keyframes neonPulse {
          0%, 100% { opacity: 1; }
          30% { opacity: 0.55; }
          35% { opacity: 1; }
          65% { opacity: 0.7; }
          70% { opacity: 1; }
        }
        .ss-hero-placeholder { width: 100%; height: 280px; background: #b8860b; display: flex; align-items: center; justify-content: center; }
        .ss-hero-placeholder-text { font-family: 'Barlow Condensed', sans-serif; font-size: 72px; font-weight: 900; font-style: italic; color: rgba(200,160,39,0.2); letter-spacing: -0.02em; text-transform: uppercase; }
        .ss-divider { width: 100%; padding: 0; }
        .ss-divider-inner { display: flex; align-items: center; gap: 20px; background: #b8860b; padding: 12px 48px; border-top: 2px solid #b8860b; border-bottom: 2px solid #b8860b; }
        .ss-divider-line { flex: 1; height: 1px; background: #f5f2ee; }
        .ss-divider-icon { font-size: 22px; filter: sepia(1) saturate(3) brightness(1.1) hue-rotate(5deg); }
        .ss-section { padding: 64px 48px 48px; max-width: 1280px; margin: 0 auto; }
        .ss-section-head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 40px; padding-bottom: 16px; border-bottom: 1px solid rgba(184,134,11,0.15); }
        .ss-section-title { font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif; font-size: 48px; font-weight: 900; font-style: italic; color: #b8860b; text-transform: uppercase; letter-spacing: -0.01em; line-height: 1; }
        .ss-section-count { font-size: 11px; color: rgba(184,134,11,0.4); letter-spacing: 0.2em; text-transform: uppercase; font-family: 'Barlow', sans-serif; }
        .ss-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 36px 24px; }
        .ss-footer { background: #b8860b; border-top: 4px solid #b8860b; padding: 40px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .ss-footer-brand { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 900; font-style: italic; color: #f5f2ee; text-transform: uppercase; letter-spacing: 0.05em; }
        .ss-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #f5f2ee; font-family: 'Barlow', sans-serif; }
        @media (max-width: 768px) {
          .ss-nav { padding: 0 20px; height: 88px; }
          .ss-nav-logo { height: 72px; }
          .ss-section { padding: 36px 20px 28px; }
          .ss-section-head { margin-bottom: 20px; }
          .ss-section-title { font-size: 36px; }
          .ss-grid { grid-template-columns: repeat(2, 1fr); gap: 20px 12px; }
          .ss-footer { padding: 28px 20px; }
        }
      `}</style>

      <div className="ss-wrap">
        <nav className="ss-nav">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sapperton-logo.png" alt="Sapperton Scrapper" className="ss-nav-logo" />
          <Link href="/shop/sapperton-scrapper/cart" className="ss-nav-cart">
            Cart{count > 0 ? ` (${count})` : ''}
          </Link>
        </nav>

        <div className="ss-hero">
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={heroImage} alt="Sapperton Scrapper" className="ss-hero-img" />
          ) : (
            <div className="ss-hero-placeholder">
              <span className="ss-hero-placeholder-text">Fight Night</span>
            </div>
          )}
          {heroImage && <div className="ss-hero-glow" />}
        </div>

        <div className="ss-divider"><div className="ss-divider-inner"><div className="ss-divider-line" /><span className="ss-divider-icon">🥊</span><div className="ss-divider-line" /></div></div>

        {tees.length > 0 && (
          <section className="ss-section">
            <div className="ss-section-head">
              <h2 className="ss-section-title">Tees</h2>
              <span className="ss-section-count">{tees.length} styles</span>
            </div>
            <div className="ss-grid">
              {tees.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} />)}
            </div>
          </section>
        )}

        {hats.length > 0 && (
          <>
            <div className="ss-divider"><div className="ss-divider-inner"><div className="ss-divider-line" /><span className="ss-divider-icon">🥊</span><div className="ss-divider-line" /></div></div>
            <section className="ss-section">
              <div className="ss-section-head">
                <h2 className="ss-section-title">Hats</h2>
                <span className="ss-section-count">{hats.length} styles</span>
              </div>
              <div className="ss-grid">
                {hats.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} />)}
              </div>
            </section>
          </>
        )}

        <footer className="ss-footer">
          <span className="ss-footer-brand">Sapperton Scrapper</span>
          <p className="ss-footer-copy">Powered by Merch Beast</p>
        </footer>
      </div>
    </div>
  )
}

function ProductCard({ product, activeSale }: { product: SappertonProduct; activeSale?: ActiveSale }) {
  const [hovered, setHovered] = useState(false)
  const salePrice = calcSalePrice(product.price, activeSale ?? null, product.slug)

  return (
    <Link
      href={product.path}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ marginBottom: 12, overflow: 'hidden', background: 'transparent' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.3s ease, opacity 0.2s ease', opacity: hovered ? 0.85 : 1, transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", fontSize: 18, fontWeight: 700, fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 1.2, color: '#b8860b', margin: 0, letterSpacing: '0.02em' }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'baseline' }}>
          {salePrice && <span style={{ fontSize: 15, color: '#b8860b', fontWeight: 700 }}>${salePrice}</span>}
          <span style={{ fontSize: 15, color: salePrice ? 'rgba(184,134,11,0.3)' : '#b8860b', fontWeight: 600, textDecoration: salePrice ? 'line-through' : 'none' }}>${product.price}</span>
        </div>
      </div>
      {product.colors && (
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: 'rgba(184,134,11,0.4)', letterSpacing: '0.05em', marginTop: 4 }}>
          {product.colors.join(' · ')}
        </p>
      )}
    </Link>
  )
}
