'use client'

import type { BelliProduct } from '@/app/products/belli-products-data'
import { hero, ticker, merch, lifestyle } from '@/app/products/belli-content'
import { BelliShell } from './belli/BelliShell'
import { BelliHero } from './belli/Hero'
import { BelliTicker } from './belli/Ticker'
import { BelliMerch } from './belli/Products'
import { BelliLifestyle } from './belli/Lifestyle'

export function BelliStorefront({ products, isUS = false }: { products: BelliProduct[]; isUS?: boolean }) {
  return (
    <BelliShell isUS={isUS}>
      <BelliHero {...hero} />
      <BelliTicker words={ticker} />
      <BelliMerch products={products} {...merch} />
      <BelliLifestyle {...lifestyle} />
    </BelliShell>
  )
}
