'use client'

import { useEffect, type ReactNode } from 'react'
import { useCart } from '@/app/cart-context'
import { BELLI_PATH } from '@/app/products/belli-content'
import { belliFontVars } from './fonts'
import { BelliHeader } from './Header'
import { BelliFooter } from './Footer'
import './belli.css'

/** Page frame shared by every Belli page: fonts, header, footer, cart scope. */
export function BelliShell({ children, isUS }: { children: ReactNode; isUS?: boolean }) {
  const { setBrandColor, setShopPath, setIsUS } = useCart()
  useEffect(() => {
    setBrandColor('#282828')
    setShopPath(BELLI_PATH)
  }, [setBrandColor, setShopPath])
  useEffect(() => { if (isUS !== undefined) setIsUS(isUS) }, [isUS, setIsUS])

  return (
    <div className={`bl-root ${belliFontVars}`}>
      <BelliHeader />
      <main>{children}</main>
      <BelliFooter />
    </div>
  )
}
