import Link from 'next/link'
import { LF_LOGO_VERTICAL } from '@/app/products/little-flower-content'

export type HeroTone = 'maroon' | 'cream' | 'grey' | 'ink'

/** Brand panel beside a lifestyle photograph, after the LFA collection boards. */
export function Hero({
  eyebrow, lines, body, cta, image, imageAlt, focus, tone = 'maroon', as: Title = 'h1', compact = false,
}: {
  eyebrow: string
  lines: string[]
  body?: string
  cta?: { label: string; href: string }
  image: string
  imageAlt: string
  focus?: string
  tone?: HeroTone
  as?: 'h1' | 'h2'
  compact?: boolean
}) {
  const dark = tone === 'maroon' || tone === 'ink'
  return (
    <section className={`lf-hero tone-${tone}${compact ? ' compact' : ''}`}>
      <div className="lf-hero-panel">
        {/* Official LFA logo, one-colour so it reads on the panel */}
        <span className="lf-hero-logo" style={{ ['--lf-mark' as string]: `url(${LF_LOGO_VERTICAL})` }} role="img" aria-label="Little Flower Academy" />
        <div className="lf-hero-copy">
          <p className="lf-micro">{eyebrow}</p>
          <Title className="lf-hero-title">
            {lines.map((l, i) => <span key={l} className={i === 1 ? 'lf-italic' : undefined}>{l}</span>)}
          </Title>
          {body && <p className="lf-hero-body">{body}</p>}
          {cta && <Link href={cta.href} className={`lf-btn${dark ? ' outline-light' : ''}`}>{cta.label}</Link>}
        </div>
        <p className="lf-micro lf-hero-meta">Vancouver, BC · Est. 1927</p>
      </div>
      <div className="lf-hero-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={imageAlt} style={focus ? { objectPosition: focus } : undefined} />
      </div>
    </section>
  )
}
