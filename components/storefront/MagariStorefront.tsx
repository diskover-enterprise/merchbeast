'use client'

import type { MagariProduct } from '@/app/products/magari-products-data'
import { MagariShell } from './magari/MagariShell'
import { MagariLogo } from './magari/Header'
import { ChalkText } from './magari/Chalk'
import { ProductGrid, SpecialsBoard } from './magari/Products'
import { EditorialImageSection } from './magari/EditorialImageSection'

const RESTAURANT_IMAGE = 'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793125205/merchbeast/magari-restaurant-bar.jpg'

export function MagariStorefront({ products, isUS = false, heroImage }: { products: MagariProduct[]; isUS?: boolean; heroImage?: string | null }) {
  const hats = products.filter(p => p.category === 'hat')
  const rest = products.filter(p => p.category !== 'hat')

  return (
    <MagariShell isUS={isUS}>
      {/* Masthead: the logo does the talking */}
      <section className="mg-masthead">
        <div className="mg-wrap">
          <MagariLogo className="mg-masthead-logo" />
          <p className="mg-masthead-line"><ChalkText>merch by magari.</ChalkText></p>
        </div>
      </section>

      <div id="shop" />

      {products.length > 0 && (
        <section className="mg-section">
          <div className="mg-wrap">
            <SpecialsBoard products={products} />
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="mg-section">
          <div className="mg-wrap" style={{ display: 'grid', gap: 'var(--mg-6)' }}>
            {hats.length > 0 && <ProductGrid products={hats} hero />}
            {rest.length > 0 && <ProductGrid products={rest} offset={hats.length} />}
          </div>
        </section>
      )}

      <EditorialImageSection id="about" image={heroImage || RESTAURANT_IMAGE} alt="Behind the bar at Magari on Commercial Drive" line="1260 Commercial Drive.">
        <p className="mg-body mg-muted">
          Something to wear between dinners at Magari.
        </p>
      </EditorialImageSection>
    </MagariShell>
  )
}
