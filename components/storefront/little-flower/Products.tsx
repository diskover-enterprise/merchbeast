'use client'

import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { hasUsdPrice } from '@/lib/currency'
import type { LittleFlowerProduct } from '@/app/products/little-flower-products-data'
import { LF_PATH, LF_SHOP, swatches } from '@/app/products/little-flower-content'

export function formatPrice(p: { price: string; priceUsd?: number | null }, isUS: boolean) {
  const usd = isUS && hasUsdPrice(p)
  const amount = usd ? p.priceUsd! / 100 : parseFloat(p.price.replace(/[^0-9.]/g, ''))
  return { text: Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`, currency: usd ? 'USD' : 'CAD' }
}

/** A product photo, or a quiet blank until one exists. */
export function ProductImage({ src, alt = '' }: { src?: string; alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (src) return <img src={src} alt={alt} loading="lazy" />
  return <span className="lf-photo-empty">Photo coming</span>
}

export function Swatches({ colors, active, onPick }: { colors: string[]; active?: string; onPick?: (c: string) => void }) {
  const known = colors.filter(c => swatches[c])
  if (known.length === 0) return null
  return (
    <span className="lf-swatches">
      {known.map(c => onPick
        ? <button key={c} type="button" className={`lf-swatch${active === c ? ' active' : ''}`} style={{ background: swatches[c] }} onClick={() => onPick(c)} aria-label={c} aria-pressed={active === c} />
        : <span key={c} className="lf-swatch" style={{ background: swatches[c] }} title={c} />)}
    </span>
  )
}

export function ProductCard({ product }: { product: LittleFlowerProduct }) {
  const { isUS } = useCart()
  const price = formatPrice(product, isUS)
  const soldOut = product.stock === 0
  const [img, alt] = product.images

  return (
    <Link href={`${LF_PATH}/products/${product.slug}`} className="lf-card">
      <div className={`lf-card-media${alt ? ' has-alt' : ''}`}>
        <div className="lf-card-layer"><ProductImage src={img} alt={product.name} /></div>
        {alt && <div className="lf-card-layer alt"><ProductImage src={alt} /></div>}
        {soldOut && <span className="lf-badge">Sold out</span>}
      </div>
      <div className="lf-card-info">
        <div className="lf-card-row">
          <h3 className="lf-card-name">{product.name}</h3>
          <span className="lf-card-price">{price.text}</span>
        </div>
        <div className="lf-card-row">
          <span className="lf-card-colour">{product.colors[0]}{product.colors.length > 1 ? ` + ${product.colors.length - 1} more` : ''}</span>
          <Swatches colors={product.colors} />
        </div>
      </div>
    </Link>
  )
}

export function ProductGrid({ products }: { products: LittleFlowerProduct[] }) {
  return (
    <div className="lf-grid">
      {products.map(p => <ProductCard key={p.slug} product={p} />)}
    </div>
  )
}

export function FeaturedProducts({ products }: { products: LittleFlowerProduct[] }) {
  return (
    <section id="new" className="lf-section">
      <div className="lf-wrap">
        <div className="lf-section-head">
          <div>
            <p className="lf-micro lf-accent">New &amp; Noteworthy</p>
            <h2 className="lf-h2">This season&rsquo;s pieces</h2>
          </div>
          <Link href={LF_SHOP} className="lf-arrow-link">View all <span aria-hidden>→</span></Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  )
}
