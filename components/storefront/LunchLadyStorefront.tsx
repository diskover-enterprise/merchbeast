'use client'

import Link from 'next/link'
import { useState } from 'react'
import { products, type Product } from '@/app/products/products-data'

export function LunchLadyStorefront() {
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#fff', color: '#111', minHeight: '100vh', border: '12px solid #D4911E', boxSizing: 'border-box' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 90,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e8e8e8',
      }}>
        <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#888' }}>
          Merch Collection
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lunch-lady-logo.png" alt="Lunch Lady" style={{ height: 72, objectFit: 'contain' }} />
        <div style={{ width: 140 }} />
        <Link href="/cart" style={{
          fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#111', textDecoration: 'none',
          padding: '8px 20px', border: '1px solid #111',
        }}>
          Cart
        </Link>
      </nav>

      {/* HERO */}
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '85vh', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/lunch-lady-hero.jpg"
          alt="Lunch Lady Collection"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
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
            <p style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
              Est. Sài Gòn · 1995
            </p>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontStyle: 'italic',
              color: 'rgba(255,255,255,0.85)', maxWidth: 420, lineHeight: 1.6,
            }}>
              "Phở since the beginning. The original, the iconic, the irreplaceable."
            </p>
          </div>
          <a href="#collection" style={{
            fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#fff', textDecoration: 'none',
            padding: '14px 28px',
            border: '1px solid rgba(255,255,255,0.6)',
            background: 'rgba(28,46,84,0.4)',
            backdropFilter: 'blur(4px)',
            flexShrink: 0,
          }}>
            Shop the Collection
          </a>
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
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '48px 32px',
        }}>
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
          "The original Saigon street hawker.<br />Worn by those who know."
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
      href={`/products/${product.slug}`}
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
