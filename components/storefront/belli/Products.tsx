'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { hasUsdPrice } from '@/lib/currency'
import type { BelliProduct, BelliCategory } from '@/app/products/belli-products-data'
import { BELLI_PATH, categoryFilters } from '@/app/products/belli-content'
import { BelliLogo } from './Header'

export function belliPrice(p: { price: string; priceUsd?: number | null }, isUS: boolean) {
  const usd = isUS && hasUsdPrice(p)
  const amount = usd ? p.priceUsd! / 100 : parseFloat(p.price.replace(/[^0-9.]/g, ''))
  return { text: Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`, currency: usd ? 'USD' : 'CAD' }
}

/** Product photo, or a clearly marked stand-in until the product is shot. */
export function BelliProductImage({ src, alt = '' }: { src?: string; alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (src) return <img src={src} alt={alt} loading="lazy" />
  return (
    <span className="bl-photo-empty">
      <BelliLogo />
      <span>Photo coming</span>
    </span>
  )
}

export function BelliProductCard({ product }: { product: BelliProduct }) {
  const { isUS } = useCart()
  const price = belliPrice(product, isUS)
  const [img, alt] = product.images
  return (
    <Link href={`${BELLI_PATH}/products/${product.slug}`} className="bl-card">
      <div className={`bl-card-media${img ? '' : ' empty'}`}>
        <div className="bl-card-layer"><BelliProductImage src={img} alt={product.name} /></div>
        {alt && <div className="bl-card-layer alt"><BelliProductImage src={alt} /></div>}
        {product.stock === 0 && <span className="bl-badge">Sold out</span>}
        {product.tag === 'Collab' && <span className="bl-badge">Collab</span>}
      </div>
      <div className="bl-card-info">
        <h3 className="bl-card-name">{product.name}</h3>
        <span className="bl-card-price">{price.text}</span>
      </div>
      <p className="bl-card-colors">{product.colors.join(' / ')}</p>
    </Link>
  )
}

/** Featured merch with category chips; chips only show for categories that have products. */
export function BelliMerch({ products, title, sub }: { products: BelliProduct[]; title: string; sub: string }) {
  const [filter, setFilter] = useState<BelliCategory | null>(null)
  const chips = categoryFilters.filter(c => products.some(p => p.category === c.key))
  const shown = filter ? products.filter(p => p.category === filter) : products

  return (
    <section id="merch" className="bl-section">
      <div className="bl-wrap">
        <div className="bl-section-head">
          <h2 className="bl-display bl-h2">{title}</h2>
          <p className="bl-mono bl-section-sub">{sub}</p>
        </div>
        {chips.length > 1 && (
          <div className="bl-chips" role="group" aria-label="Filter by category">
            <button type="button" className={!filter ? 'active' : undefined} aria-pressed={!filter} onClick={() => setFilter(null)}>All</button>
            {chips.map(c => (
              <button key={c.key} type="button" className={filter === c.key ? 'active' : undefined} aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>{c.label}</button>
            ))}
          </div>
        )}
        <div className="bl-grid">
          {shown.map(p => <BelliProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>
  )
}
