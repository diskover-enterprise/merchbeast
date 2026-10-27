import type { ReactNode } from 'react'
import { ChalkText } from './Chalk'

/** One big photograph with a few handwritten words beside it. */
export function EditorialImageSection({ id, image, alt, line, children }: { id?: string; image: string; alt: string; line: string; children?: ReactNode }) {
  return (
    <section id={id} className="mg-section">
      <div className="mg-wrap mg-editorial">
        <div className="mg-editorial-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={alt} loading="lazy" />
        </div>
        <div className="mg-editorial-copy">
          <p className="mg-hand on-paper" style={{ margin: 0, transform: 'rotate(-1.5deg)', transformOrigin: 'left center' }}>
            <ChalkText>{line}</ChalkText>
          </p>
          {children}
        </div>
      </div>
    </section>
  )
}
