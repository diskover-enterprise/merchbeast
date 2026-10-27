'use client'

import { useEffect, type ReactNode } from 'react'
import { useCart } from '@/app/cart-context'
import { magariFontVars } from './fonts'
import { ChalkFilters } from './Chalk'
import { MagariHeader, MAGARI_PATH } from './Header'
import { MagariFooter } from './Footer'
import './magari.css'

/** Page frame shared by every Magari page: paper, fonts, chalk filters, header, footer, cart scope. */
export function MagariShell({ children, isUS }: { children: ReactNode; isUS?: boolean }) {
  const { setBrandColor, setShopPath, setIsUS } = useCart()
  useEffect(() => {
    setBrandColor('#111111')
    setShopPath(MAGARI_PATH)
  }, [setBrandColor, setShopPath])
  useEffect(() => { if (isUS !== undefined) setIsUS(isUS) }, [isUS, setIsUS])

  return (
    <div className={`mg-root ${magariFontVars}`}>
      <ChalkFilters />
      <MagariHeader />
      <main>{children}</main>
      <MagariFooter />
    </div>
  )
}
