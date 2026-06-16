'use client'

import Link from 'next/link'
import { useState } from 'react'
import { products, type Product } from '@/app/products/products-data'

export function LunchLadyStorefront() {
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#fff', color: '#111', minHeight: '100vh', border: '12px solid #D4911E', boxSizing: 'border-box' }}>

      <style>{`
        .ll-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 100px; background: rgba(255,255,255,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid #e8e8e8; }
        .ll-nav-logo { height: 80px; object-fit: contain; }
        .ll-nav-label { font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: #888; }
        .ll-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #111; text-decoration: none; padding: 8px 18px; border: 1px solid #111; white-space: nowrap; }
        .ll-hero-pad { padding-top: 100px; }
        .ll-product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px 24px; }
        @media (max-width: 768px) {
          .ll-nav { padding: 0 16px; height: 72px; }
          .ll-nav-logo { height: 52px; }
          .ll-nav-label { display: none; }
          .ll-nav-cart { font-size: 12px; padding: 8px 14px; }
          .ll-hero-pad { padding-top: 72px; }
          .ll-product-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 16px; }
        }
        @media (max-width: 480px) {
          .ll-product-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className="ll-nav">
        <span className="ll-nav-label">Merch Collection</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lunch-lady-logo.png" alt="Lunch Lady" className="ll-nav-logo" />
        <Link href="/cart" className="ll-nav-cart">Cart</Link>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative' }} className="ll-hero-pad">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/lunch-lady-hero.jpg"
          alt="Lunch Lady Collection"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,46,84,0.7) 0%, transparent 60%)' }} />
        {/* Bottom text */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '48px 48px',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          <div>
<p style={{ fontSize: 15, fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', marginBottom: 8 }}>
              Born in Saigon. Worn Everywhere.
            </p>
            <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
              Est. 1995 •
            </p>
          </div>
        </div>
      </section>

      {/* COLLECTION HEADER */}
      <section id="collection" style={{ padding: '80px 40px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid #e8e8e8', paddingBottom: 24 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C84020', marginBottom: 8 }}>
                Current Drop
              </p>
              <h2 style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-0.01em' }}>
                The Collection
              </h2>
            </div>
            <p style={{ fontSize: 12, color: '#999', letterSpacing: '0.1em' }}>
              {products.length} pieces
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section style={{ padding: '0 40px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }} className="ll-product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* BRAND BAND */}
      <section style={{
        background: '#1C2E54',
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
          fontStyle: 'italic', fontWeight: 400,
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.5, maxWidth: 640, margin: '0 auto',
        }}>
          Est. 1995 • Saigon, Vietnam
        </p>
        <div style={{ width: 40, height: 2, background: '#C84020', margin: '32px auto 0' }} />
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '48px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid #e8e8e8',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lunch-lady-logo.png" alt="Lunch Lady" style={{ height: 120, objectFit: 'contain' }} />
        <p style={{ fontSize: 10, color: '#ccc', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Powered by Merch Beast
        </p>
      </footer>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={product.path}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{
        aspectRatio: '4/5',
        background: '#f5f2ee',
        overflow: 'hidden',
        marginBottom: 16,
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        {product.tag && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
            background: '#fff', color: '#111',
            padding: '4px 10px',
          }}>
            {product.tag}
          </div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(28,46,84,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          <span style={{
            fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#fff', border: '1px solid rgba(255,255,255,0.8)',
            padding: '12px 24px',
          }}>
            View Product
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, marginRight: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.4, marginBottom: 4 }}>
            {product.name.replace('Lunch Lady — ', '')}
          </h3>
          {product.sizes && product.sizes.length > 0 && (
            <p style={{ fontSize: 11, color: '#999', letterSpacing: '0.1em' }}>
              {product.sizes.join(' · ')}
            </p>
          )}
        </div>
        <span style={{ fontSize: 14, color: '#C84020', fontWeight: 600, flexShrink: 0 }}>
          {product.price.replace(' CAD', '')}
        </span>
      </div>
    </Link>
  )
}
