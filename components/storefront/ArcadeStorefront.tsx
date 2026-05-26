'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product, Restaurant } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { CartDrawer } from './CartDrawer'

const NEON_PINK = '#FF2E9A'
const NEON_CYAN = '#2EE6FF'
const NEON_YELLOW = '#FFE83D'
const BG_DARK = '#08051a'
const TEXT = '#f5f0ff'

const px = (font: string) => `'${font}', 'Courier New', monospace`
const PIXEL = px('Press Start 2P')

function neonText(color: string) {
  return `0 0 7px ${color}, 0 0 14px ${color}, 0 0 28px ${color}`
}

function neonBox(color: string) {
  return `0 0 8px ${color}, inset 0 0 8px ${color}22`
}

// ── Ticker ────────────────────────────────────────────────────────────────
const TICKER_MSG = '◆ INSERT COIN · NEW DROP LIVE ◆ LIMITED RUN · WHILE STOCKS LAST ◆ FREE SHIPPING OVER $100 ◆ PICK UP IN STORE ◆ '

function Ticker() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: NEON_PINK, overflow: 'hidden', height: '28px',
      display: 'flex', alignItems: 'center',
    }}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>
      <div style={{
        display: 'flex', whiteSpace: 'nowrap',
        animation: 'ticker 18s linear infinite',
        fontFamily: PIXEL, fontSize: '8px', color: '#08051a',
        letterSpacing: '0.05em',
      }}>
        {Array(6).fill(TICKER_MSG).join('')}
      </div>
    </div>
  )
}

// ── Arcade product card ───────────────────────────────────────────────────
interface CardProps {
  product: Product
  restaurant: Restaurant
  index: number
  onConflict: (item: Parameters<ReturnType<typeof useCart>['addItem']>[0]) => void
}

