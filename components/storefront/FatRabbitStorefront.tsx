'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/app/cart-context'

type Product = { slug: string; name: string; price: string; description: string; images: string[]; sizes: string[]; colors: string[]; tag: string | null }

export function FatRabbitStorefront({ dbProducts }: { heroImage?: string | null; dbProducts?: Product[] }) {
  const { count, setBrandColor, setShopPath } = useCart()
  useEffect(() => { setBrandColor('#C5442A'); setShopPath('/shop/fat-rabbit') }, [setBrandColor, setShopPath])

  const products = dbProducts !== undefined ? dbProducts : []

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: '#E8E4DC', color: '#1a1a1a', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        .fr-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 110px; background: rgba(232,228,220,0.97); backdrop-filter: blur(8px);
          border-bottom: 1px solid #C5442A;
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; padding: 0 32px;
        }
        .fr-nav-left { display: flex; align-items: center; }
        .fr-nav-center { display: flex; align-items: center; justify-content: center; }
        .fr-nav-right { display: flex; align-items: center; justify-content: flex-end; }
        .fr-nav-logo { height: 80px; object-fit: contain; }
        .fr-nav-icon { background: none; border: none; cursor: pointer; padding: 8px; color: #C5442A; display: flex; align-items: center; }
        .fr-nav-cart-link { color: #C5442A; display: flex; align-items: center; gap: 6px; text-decoration: none; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; font-family: 'Georgia', serif; }

        .fr-body { padding-top: 110px; }

        .fr-grid-wrap { padding: 48px 32px 80px; max-width: 1280px; margin: 0 auto; }
        .fr-product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px 24px; }

        .fr-empty { text-align: center; padding: 80px 40px; }
        .fr-empty p { font-size: 16px; color: #999; font-style: italic; }

        .fr-footer {
          background: #C5442A; padding: 36px 40px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .fr-footer-logo { height: 56px; object-fit: contain; filter: brightness(0) invert(1); }
        .fr-footer-city { font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase; color: #fff; font-family: 'Georgia', serif; font-weight: 400; }
        .fr-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.6); font-family: 'Georgia', serif; }

        @media (max-width: 1024px) { .fr-product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .fr-nav { padding: 0 20px; height: 80px; }
          .fr-nav-logo { height: 56px; }
          .fr-product-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 16px; }
          .fr-grid-wrap { padding: 32px 20px 60px; }
          .fr-footer { padding: 28px 20px; }
          .fr-footer-city { font-size: 11px; letter-spacing: 0.2em; }
        }
        @media (max-width: 420px) {
          .fr-product-grid { grid-template-columns: repeat(2, 1fr); gap: 20px 10px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="fr-nav">
        <div className="fr-nav-left">
          <button className="fr-nav-icon" aria-label="Menu">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <rect y="0" width="22" height="2" fill="#C5442A"/>
              <rect y="7" width="22" height="2" fill="#C5442A"/>
              <rect y="14" width="22" height="2" fill="#C5442A"/>
            </svg>
          </button>
        </div>
        <div className="fr-nav-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fat-rabbit-logo.svg" alt="Fat Rabbit" className="fr-nav-logo" />
        </div>
        <div className="fr-nav-right">
          <Link href="/shop/fat-rabbit/cart" className="fr-nav-cart-link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5442A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {count > 0 && <span style={{ fontSize: 11, color: '#C5442A' }}>({count})</span>}
          </Link>
        </div>
      </nav>

      {/* GRID */}
      <div className="fr-body">
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
        <span className="fr-footer-city">Fat Rabbit · St. Catharines, ON</span>
        <span className="fr-footer-copy">Powered by Merch Beast</span>
      </footer>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const displaySize = product.sizes.length === 1 ? product.sizes[0] : product.sizes.length > 1 ? product.sizes.join(' / ') : null

  return (
    <Link
      href={`/shop/fat-rabbit/products/${product.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', marginBottom: 14, background: '#dedad1', overflow: 'hidden' }}>
        {/* Tag badge */}
        {product.tag && (
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', background: '#C5442A', color: '#fff', padding: '4px 9px', fontFamily: 'Georgia, serif' }}>
            {product.tag}
          </div>
        )}
        {/* Cart icon */}
        <div style={{ position: 'absolute', top: 8, right: 10, zIndex: 2 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5442A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <svg width="10" height="10" viewBox="0 0 10 10" style={{ position: 'absolute', top: -3, right: -3 }}>
            <circle cx="5" cy="5" r="5" fill="#C5442A"/>
            <text x="5" y="8" textAnchor="middle" fontSize="7" fill="#fff" fontFamily="Georgia">+</text>
          </svg>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.3s', opacity: hovered ? 0.75 : 1 }}
        />
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.4, marginBottom: 3, color: '#C5442A', textDecoration: hovered ? 'underline' : 'none' }}>
        {product.name}
      </h3>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#C5442A', fontWeight: 600 }}>{product.price}</span>
      </div>
      {displaySize && (
        <p style={{ fontSize: 10, color: '#999', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3, fontFamily: 'Georgia, serif' }}>{displaySize}</p>
      )}
    </Link>
  )
}
