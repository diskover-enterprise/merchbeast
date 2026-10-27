'use client'

import type { MagariProduct } from '@/app/products/magari-products-data'
import { MagariShell } from './magari/MagariShell'
import { MagariLogo } from './magari/Header'
import { ChalkHeading, ChalkText } from './magari/Chalk'
import { ProductGrid, SpecialsBoard } from './magari/Products'
import { EditorialImageSection } from './magari/EditorialImageSection'

// TODO(magari): swap for a photo from inside the restaurant
const RESTAURANT_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=80'

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

      {hats.length > 0 && (
        <section className="mg-section">
          <div className="mg-wrap">
            <div className="mg-section-head">
              <ChalkHeading size="xl" tilt={-2}>hats.</ChalkHeading>
            </div>
            <ProductGrid products={hats} hero />
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mg-section">
          <div className="mg-wrap">
            <div className="mg-section-head" style={{ paddingLeft: '8%' }}>
              <ChalkHeading size="l" tilt={1}>wear it outside.</ChalkHeading>
            </div>
            <ProductGrid products={rest} offset={hats.length} />
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="mg-section">
          <div className="mg-wrap">
            <SpecialsBoard products={products} />
          </div>
        </section>
      )}

      <EditorialImageSection id="about" image={heroImage || RESTAURANT_IMAGE} alt="Inside Magari on Commercial Drive" line="1260 Commercial Drive.">
        <p className="mg-body mg-muted">
          Magari is the little sibling of Oca Pastificio. These are the things we wear behind the bar, made in small runs and sold here and at the restaurant.
        </p>
      </EditorialImageSection>
    </MagariShell>
  )
}
