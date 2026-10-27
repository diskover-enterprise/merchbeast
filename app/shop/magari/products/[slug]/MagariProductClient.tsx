'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { splitMagariName, type MagariProduct } from '@/app/products/magari-products-data'
import { MagariShell } from '@/components/storefront/magari/MagariShell'
import { MAGARI_PATH } from '@/components/storefront/magari/Header'
import { ChalkboardPanel, ChalkText, ChalkUnderline, ChalkCircled } from '@/components/storefront/magari/Chalk'
import { SpecialsBoard, PhotoToCome, chalkPrice } from '@/components/storefront/magari/Products'

export default function MagariProductClient({ product, others, isUS = false }: { product: MagariProduct; others: MagariProduct[]; isUS?: boolean }) {
  return (
    <MagariShell isUS={isUS}>
      <ProductBody product={product} />
      {others.length > 0 && (
        <section className="mg-section">
          <div className="mg-wrap">
            <SpecialsBoard products={others} />
          </div>
        </section>
      )}
    </MagariShell>
  )
}

function ProductBody({ product }: { product: MagariProduct }) {
  const { addToCart, isUS } = useCart()
  const { title, variant } = splitMagariName(product.name)
  const price = chalkPrice(product, isUS)
  const soldOut = product.stock === 0
  const needsSize = product.sizes.length > 1

  const [activeImg, setActiveImg] = useState(0)
  const [size, setSize] = useState<string | undefined>(needsSize ? undefined : product.sizes[0])
  const [qty, setQty] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (soldOut) return
    if (needsSize && !size) { setSizeError(true); return }
    for (let i = 0; i < qty; i++) addToCart(product, size, product.colors[0], product.images[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="mg-wrap">
      <div className="mg-pdp">
        <div className="mg-pdp-photo-col">
          <div className="mg-pdp-photo" style={{ position: 'relative' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {product.images[activeImg] ? <img src={product.images[activeImg]} alt={product.name} /> : <PhotoToCome />}
          </div>
          {product.images.length > 1 && (
            <div className="mg-pdp-thumbs">
              {product.images.map((img, i) => (
                <button key={img} className={i === activeImg ? 'active' : ''} onClick={() => setActiveImg(i)} aria-label={`Photo ${i + 1}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <ChalkboardPanel className="mg-pdp-board">
            <h1 className="mg-chalk mg-pdp-name" style={{ margin: 0, fontWeight: 400, textTransform: 'uppercase', transform: 'rotate(-1.2deg)', transformOrigin: 'left center' }}>
              <ChalkText>{title}</ChalkText>
            </h1>
            {variant && (
              <p className="mg-chalk mg-product-variant" style={{ margin: '4px 0 0', fontSize: 28 }}>
                <ChalkText amount={0.7}>{variant}</ChalkText>
              </p>
            )}
            <ChalkUnderline width={200} style={{ marginTop: 8 }} />
            <p className="mg-chalk mg-pdp-price" style={{ margin: 0, marginTop: 20, transform: 'rotate(1deg)', transformOrigin: 'left center' }}>
              {soldOut ? <ChalkCircled>sold out</ChalkCircled> : <><ChalkText>{price.text}</ChalkText><span className="mg-product-currency">{price.currency}</span></>}
            </p>
            {product.note && <p className="mg-chalk-note" style={{ margin: '16px 0 0', transform: 'rotate(-1deg)' }}>{product.note}</p>}
          </ChalkboardPanel>

          <div className="mg-pdp-controls">
            <p className="mg-body" style={{ margin: 0 }}>{product.description}</p>

            {product.sizes.length > 0 && (
              <div className="mg-pdp-group">
                <span className="mg-label" style={sizeError ? { color: 'var(--mg-ink)' } : undefined}>
                  {sizeError ? 'Pick a size first' : 'Size'}
                </span>
                <div className="mg-pdp-options" role="radiogroup" aria-label="Size">
                  {product.sizes.map(s => (
                    <button key={s} role="radio" aria-checked={size === s} className={`mg-option${size === s ? ' active' : ''}`} onClick={() => { setSize(s); setSizeError(false) }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mg-pdp-group">
              <span className="mg-label">Quantity</span>
              <div className="mg-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Fewer">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} aria-label="More">+</button>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              <button className="mg-btn" onClick={handleAdd} disabled={soldOut}>
                {soldOut ? 'Sold out' : added ? 'Added to bag' : 'Add to bag'}
              </button>
              {added && <Link href={`${MAGARI_PATH}/cart`} className="mg-btn ghost">View bag</Link>}
            </div>

            <div>
              <details className="mg-details">
                <summary><span>Shipping</span><span>+</span></summary>
                <div>$10 flat across Canada, $15 to the US. Ships from Vancouver in 2–5 business days.</div>
              </details>
              <details className="mg-details">
                <summary><span>Returns</span><span>+</span></summary>
                <div>Unworn items can come back within 14 days of delivery. See <Link href={`${MAGARI_PATH}/shipping-returns`}>shipping &amp; returns</Link>.</div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
