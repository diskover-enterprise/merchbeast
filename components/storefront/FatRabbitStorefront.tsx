'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/app/cart-context'

type Product = { slug: string; name: string; price: string; description: string; images: string[]; sizes: string[]; colors: string[]; tag: string | null }

export function FatRabbitStorefront({ dbProducts }: { heroImage?: string | null; dbProducts?: Product[] }) {
  const { count, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#db4021'); setShopPath('/shop/fat-rabbit') }, [setBrandColor, setShopPath])

  const products = dbProducts !== undefined ? dbProducts : []

  return (
    <div style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif", background: '#000', color: '#fff', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&display=swap');

        .fr-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 80px; background: rgba(0,0,0,0.96); backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(191,213,202,0.2);
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; padding: 0 32px;
        }
        .fr-nav-left { display: flex; align-items: center; }
        .fr-nav-center { display: flex; align-items: center; justify-content: center; }
        .fr-nav-right { display: flex; align-items: center; justify-content: flex-end; }
        .fr-nav-logo { height: 48px; object-fit: contain; filter: brightness(0) invert(1); }
        .fr-nav-icon { background: none; border: none; cursor: pointer; padding: 8px; color: #fff; display: flex; align-items: center; }
        .fr-nav-cart-link { color: #fff; display: flex; align-items: center; gap: 8px; text-decoration: none; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; font-family: 'Barlow Condensed', sans-serif; font-weight: 500; transition: color 0.2s; }
        .fr-nav-cart-link:hover { color: #db4021; }

        .fr-body { padding-top: 80px; }

        .fr-header { text-align: center; padding: 72px 32px 56px; border-bottom: 1px solid rgba(191,213,202,0.15); }
        .fr-header-eyebrow { font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; color: #b6b3d8; margin-bottom: 16px; font-weight: 500; }
        .fr-header-title { font-size: clamp(52px, 8vw, 96px); font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #bfd5ca; line-height: 0.95; margin: 0; }

        .fr-grid-wrap { padding: 64px 32px 96px; max-width: 1200px; margin: 0 auto; }
        .fr-product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }

        .fr-empty { text-align: center; padding: 120px 40px; }
        .fr-empty p { font-size: 18px; color: rgba(255,255,255,0.3); font-weight: 300; letter-spacing: 0.1em; }

        .fr-footer {
          border-top: 3px solid #bfd5ca;
          background: #0a0a0a;
          padding: 48px 40px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px;
        }
        .fr-footer-logo { height: 40px; object-fit: contain; filter: brightness(0) invert(1); }
        .fr-footer-address { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #b6b3d8; font-weight: 500; text-align: center; }
        .fr-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.2); text-align: right; }

        @media (max-width: 900px) {
          .fr-product-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .fr-nav { padding: 0 20px; height: 64px; }
          .fr-nav-logo { height: 38px; }
          .fr-header { padding: 56px 20px 40px; }
          .fr-grid-wrap { padding: 40px 0 64px; }
          .fr-footer { padding: 32px 20px; flex-wrap: wrap; gap: 16px; }
          .fr-footer-address { font-size: 10px; }
        }
        @media (max-width: 480px) {
          .fr-product-grid { grid-template-columns: repeat(1, 1fr); }
        }
      `}</style>

      {/* NAV */}
      <nav className="fr-nav">
        <div className="fr-nav-left">
          <button className="fr-nav-icon" aria-label="Menu">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <rect y="0" width="20" height="1.5" fill="#fff"/>
              <rect y="6.25" width="20" height="1.5" fill="#fff"/>
              <rect y="12.5" width="20" height="1.5" fill="#fff"/>
            </svg>
          </button>
        </div>
        <div className="fr-nav-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fat-rabbit-logo.svg" alt="Fat Rabbit" className="fr-nav-logo" />
        </div>
        <div className="fr-nav-right">
          <Link href="/shop/fat-rabbit/cart" className="fr-nav-cart-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {count > 0 && <span>({count})</span>}
          </Link>
        </div>
      </nav>

      {/* BODY */}
      <div className="fr-body">
        {/* HEADER */}
        <header className="fr-header">
          <p className="fr-header-eyebrow">Fat Rabbit · Niagara-on-the-Lake</p>
          <h1 className="fr-header-title">The Collection</h1>
        </header>

        {/* GRID */}
        <div className="fr-grid-wrap">
          {products.length === 0 ? (
            <div className="fr-empty"><p>New drops coming soon.</p></div>
          ) : (
            <div className="fr-product-grid">
              {products.map(p => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="fr-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/fat-rabbit-logo.svg" alt="Fat Rabbit" className="fr-footer-logo" />
        <span className="fr-footer-address">26 Queen Street · Niagara-on-the-Lake, ONT.</span>
        <span className="fr-footer-copy">Powered by Merch Beast</span>
      </footer>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const { items } = useCart()
  const inCart = items.some(i => i.product.slug === product.slug)

  return (
    <Link
      href={`/shop/fat-rabbit/products/${product.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        border: hovered ? '1px solid rgba(191,213,202,0.5)' : '1px solid rgba(191,213,202,0.15)',
        background: hovered ? 'rgba(191,213,202,0.04)' : 'transparent',
        transition: 'background 0.25s',
        position: 'relative',
        aspectRatio: '3/4',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Tag badge */}
        {product.tag && (
          <div style={{
            position: 'absolute', top: 16, left: 16, zIndex: 2,
            fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
            background: '#db4021', color: '#fff', padding: '4px 10px',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600,
          }}>
            {product.tag}
          </div>
        )}
        {/* Cart indicator */}
        {inCart && (
          <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 2 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#db4021" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
        )}
        {/* Product image — fills the card, slightly smaller to show border */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 24px 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'contain', display: 'block',
              transition: 'transform 0.4s ease, opacity 0.3s',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              opacity: hovered ? 0.9 : 1,
            }}
          />
        </div>
        {/* Card footer */}
        <div style={{ padding: '16px 20px 20px', borderTop: '1px solid rgba(191,213,202,0.12)' }}>
          <h3 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 15, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            lineHeight: 1.2, marginBottom: 6, color: '#fff',
          }}>
            {product.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: '#db4021', fontWeight: 700, letterSpacing: '0.05em' }}>
              {product.price}
            </span>
            {product.colors.length > 1 && (
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {product.colors.length} colours
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
