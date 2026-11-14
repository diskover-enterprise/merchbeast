import Link from 'next/link'
import { footer } from '@/app/products/belli-content'
import { BelliLogo } from './Header'

export function BelliFooter() {
  return (
    <footer className="bl-footer">
      <div className="bl-wrap">
        <div className="bl-footer-top">
          <BelliLogo className="bl-footer-logo" />
          <ul className="bl-footer-links">
            {footer.links.map(l => (
              <li key={l.label}>
                {l.href.startsWith('/')
                  ? <Link href={l.href}>{l.label}</Link>
                  : <a href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{l.label}</a>}
              </li>
            ))}
          </ul>
        </div>
        <div className="bl-footer-bottom">
          <span>Belli Goods · Vancouver, BC · <a href={footer.restaurant.href} target="_blank" rel="noreferrer">{footer.restaurant.label}</a></span>
          <span>For customer inquiries, contact team@merchbeast.shop</span>
        </div>
      </div>
    </footer>
  )
}
