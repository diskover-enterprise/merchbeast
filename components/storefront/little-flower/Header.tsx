'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { LF_PATH, LF_LOGO_HORIZONTAL, announcement, navLinks } from '@/app/products/little-flower-content'
import { AnnouncementBar } from './AnnouncementBar'

export const LITTLE_FLOWER_PATH = LF_PATH

/** The official horizontal LFA lockup. Its white ground is multiplied away so it sits on cream. */
export function LittleFlowerLogo({ className = '' }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={LF_LOGO_HORIZONTAL} alt="Little Flower Academy" className={`lf-logo ${className}`} />
}

const icon = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, 'aria-hidden': true } as const

export function LittleFlowerHeader() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {announcement && <AnnouncementBar message={announcement} />}
      <header className="lf-header">
        <div className="lf-wrap lf-header-inner">
          <button className="lf-icon-btn lf-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
            <svg {...icon}><path d="M3 7h18M3 12h18M3 17h18" /></svg>
          </button>

          <Link href={LF_PATH} className="lf-header-logo" aria-label="LFA Merch Shop home">
            <LittleFlowerLogo />
          </Link>

          <nav className="lf-nav" aria-label="Shop">
            {navLinks.map(l => <Link key={l.label} href={l.href}>{l.label}</Link>)}
          </nav>

          <div className="lf-header-actions">
            <button className="lf-icon-btn lf-hide-sm" aria-label="Search">
              <svg {...icon}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
            </button>
            <Link href="/account/login" className="lf-icon-btn lf-hide-sm" aria-label="Account">
              <svg {...icon}><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20.5c1.2-3.6 4-5.3 7.5-5.3s6.3 1.7 7.5 5.3" /></svg>
            </Link>
            <Link href={`${LF_PATH}/cart`} className="lf-icon-btn lf-bag" aria-label={`Bag, ${count} items`}>
              <svg {...icon}><path d="M5 8h14l-1 12.5H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
              {count > 0 && <span className="lf-bag-count">{count}</span>}
            </Link>
          </div>
        </div>
      </header>

      <div className={`lf-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="lf-drawer-head">
          <LittleFlowerLogo />
          <button className="lf-icon-btn" onClick={() => setOpen(false)} aria-label="Close menu" tabIndex={open ? 0 : -1}>
            <svg {...icon}><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <nav className="lf-drawer-nav" aria-label="Shop">
          {navLinks.map(l => <Link key={l.label} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{l.label}</Link>)}
        </nav>
        <div className="lf-drawer-foot">
          <Link href="/account/login" tabIndex={open ? 0 : -1}>Account</Link>
          <span>Vancouver, BC · Est. 1927</span>
        </div>
      </div>
    </>
  )
}
