import Link from 'next/link'

export function AlumnaeFeature({ eyebrow, title, body, cta, image, imageAlt }: {
  eyebrow: string; title: string; body: string; cta: { label: string; href: string }; image: string; imageAlt: string
}) {
  return (
    <section className="lf-section">
      <div className="lf-wrap lf-feature">
        <Link href={cta.href} className="lf-feature-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} loading="lazy" />
        </Link>
        <div className="lf-feature-copy">
          <p className="lf-micro lf-accent">{eyebrow}</p>
          <h2 className="lf-h2 lf-italic">{title}</h2>
          <p className="lf-body">{body}</p>
          <Link href={cta.href} className="lf-btn ghost">{cta.label}</Link>
        </div>
      </div>
    </section>
  )
}
