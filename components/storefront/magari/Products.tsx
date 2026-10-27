'use client'

import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { hasUsdPrice } from '@/lib/currency'
import { splitMagariName, type MagariProduct } from '@/app/products/magari-products-data'
import { ChalkboardPanel, ChalkText, ChalkUnderline, ChalkCircled, ChalkHeading, ChalkArrow } from './Chalk'
import { MAGARI_PATH } from './Header'

// Boards are written by hand, so no two sit quite the same way
const BOARD_FEEL = [
  { tilt: -1.2, nameTilt: -1.5, pad: '28px 30px 44px', priceTop: 4 },
  { tilt: 0.6, nameTilt: 1, pad: '32px 26px 36px', priceTop: 12 },
  { tilt: -0.4, nameTilt: -0.6, pad: '24px 32px 52px', priceTop: 0 },
  { tilt: 0.9, nameTilt: 1.4, pad: '30px 28px 40px', priceTop: 8 },
]

/** "$38" — chalk prices drop the cents when there are none. */
export function chalkPrice(p: { price: string; priceUsd?: number | null }, isUS: boolean) {
  const usd = isUS && hasUsdPrice(p)
  const amount = usd ? p.priceUsd! / 100 : parseFloat(p.price.replace(/[^0-9.]/g, ''))
  const text = Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`
  return { text, currency: usd ? 'USD' : 'CAD' }
}

export function ProductDisplay({ product, index = 0, hero = false }: { product: MagariProduct; index?: number; hero?: boolean }) {
  const { isUS } = useCart()
  const feel = BOARD_FEEL[index % BOARD_FEEL.length]
  const { title, variant } = splitMagariName(product.name)
  const price = chalkPrice(product, isUS)
  const soldOut = product.stock === 0
  const [img, alt] = product.images

  return (
    <Link href={`${MAGARI_PATH}/products/${product.slug}`} className={`mg-product${hero ? ' hero' : ''}`} aria-label={`${product.name}, ${price.text} ${price.currency}`}>
      <div className="mg-product-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {img ? <img src={img} alt={product.name} loading="lazy" /> : <PhotoToCome />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {alt && <img src={alt} alt="" className="alt" loading="lazy" />}
      </div>
      <ChalkboardPanel className="mg-product-info" style={{ padding: feel.pad }}>
        <div className="mg-product-row">
          <div style={{ transform: `rotate(${feel.nameTilt}deg)`, transformOrigin: 'left center' }}>
            <h3 className="mg-chalk mg-product-name" style={{ margin: 0, fontWeight: 400, textTransform: 'uppercase' }}>
              <ChalkText>{title}</ChalkText>
            </h3>
            {variant && (
              <p className="mg-chalk mg-product-variant" style={{ margin: 0 }}>
                <ChalkText amount={0.7}>{variant}</ChalkText>
              </p>
            )}
            <ChalkUnderline seed={index} style={{ marginTop: 6 }} />
          </div>
          <p className="mg-chalk mg-product-price" style={{ margin: 0, marginTop: feel.priceTop, transform: `rotate(${-feel.tilt}deg)` }}>
            {soldOut ? <ChalkCircled>sold out</ChalkCircled> : <><ChalkText>{price.text}</ChalkText><span className="mg-product-currency">{price.currency}</span></>}
          </p>
        </div>
        {product.note && (
          <p className="mg-chalk-note mg-product-note" style={{ margin: 0, marginTop: 14, transform: `rotate(${feel.tilt}deg)` }}>
            <ChalkArrow width={38} style={{ marginRight: 8, opacity: 0.6 }} />
            {product.note}
          </p>
        )}
      </ChalkboardPanel>
    </Link>
  )
}

/** Stand-in until the real photo is shot — written on the paper, not faked. */
export function PhotoToCome() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span className="mg-hand on-paper" style={{ fontSize: 32, color: 'var(--mg-muted)', transform: 'rotate(-3deg)' }}>photo coming.</span>
    </div>
  )
}

export function ProductGrid({ products, hero = false, offset = 0 }: { products: MagariProduct[]; hero?: boolean; offset?: number }) {
  return (
    <div className="mg-grid">
      {products.map((p, i) => <ProductDisplay key={p.slug} product={p} index={i + offset} hero={hero} />)}
    </div>
  )
}

/** Everything on one board, like the specials written up by the pass. */
export function SpecialsBoard({ products }: { products: MagariProduct[] }) {
  const { isUS } = useCart()
  return (
    <ChalkboardPanel as="section" className="mg-specials" style={{ transform: 'rotate(-0.3deg)' }}>
      <ChalkHeading onBoard as="h2" tilt={-1.5} className="mg-specials-title" style={{ transformOrigin: 'center' }}>
        TODAY&apos;S MERCH
      </ChalkHeading>
      <p className="mg-chalk-note mg-specials-sub">— all of it, while it lasts —</p>
      <ul className="mg-specials-list">
        {products.map((p, i) => {
          const { title, variant } = splitMagariName(p.name)
          const price = chalkPrice(p, isUS)
          const tilt = [-0.8, 0.5, -0.3, 0.9, -0.6][i % 5]
          const indent = [0, 14, 4, 20, 8][i % 5]
          return (
            <li key={p.slug} style={{ transform: `rotate(${tilt}deg)`, paddingLeft: indent }}>
              <Link href={`${MAGARI_PATH}/products/${p.slug}`} className="mg-specials-item">
                <span className="mg-chalk"><ChalkText>{title}</ChalkText></span>
                {variant && <span className="mg-chalk mg-specials-variant"><ChalkText amount={0.7}>{`— ${variant}`}</ChalkText></span>}
                <span className="mg-specials-dots" aria-hidden />
                <span className="mg-chalk">{p.stock === 0 ? <ChalkText>sold out</ChalkText> : <ChalkText>{price.text}</ChalkText>}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="mg-specials-foot">
        <span className="mg-chalk-note" style={{ display: 'inline-block', transform: 'rotate(-2deg)' }}>ask at the bar, or tap one.</span>
      </div>
    </ChalkboardPanel>
  )
}
