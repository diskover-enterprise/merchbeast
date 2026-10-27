import Link from 'next/link'

export function MagariFooter() {
  return (
    <footer className="mg-footer">
      <div className="mg-wrap">
        <div className="mg-footer-grid">
          <div>
            <p style={{ margin: 0, fontWeight: 500 }}>Magari by Oca</p>
            <p style={{ margin: 0 }} className="mg-muted">1260 Commercial Drive<br />Vancouver, BC</p>
          </div>
          <ul className="mg-footer-list">
            <li><a href="https://www.instagram.com/magari_by_oca" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://www.magaribyoca.com" target="_blank" rel="noreferrer">Restaurant</a></li>
          </ul>
          <ul className="mg-footer-list">
            <li><Link href="/shop/magari/shipping-returns">Shipping / Returns</Link></li>
            <li><a href="mailto:team@merchbeast.shop">Questions</a></li>
          </ul>
        </div>
        <p className="mg-footer-small">For customer inquiries, contact team@merchbeast.shop</p>
      </div>
    </footer>
  )
}
