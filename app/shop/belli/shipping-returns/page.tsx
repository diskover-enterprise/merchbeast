import type { Metadata } from 'next'
import { BelliShell } from '@/components/storefront/belli/BelliShell'

export const metadata: Metadata = { title: 'Shipping & Returns — Belli Goods' }

export default function BelliShippingReturnsPage() {
  return (
    <BelliShell>
      <div className="bl-wrap">
        <div className="bl-page">
          <section id="shipping" className="bl-info">
            <h2 className="bl-display">Shipping</h2>
            <p>$10 flat rate anywhere in Canada. $15 flat rate to the US. Orders ship from Vancouver in 2–5 business days; allow 5–10 business days for delivery.</p>
          </section>
          <section id="returns" className="bl-info">
            <h2 className="bl-display">Returns</h2>
            <p>Unworn items in their original condition can be returned within 14 days of delivery. Sale items are final. Return shipping is paid by the customer.</p>
            <p>To start a return, email <a href="mailto:team@merchbeast.shop">team@merchbeast.shop</a> with your order number.</p>
          </section>
        </div>
      </div>
    </BelliShell>
  )
}
