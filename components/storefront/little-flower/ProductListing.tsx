import Link from 'next/link'
import type { LittleFlowerProduct } from '@/app/products/little-flower-products-data'
import { categoryFilters } from '@/app/products/little-flower-content'
import { ProductGrid } from './Products'

/** Category chips over a product grid. Filtering happens on the server from ?category=. */
export function ProductListing({ products, basePath, category, title, eyebrow }: {
  products: LittleFlowerProduct[]; basePath: string; category?: string; title: string; eyebrow: string
}) {
  const filter = categoryFilters.find(f => f.key === category)
  const shown = filter ? products.filter(p => p.category && filter.includes.includes(p.category)) : products
  // Only offer chips that would show something here
  const chips = categoryFilters.filter(f => products.some(p => p.category && f.includes.includes(p.category)))

  return (
    <section className="lf-section lf-listing">
      <div className="lf-wrap">
        <div className="lf-section-head">
          <div>
            <p className="lf-micro lf-accent">{eyebrow}</p>
            <h2 className="lf-h2">{filter ? filter.label : title}</h2>
          </div>
          <span className="lf-label">{shown.length} {shown.length === 1 ? 'piece' : 'pieces'}</span>
        </div>
        <nav className="lf-chips" aria-label="Filter by category">
          <Link href={basePath} className={!filter ? 'active' : undefined} scroll={false}>All</Link>
          {chips.map(f => (
            <Link key={f.key} href={`${basePath}?category=${f.key}`} className={filter?.key === f.key ? 'active' : undefined} scroll={false}>{f.label}</Link>
          ))}
        </nav>
        {shown.length > 0 ? <ProductGrid products={shown} /> : <p className="lf-body lf-muted">Nothing here yet.</p>}
      </div>
    </section>
  )
}
