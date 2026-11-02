'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import type { LittleFlowerProduct } from '@/app/products/little-flower-products-data'
import { collections, collectionPath } from '@/app/products/little-flower-content'
import { LittleFlowerShell } from '@/components/storefront/little-flower/LittleFlowerShell'
import { LITTLE_FLOWER_PATH } from '@/components/storefront/little-flower/Header'
import { ProductGrid, ProductImage, Swatches, formatPrice } from '@/components/storefront/little-flower/Products'

export default function LittleFlowerProductClient({ product, others, isUS = false }: { product: LittleFlowerProduct; others: LittleFlowerProduct[]; isUS?: boolean }) {
  // Same collection first, then everything else
  const related = [...others.filter(p => p.collection === product.collection), ...others.filter(p => p.collection !== product.collection)].slice(0, 4)
  return (
    <LittleFlowerShell isUS={isUS}>
      <ProductBody key={product.slug} product={product} />
      {related.length > 0 && (
        <section className="lf-section lf-section-rule">
          <div className="lf-wrap">
            <div className="lf-section-head">
              <div>
                <p className="lf-micro lf-accent">You may also like</p>
                <h2 className="lf-h2">More from the shop</h2>
              </div>
            </div>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </LittleFlowerShell>
  )
}

function ProductBody({ product }: { product: LittleFlowerProduct }) {
  const { addToCart, isUS } = useCart()
  const price = formatPrice(product, isUS)
  const soldOut = product.stock === 0
  const needsSize = product.sizes.length > 1
  const collection = collections.find(c => c.key === product.collection)

  const [color, setColor] = useState<string | undefined>(product.colors[0])
  const [active, setActive] = useState(0)
  const [size, setSize] = useState<string | undefined>(needsSize ? undefined : product.sizes[0])
  const [qty, setQty] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  // Photos follow the chosen colour when the product has per-colour sets
  const photos = (color && product.colorImages?.[color]) || product.images

  function pickColor(c: string) { setColor(c); setActive(0) }

  function handleAdd() {
    if (soldOut) return
    if (needsSize && !size) { setSizeError(true); return }
    for (let i = 0; i < qty; i++) addToCart(product, size, color, photos[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="lf-wrap">
      <nav className="lf-crumbs" aria-label="Breadcrumb">
        <Link href={LITTLE_FLOWER_PATH}>Shop</Link><span aria-hidden>/</span>
        {collection && <><Link href={collectionPath(collection.key)}>{collection.title}</Link><span aria-hidden>/</span></>}
        <span>{product.name}</span>
      </nav>
      <div className="lf-pdp">
        <div className="lf-pdp-media">
          <div className="lf-pdp-photo"><ProductImage src={photos[active]} alt={product.name} /></div>
          {photos.length > 1 && (
            <div className="lf-pdp-thumbs">
              {photos.map((src, i) => (
                <button key={src} className={i === active ? 'active' : ''} onClick={() => setActive(i)} aria-label={`Photo ${i + 1}`}>
                  <ProductImage src={src} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lf-pdp-info">
          <div>
            <p className="lf-micro lf-accent">{collection?.title ?? product.tag}</p>
            <h1 className="lf-pdp-name">{product.name}</h1>
            <p className="lf-pdp-price">{soldOut ? 'Sold out' : <>{price.text} <span className="lf-currency">{price.currency}</span></>}</p>
          </div>
          <p className="lf-body">{product.description}</p>

          {product.colors.length > 0 && (
            <div className="lf-pdp-group">
              <span className="lf-label">Colour <span className="lf-label-value">{color}</span></span>
              {product.colors.length > 1 && <Swatches colors={product.colors} active={color} onPick={pickColor} />}
            </div>
          )}

          {needsSize && (
            <div className="lf-pdp-group">
              <span className="lf-label" style={sizeError ? { color: 'var(--lf-maroon)' } : undefined}>
                {sizeError ? 'Please choose a size' : 'Size'}
              </span>
              <div className="lf-pdp-options" role="radiogroup" aria-label="Size">
                {product.sizes.map(s => (
                  <button key={s} role="radio" aria-checked={size === s} className={`lf-option${size === s ? ' active' : ''}`} onClick={() => { setSize(s); setSizeError(false) }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="lf-pdp-buy">
            <div className="lf-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Fewer">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} aria-label="More">+</button>
            </div>
            <button className="lf-btn" onClick={handleAdd} disabled={soldOut}>
              {soldOut ? 'Sold out' : added ? 'Added to bag' : 'Add to bag'}
            </button>
          </div>
          {added && <Link href={`${LITTLE_FLOWER_PATH}/cart`} className="lf-btn ghost">View bag</Link>}

          <div>
            <details className="lf-details">
              <summary><span>Shipping</span><span>+</span></summary>
              <div>$10 flat across Canada, $15 to the US. Ships from Vancouver in 2–5 business days.</div>
            </details>
            <details className="lf-details">
              <summary><span>Returns</span><span>+</span></summary>
              <div>Unworn items can come back within 14 days of delivery. See <Link href={`${LITTLE_FLOWER_PATH}/shipping-returns`}>shipping &amp; returns</Link>.</div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
