import Link from 'next/link'

type Category = { title: string; href: string; image: string }

export function CategoryCard({ title, href, image }: Category) {
  return (
    <Link href={href} className="lf-category">
      <div className="lf-category-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="lf-category-label">
        <span>{title}</span>
        <span aria-hidden>→</span>
      </div>
    </Link>
  )
}

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section id="categories" className="lf-section">
      <div className="lf-wrap">
        <div className="lf-section-head">
          <div>
            <p className="lf-micro lf-accent">Shop by category</p>
            <h2 className="lf-h2">Find your piece</h2>
          </div>
        </div>
        <div className="lf-category-grid">
          {categories.map(c => <CategoryCard key={c.title} {...c} />)}
        </div>
      </div>
    </section>
  )
}
