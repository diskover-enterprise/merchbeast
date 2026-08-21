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
    <div style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif", background: '#e8e8e2', color: '#db4021', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&display=swap');

        .fr-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 72px; background: rgba(232,232,226,0.97); backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(219,64,33,0.12);
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; padding: 0 32px;
        }
        .fr-nav-left { display: flex; align-items: center; gap: 28px; width: 120px; }
        .fr-nav-center { display: flex; align-items: center; justify-content: center; }
        .fr-nav-right { display: flex; align-items: center; justify-content: flex-end; gap: 20px; }
        .fr-nav-logo { height: 72px; object-fit: contain; }
        .fr-nav-link { font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #db4021; text-decoration: none; transition: opacity 0.2s; }
        .fr-nav-link:hover { opacity: 0.6; }
        .fr-nav-cart { font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #fff; background: #db4021; padding: 9px 20px; text-decoration: none; transition: opacity 0.2s; white-space: nowrap; }
        .fr-nav-cart:hover { opacity: 0.85; }

        .fr-body { padding-top: 72px; }

        .fr-header { text-align: center; padding: 80px 32px 64px; }
        .fr-header-eyebrow { font-size: 10px; letter-spacing: 0.45em; text-transform: uppercase; color: rgba(219,64,33,0.4); margin-bottom: 20px; font-weight: 600; }
        .fr-header-title { font-size: clamp(48px, 7vw, 88px); font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #db4021; line-height: 0.95; margin: 0 0 16px; }
        .fr-header-rule { width: 48px; height: 2px; background: #db4021; margin: 24px auto 0; opacity: 0.3; }

        .fr-grid-wrap { padding: 8px 32px 96px; max-width: 1200px; margin: 0 auto; }
        .fr-product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        .fr-empty { text-align: center; padding: 120px 40px; }
        .fr-empty p { font-size: 16px; color: rgba(219,64,33,0.4); font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; }

        .fr-newsletter {
          background: #db4021; padding: 14px 32px;
          display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
        }
        .fr-newsletter-label { font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; white-space: nowrap; }
        .fr-newsletter-form { display: flex; align-items: center; gap: 0; flex-shrink: 0; }
        .fr-newsletter-input { background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.5); padding: 6px 12px; font-size: 12px; letter-spacing: 0.1em; color: #fff; font-family: 'Barlow Condensed', sans-serif; outline: none; width: 220px; }
        .fr-newsletter-input::placeholder { color: rgba(255,255,255,0.55); }
        .fr-newsletter-btn { background: transparent; border: none; font-size: 12px; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; cursor: pointer; padding: 6px 0 6px 20px; font-family: 'Barlow Condensed', sans-serif; white-space: nowrap; transition: opacity 0.2s; }
        .fr-newsletter-btn:hover { opacity: 0.7; }

        .fr-wordmark {
          background: #e8e8e2; overflow: hidden; line-height: 0.82;
          padding: 24px 0 0;
        }
        .fr-wordmark-text {
          font-family: 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif;
          font-size: 22vw; font-weight: 800; letter-spacing: -0.01em; text-transform: uppercase;
          color: transparent; -webkit-text-stroke: 2px #db4021;
          display: block; text-align: center; white-space: nowrap;
          line-height: 0.88; padding-bottom: 8px;
        }

        .fr-footer {
          border-top: 1px solid rgba(219,64,33,0.15);
          background: #e8e8e2;
          padding: 28px 40px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px;
        }
        .fr-footer-logo { height: 40px; object-fit: contain; }
        .fr-footer-address { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(219,64,33,0.5); font-weight: 600; text-align: center; }
        .fr-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(219,64,33,0.3); text-align: right; }

        @media (max-width: 900px) {
          .fr-product-grid { grid-template-columns: repeat(2, 1fr); }
          .fr-nav-left .fr-nav-link:not(:first-child) { display: none; }
        }
        @media (max-width: 768px) {
          .fr-nav { padding: 0 20px; height: 60px; }
          .fr-nav-logo { height: 40px; }
          .fr-header { padding: 56px 20px 40px; }
          .fr-grid-wrap { padding: 8px 16px 64px; gap: 16px; }
          .fr-footer { padding: 32px 20px; flex-wrap: wrap; gap: 16px; }
        }
        @media (max-width: 480px) {
          .fr-product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="fr-nav">
        <div className="fr-nav-left" />
        <div className="fr-nav-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fat-rabbit-logo.svg" alt="Fat Rabbit" className="fr-nav-logo" />
        </div>
        <div className="fr-nav-right">
          <Link href="/shop/fat-rabbit/cart" className="fr-nav-cart">
            Cart{count > 0 ? ` (${count})` : ''}
          </Link>
        </div>
      </nav>

      {/* BODY */}
      <div className="fr-body">
        {/* HEADER */}
        <header className="fr-header">
          <p className="fr-header-eyebrow">St. Catharines · 34 Geneva Street</p>
          <h1 className="fr-header-title">The Shop</h1>
          <div className="fr-header-rule" />
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

      {/* NEWSLETTER STRIP */}
      <div className="fr-newsletter">
        <span className="fr-newsletter-label">Get the latest news on Fat Rabbit Restaurant and Butcher!</span>
        <form className="fr-newsletter-form" onSubmit={e => e.preventDefault()}>
          <input className="fr-newsletter-input" type="email" placeholder="Your Email" />
          <button className="fr-newsletter-btn" type="submit">Subscribe</button>
        </form>
      </div>

      {/* WORDMARK */}
      <div className="fr-wordmark">
        <span className="fr-wordmark-text">FAT RABBIT</span>
      </div>

      {/* FOOTER */}
      <footer className="fr-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/fat-rabbit-logo.svg" alt="Fat Rabbit" className="fr-footer-logo" />
        <span className="fr-footer-address">34 Geneva Street · St. Catharines, ONT.</span>
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
        background: '#fff',
        border: hovered ? '1px solid rgba(219,64,33,0.3)' : '1px solid rgba(219,64,33,0.08)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        boxShadow: hovered ? '0 8px 32px rgba(219,64,33,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Tag badge */}
        {product.tag && (
          <div style={{
            position: 'absolute', top: 14, left: 14, zIndex: 2,
            fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
            background: '#db4021', color: '#fff', padding: '4px 10px',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          }}>
            {product.tag}
          </div>
        )}
        {/* Cart indicator */}
        {inCart && (
          <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, background: '#db4021', borderRadius: '50%', width: 8, height: 8 }} />
        )}
        {/* Product image */}
        <div style={{ background: '#f5f4f0', padding: '32px 24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 260 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            style={{
              width: '100%', maxHeight: 240, objectFit: 'contain', display: 'block',
              transition: 'transform 0.4s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        </div>
        {/* Card footer */}
        <div style={{ padding: '16px 20px 20px', borderTop: '1px solid rgba(219,64,33,0.08)' }}>
          <h3 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            lineHeight: 1.3, marginBottom: 8, color: '#1a1a1a',
          }}>
            {product.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: '#db4021', fontWeight: 700, letterSpacing: '0.05em' }}>
              {product.price}
            </span>
            {product.colors.length > 1 && (
              <span style={{ fontSize: 9, color: 'rgba(219,64,33,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                {product.colors.length} colours
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
