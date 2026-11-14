'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import type { BelliProduct } from '@/app/products/belli-products-data'
import { BELLI_PATH } from '@/app/products/belli-content'
import { BelliShell } from '@/components/storefront/belli/BelliShell'
import { BelliProductCard, BelliProductImage, belliPrice } from '@/components/storefront/belli/Products'

export default function BelliProductClient({ product, others, isUS = false }: { product: BelliProduct; others: BelliProduct[]; isUS?: boolean }) {
  return (
    <BelliShell isUS={isUS}>
      <ProductBody key={product.slug} product={product} />
      {others.length > 0 && (
        <section className="bl-section" style={{ paddingTop: 0 }}>
          <div className="bl-wrap">
            <h2 className="bl-display bl-h2" style={{ marginBottom: 32 }}>More goods</h2>
            <div className="bl-grid">
              {others.slice(0, 3).map(p => <BelliProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </BelliShell>
  )
}

function ProductBody({ product }: { product: BelliProduct }) {
  const { addToCart, isUS } = useCart()
  const price = belliPrice(product, isUS)
  const soldOut = product.stock === 0
  const needsSize = product.sizes.length > 1

  const [active, setActive] = useState(0)
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState<string | undefined>(needsSize ? undefined : product.sizes[0])
  const [qty, setQty] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (soldOut) return
    if (needsSize && !size) { setSizeError(true); return }
    for (let i = 0; i < qty; i++) addToCart(product, size, color, product.images[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="bl-wrap">
      <div className="bl-pdp">
        <div className="bl-pdp-media">
          <div className={`bl-pdp-photo${product.images[active] ? '' : ' empty'}`}>
            <BelliProductImage src={product.images[active]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="bl-pdp-thumbs">
              {product.images.map((src, i) => (
                <button key={src} className={i === active ? 'active' : ''} onClick={() => setActive(i)} aria-label={`Photo ${i + 1}`}>
                  <BelliProductImage src={src} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bl-pdp-info">
          <div>
            <Link href={`${BELLI_PATH}#merch`} className="bl-textlink" style={{ fontSize: 13 }}>← All merch</Link>
            <h1 className="bl-display bl-pdp-name" style={{ marginTop: 18 }}>{product.name}</h1>
            <p className="bl-pdp-price">{soldOut ? 'Sold out' : <>{price.text} <span style={{ fontSize: 13, fontWeight: 400 }}>{price.currency}</span></>}</p>
          </div>
          <p className="bl-pdp-desc">{product.description}</p>

          {product.colors.length > 1 && (
            <div className="bl-pdp-group">
              <span className="bl-label">Colour</span>
              <div className="bl-pdp-options" role="radiogroup" aria-label="Colour">
                {product.colors.map(c => (
                  <button key={c} role="radio" aria-checked={color === c} className={`bl-option${color === c ? ' active' : ''}`} onClick={() => setColor(c)}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {needsSize && (
            <div className="bl-pdp-group">
              <span className="bl-label">{sizeError ? 'Pick a size first' : 'Size'}</span>
              <div className="bl-pdp-options" role="radiogroup" aria-label="Size">
                {product.sizes.map(s => (
                  <button key={s} role="radio" aria-checked={size === s} className={`bl-option${size === s ? ' active' : ''}`} onClick={() => { setSize(s); setSizeError(false) }}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="bl-pdp-buy">
            <div className="bl-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Fewer">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} aria-label="More">+</button>
            </div>
            <button className="bl-btn" onClick={handleAdd} disabled={soldOut}>
              {soldOut ? 'Sold out' : added ? 'Added to bag' : 'Add to bag'}
            </button>
          </div>
          {added && <Link href={`${BELLI_PATH}/cart`} className="bl-btn ghost">View bag</Link>}

          <div>
            <details className="bl-details">
              <summary><span>Shipping</span><span>+</span></summary>
              <div>$10 flat across Canada, $15 to the US. Ships from Vancouver in 2–5 business days.</div>
            </details>
            <details className="bl-details">
              <summary><span>Returns</span><span>+</span></summary>
              <div>Unworn items can come back within 14 days of delivery. See <Link href={`${BELLI_PATH}/shipping-returns#returns`}>returns</Link>.</div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
