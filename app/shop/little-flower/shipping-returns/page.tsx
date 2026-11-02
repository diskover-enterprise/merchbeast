import type { Metadata } from 'next'
import { LittleFlowerShell } from '@/components/storefront/little-flower/LittleFlowerShell'

export const metadata: Metadata = { title: 'Shipping / Returns — LFA Merch Shop' }

export default function LittleFlowerShippingReturnsPage() {
  return (
    <LittleFlowerShell>
      <div className="lf-wrap">
        <div className="lf-cart" style={{ display: 'grid', gap: 40 }}>
          <h1 className="lf-heading-l" style={{ margin: 0 }}>Shipping &amp; returns</h1>

          <section style={{ display: 'grid', gap: 12 }}>
            <h2 className="lf-eyebrow" style={{ margin: 0 }}>Shipping</h2>
            <p className="lf-body" style={{ margin: 0 }}>$10 flat rate anywhere in Canada. $15 flat rate to the US. Orders ship in 2–5 business days; allow 5–10 business days for delivery.</p>
          </section>

          <section style={{ display: 'grid', gap: 12 }}>
            <h2 className="lf-eyebrow" style={{ margin: 0 }}>Returns</h2>
            <p className="lf-body" style={{ margin: 0 }}>Unworn items in their original condition can be returned within 14 days of delivery. Sale items are final. Return shipping is paid by the customer.</p>
            <p className="lf-body" style={{ margin: 0 }}>To start a return, email <a href="mailto:team@merchbeast.shop">team@merchbeast.shop</a> with your order number.</p>
          </section>
        </div>
      </div>
    </LittleFlowerShell>
  )
}
