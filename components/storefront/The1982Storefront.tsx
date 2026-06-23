'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { the1982Products, type The1982Product } from '@/app/products/the1982-products-data'
import { useCart } from '@/app/cart-context'
import type { ActiveSale } from '@/lib/sale'
import { calcSalePrice } from '@/lib/sale'

type DBProduct = { slug: string; name: string; price: string; description: string; images: string[]; sizes: string[]; colors: string[]; tag: string | null; active: boolean }

const LOGO = '/1982-logo.png'

export function The1982Storefront({ heroImage, dbProducts, activeSale }: { heroImage?: string | null; dbProducts?: DBProduct[]; activeSale?: ActiveSale }) {
  const heroSrc = heroImage || '/1982-hero.jpg'
  const { count, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#B8860B'); setShopPath('/shop/the-1982') }, [setBrandColor, setShopPath])
  const source = dbProducts && dbProducts.length > 0
    ? dbProducts.map(p => ({ ...p, category: p.tag || 'Tee', path: `/shop/the-1982/products/${p.slug}` }))
    : the1982Products
  const tees = source.filter(p => p.category === 'Tee')
  const draftDay = source.filter(p => p.category === 'Draft Day')
  const crewnecks = source.filter(p => p.category === 'Crewneck')

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#fff', color: '#111', overflowX: 'hidden' }}>

      <style>{`
        /* NAV */
        .n82-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 64px; background: #000; display: flex; align-items: center; justify-content: flex-end; padding: 0 40px; }
        .n82-nav-logo { height: 200px; object-fit: contain; mix-blend-mode: screen; }
        .n82-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 9px 20px; border: 1px solid rgba(255,255,255,0.4); white-space: nowrap; transition: border-color 0.2s; }
        .n82-nav-cart:hover { border-color: #fff; }

        /* HERO */
        .n82-hero { padding-top: 64px; position: relative; overflow: hidden; }
        .n82-hero-img { width: 100%; height: auto; display: block; }
        .n82-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%); pointer-events: none; }

        /* SECTION */
        .n82-section { padding: 80px 40px; }
        .n82-section-head { display: flex; align-items: flex-end; justify-content: space-between; max-width: 1200px; margin: 0 auto 48px; border-bottom: 1px solid #e8e8e8; padding-bottom: 20px; }
        .n82-section-title { font-size: 28px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; color: #111; }
        .n82-section-count { font-size: 11px; color: #999; }
        .n82-section.dark { background: #0a0a0a; }
        .n82-section.dark .n82-section-head { border-bottom-color: rgba(255,255,255,0.1); }
        .n82-section.dark .n82-section-title { color: #fff; }
        .n82-section.dark .n82-section-count { color: rgba(255,255,255,0.3); }

        /* GRID */
        .n82-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px 20px; max-width: 1200px; margin: 0 auto; }

        /* FOOTER */
        .n82-footer { background: #000; padding: 48px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .n82-footer-logo { height: 40px; object-fit: contain; mix-blend-mode: screen; }
        .n82-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #fff; }

        /* TABLET */
        @media (max-width: 1024px) {
          .n82-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .n82-nav { padding: 0 20px; height: 56px; }
          .n82-hero { min-height: 300px; }
          .n82-section { padding: 48px 20px; }
          .n82-section-title { font-size: 18px; }
          .n82-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; }
          .n82-footer { padding: 32px 20px; }
        }
        @media (max-width: 480px) {
          .n82-grid { grid-template-columns: repeat(2, 1fr); gap: 16px 10px; }
        }
      `}</style>

      {/* NAV */}
      {activeSale && (
        <div style={{ background: '#B8860B', color: '#0a0a0a', textAlign: 'center', padding: '10px 20px', fontSize: 12, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', position: 'sticky', top: 0, zIndex: 200 }}>
          {activeSale.name} — {activeSale.type === 'percentage' ? `${activeSale.value}% OFF` : `$${(activeSale.value/100).toFixed(0)} OFF`}{activeSale.scope === 'cart' ? ' EVERYTHING' : ' SELECT STYLES'}
        </div>
      )}
      <nav className="n82-nav">
        <Link href="/shop/the-1982/cart" className="n82-nav-cart">
          Cart{count > 0 ? ` (${count})` : ''}
        </Link>
      </nav>

      {/* HERO */}
      <section className="n82-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroSrc} alt="The 1982" className="n82-hero-img" />
        <div className="n82-hero-overlay" />
        <div style={{ position: 'absolute', bottom: 32, left: 40, zIndex: 2 }}>
          <span style={{ fontSize: 13, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, color: '#F5C518', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            Vintage by Design
          </span>
        </div>
      </section>

      {/* TEES */}
      <section className="n82-section">
        <div className="n82-section-head">
          <h2 className="n82-section-title">Signature Tees</h2>
          <span className="n82-section-count">{tees.length} styles</span>
        </div>
        <div className="n82-grid">
          {tees.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} />)}
        </div>
      </section>

      {/* DRAFT DAY */}
      <section className="n82-section">
        <div className="n82-section-head">
          <h2 className="n82-section-title">Draft Day Tees</h2>
          <span className="n82-section-count">{draftDay.length} styles</span>
        </div>
        <div className="n82-grid">
          {draftDay.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} />)}
        </div>
      </section>

      {/* CREWNECKS */}
      <section className="n82-section">
        <div className="n82-section-head">
          <h2 className="n82-section-title">Crewnecks</h2>
          <span className="n82-section-count">{crewnecks.length} styles</span>
        </div>
        <div className="n82-grid">
          {crewnecks.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} />)}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="n82-footer">
        <span style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '0.05em' }}>1982</span>
        <p className="n82-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}

function ProductCard({ product, dark, activeSale }: { product: The1982Product; dark?: boolean; activeSale?: ActiveSale }) {
  const [hovered, setHovered] = useState(false)
  const salePrice = calcSalePrice(product.price, activeSale ?? null, product.slug)

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
          {salePrice && <span style={{ fontSize: 13, color: '#B8860B', fontWeight: 700 }}>{salePrice}</span>}
          <span style={{ fontSize: 13, color: salePrice ? (dark ? 'rgba(255,255,255,0.2)' : '#bbb') : (dark ? 'rgba(255,255,255,0.6)' : '#555'), fontWeight: 600, textDecoration: salePrice ? 'line-through' : 'none' }}>{product.price}</span>
        </div>
      </div>
      {product.colors && (
        <p style={{ fontSize: 10, color: dark ? 'rgba(255,255,255,0.3)' : '#999', letterSpacing: '0.05em', marginTop: 3 }}>
          {product.colors.join(' · ')}
        </p>
      )}
    </Link>
  )
}
