'use client'

import type { LittleFlowerProduct } from '@/app/products/little-flower-products-data'
import { hero, collections, heritage, alumnaeFeature, categories, community } from '@/app/products/little-flower-content'
import { LittleFlowerShell } from './little-flower/LittleFlowerShell'
import { Hero } from './little-flower/Hero'
import { CollectionGrid } from './little-flower/Collections'
import { FeaturedProducts } from './little-flower/Products'
import { HeritageSection } from './little-flower/HeritageSection'
import { AlumnaeFeature } from './little-flower/AlumnaeFeature'
import { CategoryGrid } from './little-flower/Categories'
import { CommunitySection } from './little-flower/CommunitySection'

export function LittleFlowerStorefront({ products, isUS = false }: { products: LittleFlowerProduct[]; isUS?: boolean }) {
  const featured = products.filter(p => p.featured)
  const newest = (featured.length ? featured : products).slice(0, 4)

  return (
    <LittleFlowerShell isUS={isUS}>
      <Hero eyebrow={hero.eyebrow} lines={hero.lines} cta={hero.cta} image={hero.image} imageAlt={hero.imageAlt} focus={hero.focus} />
      <CollectionGrid collections={collections.slice(0, 3)} />
      {newest.length > 0 && <FeaturedProducts products={newest} />}
      <HeritageSection {...heritage} />
      <AlumnaeFeature {...alumnaeFeature} />
      <CategoryGrid categories={categories} />
      <CommunitySection {...community} />
    </LittleFlowerShell>
  )
}
