import Link from 'next/link'
import { LF_LOGO_VERTICAL } from '@/app/products/little-flower-content'

export function HeritageSection({ eyebrow, title, lines, cta }: { eyebrow: string; title: string; lines: string[]; cta: { label: string; href: string } }) {
  return (
    <section className="lf-heritage">
      {/* The official rosette, one-colour and very faint: a texture rather than a logo placement */}
      <span className="lf-heritage-mark" style={{ ['--lf-mark' as string]: `url(${LF_LOGO_VERTICAL})` }} aria-hidden />
      <div className="lf-wrap lf-heritage-inner">
        <span className="lf-heritage-year" aria-hidden>1927</span>
        <div className="lf-heritage-copy">
          <p className="lf-micro">{eyebrow}</p>
          <h2 className="lf-heritage-title">{title}</h2>
          <div className="lf-heritage-rule" />
          <p className="lf-micro lf-heritage-lines">{lines.map(l => <span key={l}>{l}</span>)}</p>
          <Link href={cta.href} className="lf-btn outline-light">{cta.label}</Link>
        </div>
      </div>
    </section>
  )
}
