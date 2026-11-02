'use client'

import { useEffect, type ReactNode } from 'react'
import { useCart } from '@/app/cart-context'
import { littleFlowerFontVars } from './fonts'
import { LittleFlowerHeader, LITTLE_FLOWER_PATH } from './Header'
import { LittleFlowerFooter } from './Footer'
import './little-flower.css'

/** Page frame shared by every Little Flower page: fonts, header, footer, cart scope. */
export function LittleFlowerShell({ children, isUS }: { children: ReactNode; isUS?: boolean }) {
  const { setBrandColor, setShopPath, setIsUS } = useCart()
  useEffect(() => {
    setBrandColor('#28475E')
    setShopPath(LITTLE_FLOWER_PATH)
  }, [setBrandColor, setShopPath])
  useEffect(() => { if (isUS !== undefined) setIsUS(isUS) }, [isUS, setIsUS])

  return (
    <div className={`lf-root ${littleFlowerFontVars}`}>
      <LittleFlowerHeader />
      <main>{children}</main>
      <LittleFlowerFooter />
    </div>
  )
}
