'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { nomoProducts, type NomoProduct } from '@/app/products/nomo-nomo-products-data'
import { useCart } from '@/app/cart-context'
import type { ActiveSale } from '@/lib/sale'
import { calcSalePrice } from '@/lib/sale'

type DBProduct = { slug: string; name: string; price: string; description: string; images: string[]; sizes: string[]; colors: string[]; tag: string | null; stock?: number | null }

export function NomoNomoStorefront({ heroImage, activeSale, dbProducts }: { heroImage?: string | null; activeSale?: ActiveSale; dbProducts?: DBProduct[] }) {
  const { count, setBrandColor, setShopPath } = useCart()
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => { setBrandColor('#C41E1E'); setShopPath('/shop/nomo-nomo') }, [setBrandColor, setShopPath])
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    const tryPlay = () => video.play().catch(() => {})
    tryPlay()
    document.addEventListener('touchstart', tryPlay, { once: true })
    document.addEventListener('click', tryPlay, { once: true })
    return () => {
      document.removeEventListener('touchstart', tryPlay)
      document.removeEventListener('click', tryPlay)
    }
  }, [])

  const products: (NomoProduct & { stock?: number | null })[] = dbProducts !== undefined
    ? dbProducts.map(p => ({ ...p, path: `/shop/nomo-nomo/products/${p.slug}`, shopifyUrl: '', category: p.tag || 'Tee', tag: p.tag || undefined, stock: p.stock ?? null }))
    : nomoProducts

  const tees = products.filter(p => p.category === 'Tee')
  const hats = products.filter(p => p.category === 'Hat')

  return (
    <div style={{ fontFamily: "'Kaisei Opti', serif", background: '#2e2e2e', color: '#fff', minHeight: '100vh' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kaisei+Opti:wght@400;700&display=swap');

        /* NAV */
        .nn-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 64px; background: rgba(13,13,13,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .nn-nav-logo { height: 40px; object-fit: contain; }
        .nn-nav-cart { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-decoration: none; padding: 9px 20px; border: 1px solid rgba(255,255,255,0.25); white-space: nowrap; transition: border-color 0.2s, color 0.2s; }
        .nn-nav-cart:hover { border-color: #C41E1E; color: #C41E1E; }

        /* HERO */
        .nn-hero { padding-top: 64px; background: #2e2e2e; position: relative; }
        .nn-hero img { width: 100%; height: auto; display: block; }
        .nn-hero-logo { height: 220px; object-fit: contain; margin-bottom: 32px; filter: drop-shadow(0 0 40px rgba(196,30,30,0.4)); }
        .nn-hero-tag { font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 16px; }
        .nn-hero-sub { font-size: 13px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.4); }

        /* SECTION */
        .nn-section { padding: 80px 40px; }
        .nn-section-head { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto 48px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .nn-section-title { font-size: 28px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; color: #fff; }
        .nn-section-count { font-size: 11px; color: rgba(255,255,255,0.3); }

        /* GRID */
        .nn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 20px; max-width: 1200px; margin: 0 auto; }

        /* DIVIDER */
        .nn-divider { max-width: 1200px; margin: 0 auto; padding: 40px 0; display: flex; align-items: center; gap: 20px; }
        .nn-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
        .nn-divider-text { font-size: 40px; letter-spacing: 0.4em; text-transform: uppercase; color: #C41E1E; }

        /* FOOTER */
        .nn-footer { background: #000; border-top: 1px solid rgba(255,255,255,0.06); padding: 48px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .nn-footer-brand { font-size: 18px; font-weight: 900; color: #C41E1E; letter-spacing: 0.05em; }
        .nn-footer-copy { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }

        /* TABLET */
        @media (max-width: 900px) {
          .nn-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 16px; }
        }
        @media (max-width: 640px) {
          .nn-nav { padding: 0 20px; height: 56px; }
          .nn-hero { min-height: 0; }
          .nn-hero-logo { height: 160px; }
          .nn-section { padding: 24px 20px 48px; }
          .nn-grid { grid-template-columns: repeat(2, 1fr); gap: 20px 12px; }
          .nn-footer { padding: 32px 20px; }
          .nn-section-title { font-size: 20px; }
        }
      `}</style>

      {/* NAV */}
      {activeSale && (
        <div style={{ background: '#C41E1E', color: '#fff', textAlign: 'center', padding: '10px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', position: 'sticky', top: 0, zIndex: 200 }}>
          {activeSale.name} — {activeSale.type === 'percentage' ? `${activeSale.value}% OFF` : `$${(activeSale.value/100).toFixed(0)} OFF`}{activeSale.scope === 'cart' ? ' EVERYTHING' : ' SELECT STYLES'}
        </div>
      )}
      <nav className="nn-nav">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nomo-nomo-logo.png" alt="Nomo Nomo" className="nn-nav-logo" />
        <Link href="/shop/nomo-nomo/cart" className="nn-nav-cart">
          Cart{count > 0 ? ` (${count})` : ''}
        </Link>
      </nav>

      {/* HERO */}
      <section className="nn-hero">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <source src="/nomo-nomo-hero.mp4" type="video/mp4" />
        </video>
      </section>

      {/* HATS */}
      {hats.length > 0 && (
        <section className="nn-section">
          <div className="nn-section-head">
            <h2 className="nn-section-title">Hats</h2>
            <span className="nn-section-count">{hats.length} styles</span>
          </div>
          <div className="nn-grid">
            {hats.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} stock={(p as any).stock ?? null} />)}
          </div>
        </section>
      )}

      {tees.length > 0 && hats.length > 0 && (
        <div style={{ padding: '0 40px' }}>
          <div className="nn-divider">
            <div className="nn-divider-line" />
            <span className="nn-divider-text">のものも</span>
            <div className="nn-divider-line" />
          </div>
        </div>
      )}

      {/* TEES */}
      {tees.length > 0 && (
        <section className="nn-section">
          <div className="nn-section-head">
            <h2 className="nn-section-title">Tees</h2>
            <span className="nn-section-count">{tees.length} styles</span>
          </div>
          <div className="nn-grid">
            {tees.map(p => <ProductCard key={p.slug} product={p} activeSale={activeSale} stock={(p as any).stock ?? null} />)}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="nn-footer">
        <span className="nn-footer-brand">NOMO NOMO</span>
        <p className="nn-footer-copy">Powered by Merch Beast</p>
      </footer>
    </div>
  )
}

function ProductCard({ product, activeSale, stock }: { product: NomoProduct; activeSale?: ActiveSale; stock?: number | null }) {
  const [hovered, setHovered] = useState(false)
  const salePrice = calcSalePrice(product.price, activeSale ?? null, product.slug)
  const isLimited = stock != null

  return (
    <Link
      href={product.path}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isLimited && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 6 }}>
          <span style={{ background: '#C41E1E', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 8px', alignSelf: 'flex-start' }}>
            Limited Edition
          </span>
          <span style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', padding: '3px 8px', alignSelf: 'flex-start' }}>
            {stock} / 100 remaining
          </span>
        </div>
      )}
      <div style={{ marginBottom: 4 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.35s ease', opacity: hovered ? 0.5 : 1 }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4, color: '#fff', margin: 0 }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {salePrice && <span style={{ fontSize: 16, color: '#ff6b6b', fontWeight: 700 }}>${salePrice}</span>}
          <span style={{ fontSize: 16, color: salePrice ? 'rgba(255,255,255,0.3)' : '#fff', fontWeight: 700, textDecoration: salePrice ? 'line-through' : 'none' }}>${product.price}</span>
        </div>
      </div>
      {product.colors && (
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em', marginTop: 3 }}>
          {product.colors.join(' · ')}
        </p>
      )}
    </Link>
  )
}
