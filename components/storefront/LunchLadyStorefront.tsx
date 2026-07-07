'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { products as staticProducts, type Product } from '@/app/products/products-data'
import { useCart } from '@/app/cart-context'
import type { ActiveSale } from '@/lib/sale'
import { calcSalePrice } from '@/lib/sale'

type DBProduct = { slug: string; name: string; price: string; description: string; images: string[]; sizes: string[]; colors: string[]; tag: string | null; active: boolean }

export function LunchLadyStorefront({ dbProducts, activeSale }: { dbProducts?: DBProduct[]; activeSale?: ActiveSale }) {
  const { setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#1C2E54'); setShopPath('/shop/lunch-lady') }, [setBrandColor, setShopPath])
  const products = dbProducts && dbProducts.length > 0
    ? dbProducts.map(p => ({ ...p, path: `/shop/lunch-lady/products/${p.slug}`, shopifyUrl: '', tag: p.tag || undefined }))
    : staticProducts
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#fff', color: '#111', minHeight: '100vh', border: '12px solid #D4911E', boxSizing: 'border-box' }}>

      <style>{`
        /* ── NAV ── */
        .ll-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 260px; background: rgba(255,255,255,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid #e8e8e8; }
        .ll-nav-logo { height: 240px; object-fit: contain; }
        .ll-nav-label { font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: #888; }
        .ll-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #111; text-decoration: none; padding: 10px 20px; border: 1px solid #111; white-space: nowrap; }
        /* ── HERO ── */
        .ll-hero-pad { padding-top: 260px; position: relative; }
        .ll-hero-text { position: absolute; bottom: 0; left: 0; right: 0; padding: 40px; background: linear-gradient(to top, rgba(28,46,84,0.75) 0%, transparent 100%); }
        .ll-hero-tagline { font-size: 16px; font-style: italic; color: rgba(255,255,255,0.9); margin-bottom: 6px; }
        .ll-hero-est { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.55); }
        /* ── COLLECTION ── */
        .ll-collection-head { padding: 64px 40px 32px; }
        .ll-collection-title { font-size: 32px; font-weight: 400; letter-spacing: -0.01em; }
        /* ── GRID ── */
        .ll-grid-wrap { padding: 0 40px 80px; }
        .ll-product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px 24px; max-width: 1200px; margin: 0 auto; }
        /* ── BRAND BAND ── */
        .ll-brand-band { background: #1C2E54; padding: 64px 40px; text-align: center; }
        .ll-brand-band p { font-size: clamp(1.1rem, 2.5vw, 1.8rem); font-style: italic; color: rgba(255,255,255,0.8); line-height: 1.5; max-width: 600px; margin: 0 auto; }
        /* ── FOOTER ── */
        .ll-footer { padding: 40px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e8e8e8; flex-wrap: wrap; gap: 16px; }
        .ll-footer-logo { height: 80px; object-fit: contain; }
        .ll-footer-copy { font-size: 10px; color: #ccc; letter-spacing: 0.15em; text-transform: uppercase; }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .ll-product-grid { grid-template-columns: repeat(2, 1fr); gap: 32px 20px; }
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .ll-nav { padding: 0 16px; height: 64px; }
          .ll-nav-logo { height: 46px; }
          .ll-nav-label { display: none; }
          .ll-nav-cart { font-size: 12px; padding: 8px 14px; }
          .ll-hero-pad { padding-top: 64px; }
          .ll-hero-text { padding: 20px; }
          .ll-hero-tagline { font-size: 14px; }
          .ll-hero-est { font-size: 10px; }
          .ll-collection-head { padding: 40px 20px 24px; }
          .ll-collection-title { font-size: 24px; }
          .ll-grid-wrap { padding: 0 20px 60px; }
          .ll-product-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; }
          .ll-brand-band { padding: 48px 20px; }
          .ll-footer { padding: 28px 20px; }
          .ll-footer-logo { height: 56px; }
        }

        @media (max-width: 380px) {
          .ll-product-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {activeSale && (
        <div style={{ background: '#C84020', color: '#fff', textAlign: 'center', padding: '10px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', position: 'sticky', top: 0, zIndex: 200 }}>
          {activeSale.name} — {activeSale.type === 'percentage' ? `${activeSale.value}% OFF` : `$${(activeSale.value/100).toFixed(0)} OFF`}{activeSale.scope === 'cart' ? ' EVERYTHING' : ' SELECT STYLES'}
        </div>
      )}
      {/* NAV */}
      <nav className="ll-nav">
        <span className="ll-nav-label">Merch Collection</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lunch-lady-logo.png" alt="Lunch Lady" className="ll-nav-logo" />
        <Link href="/shop/lunch-lady/cart" className="ll-nav-cart">Cart</Link>
      </nav>

      {/* HERO */}
      <section className="ll-hero-pad">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lunch-lady-hero.jpg" alt="Lunch Lady Collection" style={{ width: '100%', height: 'auto', display: 'block' }} />
        <div className="ll-hero-text">
          <p className="ll-hero-tagline">Born in Saigon. Worn Everywhere.</p>
          <p className="ll-hero-est">Est. 1995 •</p>
        </div>
      </section>

      {/* COLLECTION HEADER */}
      <section id="collection" className="ll-collection-head">
        <div style={{ maxWidth: 1200, margin: '0 auto', borderBottom: '1px solid #e8e8e8', paddingBottom: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <h2 className="ll-collection-title">The Collection</h2>
          </div>
          <p style={{ fontSize: 12, color: '#999' }}>{products.length} pieces</p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="ll-grid-wrap">
        <div className="ll-product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} activeSale={activeSale} />
          ))}
        </div>
      </section>

      {/* BRAND BAND */}
      <section className="ll-brand-band">
        <p>Est. 1995 • Saigon, Vietnam</p>
        <div style={{ width: 40, height: 2, background: '#C84020', margin: '28px auto 0' }} />
      </section>

      {/* FOOTER */}
      <footer className="ll-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lunch-lady-logo.png" alt="Lunch Lady" className="ll-footer-logo" />
        <p className="ll-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}

function ProductCard({ product, activeSale }: { product: Product; activeSale?: ActiveSale }) {
  const [hovered, setHovered] = useState(false)
  const salePrice = calcSalePrice(product.price, activeSale ?? null, product.slug)

  return (
    <Link
      href={product.path}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ marginBottom: 12, position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.6s ease', opacity: hovered ? 0.5 : 1 }}
        />
        {product.tag && (
          <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', background: '#fff', color: '#111', padding: '3px 8px' }}>
            {product.tag}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, marginRight: 8 }}>
          <h3 style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.4, marginBottom: 3 }}>
            {product.name.replace('Lunch Lady — ', '')}
          </h3>
          {product.sizes && product.sizes.length > 0 && (
            <p style={{ fontSize: 10, color: '#999', letterSpacing: '0.08em' }}>{product.sizes.filter(s => s !== '2XL').join(' · ')}</p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
          {salePrice && <span style={{ fontSize: 13, color: '#e53e3e', fontWeight: 700 }}>{salePrice}</span>}
          <span style={{ fontSize: 13, color: salePrice ? '#aaa' : '#C84020', fontWeight: 600, textDecoration: salePrice ? 'line-through' : 'none' }}>{product.price}</span>
        </div>
      </div>
    </Link>
  )
}