function ArcadeCard({ product, restaurant, index, onConflict }: CardProps) {
  const { addItem } = useCart()
  const firstImage = product.images[0] ?? null
  const stageLabel = `STAGE ${String(index + 1).padStart(2, '0')}`
  const scoreVal = String((index + 1) * 14200 + product.price).padStart(6, '0')

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    const item = {
      productId: product.id,
      restaurantId: restaurant.id,
      restaurantSlug: restaurant.slug,
      restaurantName: restaurant.name,
      name: product.name,
      price: product.price,
      image: firstImage,
      quantity: 1,
    }
    const result = addItem(item)
    if (result === 'conflict') onConflict(item)
  }

  return (
    <Link href={`/shop/${restaurant.slug}/products/${product.id}`} className="group block" style={{ textDecoration: 'none' }}>
      <div style={{
        border: `1px solid ${NEON_PINK}55`,
        background: `linear-gradient(135deg, rgba(255,46,154,0.06) 0%, rgba(8,5,26,0.95) 100%)`,
        padding: '16px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = NEON_PINK
          ;(e.currentTarget as HTMLElement).style.boxShadow = neonBox(NEON_PINK)
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = `${NEON_PINK}55`
          ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
      >
        {/* Corner decoration */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0,
          borderStyle: 'solid', borderWidth: '0 20px 20px 0',
          borderColor: `transparent ${NEON_PINK} transparent transparent` }} />

        {/* Stage */}
        <div style={{ fontFamily: PIXEL, fontSize: '7px', color: NEON_CYAN, marginBottom: '10px', letterSpacing: '0.1em' }}>
          {stageLabel}
        </div>

        {/* Image */}
        <div style={{ aspectRatio: '1', position: 'relative', marginBottom: '12px', background: 'rgba(255,46,154,0.04)' }}>
          {firstImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={firstImage} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain',
                filter: 'drop-shadow(0 0 12px rgba(255,46,154,0.35))',
                transition: 'transform 0.3s',
              }}
              className="group-hover:scale-105"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: `${NEON_PINK}10` }} />
          )}
          {product.stock === 0 && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(8,5,26,0.7)', fontFamily: PIXEL, fontSize: '9px', color: NEON_YELLOW,
            }}>
              SOLD OUT
            </div>
          )}
        </div>

        {/* Score */}
        <div style={{ fontFamily: PIXEL, fontSize: '7px', color: NEON_CYAN, marginBottom: '6px', opacity: 0.8 }}>
          1P SCORE {scoreVal}
        </div>

        {/* Name */}
        <h3 style={{ fontFamily: PIXEL, fontSize: '8px', color: TEXT, lineHeight: 1.6, marginBottom: '8px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.name}
        </h3>

        {/* Price + stock */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontFamily: PIXEL, fontSize: '10px', color: NEON_PINK, textShadow: neonText(NEON_PINK) }}>
            {formatCurrency(product.price)}
          </span>
          {product.stock > 0 && (
            <span style={{ fontFamily: PIXEL, fontSize: '6px', color: `${TEXT}60` }}>
              STK·{product.stock}
            </span>
          )}
        </div>

        {/* CTA */}
        {product.stock > 0 ? (
          <button
            onClick={handleAdd}
            style={{
              width: '100%', padding: '8px 0', background: 'transparent',
              border: `1px solid ${NEON_PINK}`, color: NEON_PINK,
              fontFamily: PIXEL, fontSize: '7px', cursor: 'pointer',
              letterSpacing: '0.05em', transition: 'background 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${NEON_PINK}22`
              ;(e.currentTarget as HTMLElement).style.boxShadow = neonBox(NEON_PINK)
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            ► INSERT COIN
          </button>
        ) : (
          <div style={{
            width: '100%', padding: '8px 0', textAlign: 'center',
            border: `1px solid ${TEXT}22`, color: `${TEXT}40`,
            fontFamily: PIXEL, fontSize: '7px',
          }}>
            GAME OVER
          </div>
        )}
      </div>
    </Link>
  )
}

// ── Main component ────────────────────────────────────────────────────────
interface Props {
  restaurant: Restaurant & { description?: string | null }
  products: Product[]
}

export function ArcadeStorefront({ restaurant, products }: Props) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [cartOpen, setCartOpen] = useState(false)
  const [conflictItem, setConflictItem] = useState<Parameters<ReturnType<typeof useCart>['addItem']>[0] | null>(null)
  const { itemCount, replaceCartWith, cartRestaurantName } = useCart()

  const categories = ['ALL', ...Array.from(new Set(products.map(p => p.category)))]
  const filtered = activeCategory === 'ALL' ? products : products.filter(p => p.category === activeCategory)

  const bgGradient = `radial-gradient(ellipse at 30% 0%, #241148 0%, #150a2e 35%, ${BG_DARK} 100%)`

  return (
    <>
      <Ticker />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Conflict dialog */}
      {conflictItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: BG_DARK, border: `1px solid ${NEON_PINK}`, padding: '32px', maxWidth: '400px', width: '100%' }}>
            <h3 style={{ fontFamily: PIXEL, fontSize: '10px', color: NEON_YELLOW, marginBottom: '16px', lineHeight: 1.8 }}>
              REPLACE CART?
            </h3>
            <p style={{ fontFamily: PIXEL, fontSize: '7px', color: `${TEXT}80`, lineHeight: 2, marginBottom: '24px' }}>
              CART HAS ITEMS FROM {cartRestaurantName?.toUpperCase()}. CONTINUE?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setConflictItem(null)}
                style={{ flex: 1, padding: '12px', background: 'transparent',
                  border: `1px solid ${TEXT}30`, color: `${TEXT}60`,
                  fontFamily: PIXEL, fontSize: '7px', cursor: 'pointer' }}>
                CANCEL
              </button>
              <button onClick={() => { replaceCartWith(conflictItem); setConflictItem(null) }}
                style={{ flex: 1, padding: '12px', background: NEON_PINK,
                  border: 'none', color: BG_DARK,
                  fontFamily: PIXEL, fontSize: '7px', cursor: 'pointer' }}>
                REPLACE
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: bgGradient, minHeight: '100vh', color: TEXT }}>

        {/* ── NAV ── */}
        <nav style={{
          position: 'fixed', top: '28px', left: 0, right: 0, zIndex: 90,
          background: 'rgba(8,5,26,0.85)', backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${NEON_PINK}33`,
          padding: '0 24px', height: '52px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href={`/shop/${restaurant.slug}`}
            style={{ fontFamily: PIXEL, fontSize: '9px', color: TEXT, textDecoration: 'none',
              textShadow: neonText(NEON_PINK) }}>
            {restaurant.name.toUpperCase()}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#shop" style={{ fontFamily: PIXEL, fontSize: '7px', color: `${TEXT}80`,
              textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = NEON_PINK)}
              onMouseLeave={e => (e.currentTarget.style.color = `${TEXT}80`)}>
              SHOP
            </a>
            <button onClick={() => setCartOpen(true)} style={{
              background: 'transparent', border: `1px solid ${NEON_PINK}`,
              color: NEON_PINK, fontFamily: PIXEL, fontSize: '7px', cursor: 'pointer',
              padding: '6px 12px', position: 'relative',
            }}>
              CART {itemCount > 0 && `(${itemCount})`}
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '120px 32px 64px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* CRT scanlines */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)',
          }} />

          {/* Grid lines */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.08,
            backgroundImage: `linear-gradient(${NEON_PINK}44 1px, transparent 1px), linear-gradient(90deg, ${NEON_PINK}44 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
            {/* Vol label */}
            <div style={{ fontFamily: PIXEL, fontSize: '8px', color: NEON_PINK, marginBottom: '24px',
              textShadow: neonText(NEON_PINK), letterSpacing: '0.15em' }}>
              VOL. 01 · ATTRACT MODE
            </div>

            {/* Brand name */}
            <h1 style={{
              fontFamily: PIXEL,
              fontSize: 'clamp(18px, 4vw, 48px)',
              color: TEXT,
              lineHeight: 1.4,
              marginBottom: '24px',
              textShadow: `${neonText(NEON_PINK)}, 0 0 80px rgba(255,46,154,0.3)`,
              letterSpacing: '0.05em',
            }}>
              QUAZAR<br />ARCADE
            </h1>

            {/* Tagline */}
            <div style={{ fontFamily: PIXEL, fontSize: '10px', color: NEON_CYAN,
              marginBottom: '20px', letterSpacing: '0.2em', textShadow: neonText(NEON_CYAN) }}>
              EAT · PLAY · WEAR
            </div>

            {/* Description */}
            {restaurant.description && (
              <p style={{ fontSize: '13px', color: `${TEXT}70`, lineHeight: 1.8,
                maxWidth: '480px', marginBottom: '36px', fontFamily: 'system-ui, sans-serif' }}>
                {restaurant.description}
              </p>
            )}

            {/* CTA */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#shop" style={{
                fontFamily: PIXEL, fontSize: '9px', color: BG_DARK,
                background: NEON_PINK, padding: '14px 24px',
                textDecoration: 'none', display: 'inline-block',
                boxShadow: `0 0 20px ${NEON_PINK}, 0 0 40px ${NEON_PINK}44`,
                letterSpacing: '0.05em',
              }}>
                ► INSERT COIN
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
              {[
                { label: 'STYLES', value: products.length },
                { label: 'RUN', value: '200 UNITS' },
                { label: 'LIVES', value: '∞' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontFamily: PIXEL, fontSize: '7px', color: `${TEXT}50`,
                    marginBottom: '6px', letterSpacing: '0.1em' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontFamily: PIXEL, fontSize: '16px', color: NEON_YELLOW,
                    textShadow: neonText(NEON_YELLOW) }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hi-score */}
          <div style={{
            position: 'absolute', top: '120px', right: '32px', zIndex: 2,
            textAlign: 'right', display: 'none',
          }} className="sm:block">
            <div style={{ fontFamily: PIXEL, fontSize: '7px', color: `${TEXT}50`, marginBottom: '6px' }}>
              HI-SCORE
            </div>
            <div style={{ fontFamily: PIXEL, fontSize: '20px', color: NEON_YELLOW,
              textShadow: neonText(NEON_YELLOW) }}>
              {products.reduce((a, p) => a + p.price, 0).toString().padStart(6, '0')}
            </div>
          </div>
        </section>

        {/* ── SHOP ── */}
        <section id="shop" style={{
          background: `linear-gradient(180deg, ${BG_DARK} 0%, #0d0820 100%)`,
          padding: '64px 32px 96px',
          borderTop: `1px solid ${NEON_PINK}33`,
        }}>
          {/* Section header */}
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
              marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontFamily: PIXEL, fontSize: '7px', color: NEON_PINK, marginBottom: '12px',
                  textShadow: neonText(NEON_PINK) }}>
                  SELECT FIGHTER
                </div>
                <h2 style={{ fontFamily: PIXEL, fontSize: 'clamp(14px, 2vw, 22px)', color: TEXT,
                  lineHeight: 1.4, textShadow: neonText(NEON_PINK) }}>
                  THE DROP
                </h2>
              </div>
              <div style={{ fontFamily: PIXEL, fontSize: '7px', color: `${TEXT}50` }}>
                {filtered.length} ITEMS
              </div>
            </div>

            {/* Category filter */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: PIXEL, fontSize: '7px', padding: '8px 14px',
                    background: activeCategory === cat ? NEON_PINK : 'transparent',
                    border: `1px solid ${activeCategory === cat ? NEON_PINK : `${TEXT}30`}`,
                    color: activeCategory === cat ? BG_DARK : `${TEXT}70`,
                    cursor: 'pointer',
                    boxShadow: activeCategory === cat ? `0 0 12px ${NEON_PINK}66` : 'none',
                    transition: 'all 0.2s',
                  }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Product grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '20px',
            }}>
              {filtered.map((product, i) => (
                <ArcadeCard
                  key={product.id}
                  product={product}
                  restaurant={restaurant}
                  index={i}
                  onConflict={setConflictItem}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          background: BG_DARK, borderTop: `1px solid ${NEON_PINK}33`,
          padding: '40px 32px', textAlign: 'center',
        }}>
          <div style={{ fontFamily: PIXEL, fontSize: '8px', color: NEON_PINK,
            textShadow: neonText(NEON_PINK), marginBottom: '16px' }}>
            INSERT COIN TO CONTINUE
          </div>
          <div style={{ fontFamily: PIXEL, fontSize: '7px', color: `${TEXT}30` }}>
            © {restaurant.name.toUpperCase()} · POWERED BY AFTER DESSERT
          </div>
        </footer>
      </div>
    </>
  )
}
