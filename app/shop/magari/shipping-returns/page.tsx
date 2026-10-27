import type { Metadata } from 'next'
import { MagariShell } from '@/components/storefront/magari/MagariShell'
import { ChalkHeading } from '@/components/storefront/magari/Chalk'

export const metadata: Metadata = { title: 'Shipping / Returns — Magari by Oca' }

export default function MagariShippingReturnsPage() {
  return (
    <MagariShell>
      <div className="mg-wrap">
        <div className="mg-cart" style={{ display: 'grid', gap: 40 }}>
          <ChalkHeading as="h1" size="l" tilt={-1.5}>shipping / returns.</ChalkHeading>

          <section style={{ display: 'grid', gap: 12 }}>
            <h2 className="mg-label" style={{ margin: 0, color: 'var(--mg-ink)' }}>Shipping</h2>
            <p className="mg-body" style={{ margin: 0 }}>$10 flat rate anywhere in Canada. $15 flat rate to the US. Orders ship in 2–5 business days; allow 5–10 business days for delivery.</p>
          </section>

          <section style={{ display: 'grid', gap: 12 }}>
            <h2 className="mg-label" style={{ margin: 0, color: 'var(--mg-ink)' }}>Returns</h2>
            <p className="mg-body" style={{ margin: 0 }}>Unworn items in their original condition can be returned within 14 days of delivery. Sale items are final. Return shipping is paid by the customer.</p>
            <p className="mg-body" style={{ margin: 0 }}>To start a return, email <a href="mailto:team@merchbeast.shop">team@merchbeast.shop</a> with your order number.</p>
          </section>
        </div>
      </div>
    </MagariShell>
  )
}
