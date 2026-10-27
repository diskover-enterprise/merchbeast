'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'

export const MAGARI_PATH = '/shop/magari'
export const MAGARI_LOGO = 'https://res.cloudinary.com/dwjvblzu9/image/upload/v1793121772/merchbeast/magari-logo.png'

/** The Magari wordmark. Falls back to written text if the logo file isn't there yet. */
export function MagariLogo({ className, alt = 'Magari by Oca' }: { className?: string; alt?: string }) {
  const [missing, setMissing] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  // onError can fire before hydration, so also check an image that already failed
  useEffect(() => { const img = ref.current; if (img?.complete && img.naturalWidth === 0) setMissing(true) }, [])
  if (missing) return <span className={`mg-logo-text ${className ?? ''}`}>MAGARI</span>
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={MAGARI_LOGO} alt={alt} className={className} onError={() => setMissing(true)} />
}

export function MagariHeader() {
  const { count } = useCart()
  return (
    <header className="mg-header">
      <div className="mg-wrap mg-header-inner">
        <Link href={MAGARI_PATH} className="mg-header-logo" aria-label="Magari by Oca — home">
          <MagariLogo />
        </Link>
        <nav className="mg-nav" aria-label="Shop">
          <Link href={`${MAGARI_PATH}#shop`}>Shop</Link>
          <Link href={`${MAGARI_PATH}#about`}>About</Link>
          <Link href={`${MAGARI_PATH}/cart`}>Bag ({count})</Link>
        </nav>
      </div>
    </header>
  )
}
