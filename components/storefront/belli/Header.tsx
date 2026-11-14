'use client'

import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { BELLI_PATH, BELLI_LOGO_LIGHT, BELLI_LOGO_DARK, nav } from '@/app/products/belli-content'

/** Official Belli script: light for charcoal grounds, dark for cream. */
export function BelliLogo({ variant = 'light', className = '' }: { variant?: 'light' | 'dark'; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={variant === 'light' ? BELLI_LOGO_LIGHT : BELLI_LOGO_DARK} alt="Belli" className={`bl-logo ${className}`} />
}

export function BelliHeader() {
  const { count } = useCart()
  return (
    <header className="bl-header">
      <div className="bl-wrap bl-header-inner">
        <div className="bl-header-left">
          <Link href={BELLI_PATH} aria-label="Belli Goods home"><BelliLogo /></Link>
          <nav className="bl-nav" aria-label="Shop">
            {nav.map(l => <Link key={l.label} href={l.href}>{l.label}</Link>)}
          </nav>
        </div>
        <Link href={`${BELLI_PATH}/cart`} className="bl-bag" aria-label={`Bag, ${count} ${count === 1 ? 'item' : 'items'}`}>
          <svg viewBox="0 0 32 36" width="46" height="52" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
            <path d="M3 11h26v23H3z" /><path d="M10 11V8a6 6 0 0 1 12 0v3" />
          </svg>
          {count > 0 && <span className="bl-bag-count">{count}</span>}
        </Link>
      </div>
    </header>
  )
}
