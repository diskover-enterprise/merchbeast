import Link from 'next/link'
import { collectionPath, type CollectionInfo } from '@/app/products/little-flower-content'

export function CollectionCard({ collection, index }: { collection: CollectionInfo; index: number }) {
  return (
    <Link href={collectionPath(collection.key)} className="lf-collection">
      <div className="lf-collection-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={collection.tile} alt={collection.title} loading="lazy" />
      </div>
      <div className="lf-collection-copy">
        <span className="lf-micro lf-muted">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="lf-collection-title">{collection.title}</h3>
        <p className="lf-collection-line">{collection.line}</p>
        <span className="lf-arrow-link">Explore <span aria-hidden>→</span></span>
      </div>
    </Link>
  )
}

export function CollectionGrid({ collections, heading }: { collections: CollectionInfo[]; heading?: string }) {
  return (
    <section id="collections" className={`lf-section${heading ? '' : ' lf-section-tight'}`}>
      <div className="lf-wrap">
        {heading && (
          <div className="lf-section-head">
            <div>
              <p className="lf-micro lf-accent">Collections</p>
              <h2 className="lf-h2">{heading}</h2>
            </div>
          </div>
        )}
        <div className="lf-collection-grid">
          {collections.map((c, i) => <CollectionCard key={c.key} collection={c} index={i} />)}
        </div>
      </div>
    </section>
  )
}
