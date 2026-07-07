'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { boastyProducts, type BoastyProduct } from '@/app/products/boasty-collective-products-data'
import { useCart } from '@/app/cart-context'
import type { ActiveSale } from '@/lib/sale'
import { calcSalePrice } from '@/lib/sale'

type DBProduct = { slug: string; name: string; price: string; description: string; images: string[]; sizes: string[]; colors: string[]; tag: string | null; active: boolean }

export function BoastyCollectiveStorefront({ heroImage, logo, dbProducts, activeSale }: { heroImage?: string | null; logo?: string | null; dbProducts?: DBProduct[]; activeSale?: ActiveSale }) {
  const heroSrc = 'https://res.cloudinary.com/dwjvblzu9/image/upload/v1782248772/merchbeast/ccxxbxnbslckb2ipccm0.jpg'
  const { count, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#003A5C'); setShopPath('/shop/boasty-collective') }, [setBrandColor, setShopPath])
  const source = dbProducts && dbProducts.length > 0
    ? dbProducts.map(p => ({ ...p, category: p.tag || 'Tee', path: `/shop/boasty-collective/products/${p.slug}` }))
    : boastyProducts
  const tees = source.filter(p => p.category === 'Tee')
  const hats = source.filter(p => p.category === 'Hat')

  return (
    <div style={{ fontFamily: "'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#f9f6f0', color: '#1a1a2e', overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;700;800&display=swap');

        .bc-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 72px; background: #003A5C; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; }
        .bc-nav-brand { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.15em; text-transform: uppercase; color: #fff; text-decoration: none; }
        .bc-nav-brand span { color: #F4A261; }
        .bc-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 9px 20px; border: 1px solid rgba(255,255,255,0.35); white-space: nowrap; transition: border-color 0.2s, color 0.2s; }
        .bc-nav-cart:hover { border-color: #F4A261; color: #F4A261; }

        .bc-hero { padding-top: 72px; position: relative; background: #003A5C; }
        .bc-hero-img { display: block; width: 100%; height: auto; opacity: 1; }
        .bc-hero-content { position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; background: none; padding: 16px 24px 20px; }
        .bc-hero-content { position: relative; z-index: 2; padding: 60px 40px 64px; max-width: 700px; }
        .bc-hero-tag { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 0.25em; text-transform: uppercase; color: #F4A261; font-weight: 400; margin-bottom: 12px; text-shadow: 0 2px 8px rgba(0,0,0,0.7); }
        .bc-hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(60px, 10vw, 120px); color: #fff; line-height: 0.95; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 20px; }
        .bc-hero-title span { color: #F4A261; }
        .bc-hero-sub { font-size: 16px; color: #fff; font-weight: 700; line-height: 1.6; max-width: 420px; text-shadow: 0 1px 8px rgba(0,0,0,0.7); }

        .bc-wave { background: #003A5C; line-height: 0; }
        .bc-wave svg { display: block; width: 100%; }

        .bc-section { padding: 72px 40px; }
        .bc-section.dark { background: #003A5C; }
        .bc-section-head { display: flex; align-items: flex-end; justify-content: space-between; max-width: 1200px; margin: 0 auto 48px; padding-bottom: 20px; border-bottom: 2px solid rgba(0,58,92,0.12); }
        .bc-section.dark .bc-section-head { border-bottom-color: rgba(255,255,255,0.1); }
        .bc-section-title { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 0.1em; text-transform: uppercase; color: #003A5C; }
        .bc-section.dark .bc-section-title { color: #fff; }
        .bc-section-count { font-size: 11px; color: #F4A261; font-weight: 700; letter-spacing: 0.1em; }

        .bc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px 20px; max-width: 1200px; margin: 0 auto; }

        .bc-footer { background: #001f33; padding: 48px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .bc-footer-brand { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 0.15em; text-transform: uppercase; color: #fff; }
        .bc-footer-brand span { color: #F4A261; }
        .bc-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }

        @media (max-width: 1024px) { .bc-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .bc-nav { padding: 0 16px; height: 72px; }
          .bc-nav-cart { font-size: 10px; padding: 8px 14px; letter-spacing: 0.15em; }
          .bc-hero-content { bottom: 20px; left: 16px; right: 16px; }
          .bc-hero-tag { font-size: 22px; }
          .bc-hero-sub { font-size: 13px; }
          .bc-section { padding: 48px 16px; }
          .bc-section-head { margin-bottom: 28px; }
          .bc-section-title { font-size: 30px; }
          .bc-grid { grid-template-columns: repeat(2, 1fr); gap: 20px 12px; }
          .bc-footer { padding: 28px 16px; flex-direction: column; align-items: flex-start; gap: 8px; }
        }
        @media (max-width: 480px) {
          .bc-nav { height: 64px; }
          .bc-grid { grid-template-columns: repeat(2, 1fr); gap: 14px 8px; }
          .bc-hero-tag { font-size: 18px; }
          .bc-hero-sub { font-size: 12px; }
        }
      `}</style>

      {activeSale && (
        <div style={{ background: '#F4A261', color: '#003A5C', textAlign: 'center', padding: '10px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', position: 'sticky', top: 0, zIndex: 200 }}>
          {activeSale.name} — {activeSale.type === 'percentage' ? `${activeSale.value}% OFF` : `$${(activeSale.value/100).toFixed(0)} OFF`}{activeSale.scope === 'cart' ? ' EVERYTHING' : ' SELECT STYLES'}
        </div>
      )}
      <nav className="bc-nav">
        {logo ? <img src={logo} alt="Boasty Collective" style={{ height: 84, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} /> : <span className="bc-nav-brand">Boasty<span> Collective</span></span>}
        <Link href="/shop/boasty-collective/cart" className="bc-nav-cart">
          Cart{count > 0 ? ` (${count})` : ''}
        </Link>
      </nav>

      <section className="bc-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroSrc} alt="Boasty Collective" className="bc-hero-img" />
        <div className="bc-hero-content">
          <p className="bc-hero-tag">Boasty Collective</p>
          <p className="bc-hero-sub">Apparel inspired by the Caribbean — the water, the sun, the culture. Wear it like you live there.</p>
        </div>
      </section>

      <div className="bc-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" height="60">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f9f6f0" />
        </svg>
      </div>

      <section className="bc-section">
        <div className="bc-section-head">
          <h2 className="bc-section-title">Tees</h2>
          <span className="bc-section-count">{tees.length} styles</span>
        </div>
        <div className="bc-grid">
          {tees.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} />)}
        </div>
      </section>

      <section className="bc-section">
        <div className="bc-section-head">
          <h2 className="bc-section-title">Hats</h2>
          <span className="bc-section-count">{hats.length} styles</span>
        </div>
        <div className="bc-grid">
          {hats.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} />)}
        </div>
      </section>

      <footer className="bc-footer">
        <span className="bc-footer-brand">Boasty<span> Collective</span></span>
        <p className="bc-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}

function ProductCard({ product, activeSale }: { product: BoastyProduct; activeSale?: ActiveSale }) {
  const [hovered, setHovered] = useState(false)
  const salePrice = calcSalePrice(product.price, activeSale ?? null, product.slug)

  return (
    <Link href={product.path} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ marginBottom: 12, position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.6s ease', opacity: hovered ? 0.5 : 1 }} />
        {product.tag && (
          <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', background: '#F4A261', color: '#fff', padding: '3px 8px', fontWeight: 700, borderRadius: 2 }}>{product.tag}</div>
        )}
        {salePrice && (
          <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', background: '#e53e3e', color: '#fff', padding: '3px 8px', fontWeight: 700, borderRadius: 2 }}>SALE</div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: '#1a1a2e', flex: 1, marginRight: 8 }}>{product.name}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
          {salePrice && <span style={{ fontSize: 13, color: '#e53e3e', fontWeight: 700 }}>{salePrice}</span>}
          <span style={{ fontSize: 13, color: salePrice ? '#aaa' : '#F4A261', fontWeight: 700, textDecoration: salePrice ? 'line-through' : 'none' }}>{product.price}</span>
        </div>
      </div>
      {product.colors && (
        <p style={{ fontSize: 10, color: '#aaa', letterSpacing: '0.05em', marginTop: 3 }}>{product.colors.join(' · ')}</p>
      )}
    </Link>
  )
}
