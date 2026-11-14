import Link from 'next/link'

export function BelliLifestyle({ lines, body, cta, link, images }: {
  lines: string[]
  body: string
  cta: { label: string; href: string }
  link: { label: string; href: string }
  images: { src: string; alt: string }[]
}) {
  const [main, second] = images
  return (
    <section className="bl-lifestyle">
      <div className="bl-lifestyle-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={main.src} alt={main.alt} loading="lazy" />
      </div>
      <div className="bl-lifestyle-copy">
        <h2 className="bl-display bl-lifestyle-title">{lines.map(l => <span key={l}>{l}</span>)}</h2>
        <p className="bl-lifestyle-body">{body}</p>
        <div className="bl-lifestyle-actions">
          <Link href={cta.href} className="bl-btn light">{cta.label}</Link>
          <a href={link.href} target="_blank" rel="noreferrer" className="bl-textlink">{link.label} →</a>
        </div>
        {second && (
          <div className="bl-lifestyle-inset">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={second.src} alt={second.alt} loading="lazy" />
          </div>
        )}
      </div>
    </section>
  )
}
