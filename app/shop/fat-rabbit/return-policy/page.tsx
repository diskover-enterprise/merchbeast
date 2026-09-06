import Link from 'next/link'

export default function ReturnPolicyPage() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: '#E8E4DC', color: '#1a1a1a', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800&display=swap');
        .frp-nav { height: 72px; background: rgba(232,228,220,0.97); border-bottom: 1px solid rgba(197,68,42,0.15); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .frp-back { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #999; text-decoration: none; }
        .frp-back:hover { color: #C5442A; }
        .frp-logo { height: 48px; object-fit: contain; }
        .frp-wrap { max-width: 720px; margin: 0 auto; padding: 60px 40px 100px; }
        .frp-h1 { font-family: 'Barlow Condensed', sans-serif; font-size: 48px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #C5442A; margin-bottom: 40px; }
        .frp-section { margin-bottom: 36px; }
        .frp-h2 { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #999; margin-bottom: 12px; }
        .frp-p { font-size: 15px; line-height: 1.8; color: #444; }
        .frp-a { color: #C5442A; }
        .frp-footer { border-top: 1px solid rgba(197,68,42,0.15); padding: 28px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .frp-footer-link { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(197,68,42,0.4); text-decoration: none; }
        .frp-footer-link:hover { color: #C5442A; }
        @media (max-width: 640px) { .frp-nav { padding: 0 16px; } .frp-wrap { padding: 40px 20px 80px; } .frp-h1 { font-size: 36px; } .frp-footer { padding: 24px 16px; } }
      `}</style>

      <nav className="frp-nav">
        <Link href="/shop/fat-rabbit" className="frp-back">← Back to Shop</Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://res.cloudinary.com/dwjvblzu9/image/upload/v1783059789/scrol-to-top_uitiui.png" alt="Fat Rabbit" className="frp-logo" />
        <span style={{ width: 80 }} />
      </nav>

      <div className="frp-wrap">
        <h1 className="frp-h1">Return Policy</h1>

        <div className="frp-section">
          <h2 className="frp-h2">Returns</h2>
          <p className="frp-p">
            We accept returns within 14 days of delivery for unused items in their original condition with tags attached.
            Sale items and items marked as final sale are not eligible for return.
          </p>
        </div>

        <div className="frp-section">
          <h2 className="frp-h2">How to Return</h2>
          <p className="frp-p">
            To initiate a return, email us at <a href="mailto:bee@fat-rabbit.ca" className="frp-a">bee@fat-rabbit.ca</a> with
            your order number and reason for return. We will provide return instructions within 2 business days.
            Return shipping costs are the responsibility of the customer unless the item arrived damaged or incorrect.
          </p>
        </div>

        <div className="frp-section">
          <h2 className="frp-h2">Refunds</h2>
          <p className="frp-p">
            Once we receive and inspect your return, we will process your refund within 5–7 business days.
            Refunds are issued to the original payment method.
          </p>
        </div>

        <div className="frp-section">
          <h2 className="frp-h2">Shipping</h2>
          <p className="frp-p">
            We ship within Canada only. A flat rate of $9.95 CAD applies to all orders.
            Orders are processed and shipped within 2–5 business days.
            Please allow 5–10 business days for delivery after shipping.
          </p>
        </div>

        <div className="frp-section">
          <h2 className="frp-h2">Questions?</h2>
          <p className="frp-p">
            Reach us anytime at <a href="mailto:bee@fat-rabbit.ca" className="frp-a">bee@fat-rabbit.ca</a>.
          </p>
        </div>
      </div>

      <footer className="frp-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://res.cloudinary.com/dwjvblzu9/image/upload/v1783059789/scrol-to-top_uitiui.png" alt="Fat Rabbit" style={{ height: 36, objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/shop/fat-rabbit/return-policy" className="frp-footer-link">Return Policy</Link>
          <a href="mailto:bee@fat-rabbit.ca" className="frp-footer-link">Contact Us</a>
        </div>
        <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(197,68,42,0.25)' }}>Powered by Merch Beast</span>
      </footer>
    </div>
  )
}
