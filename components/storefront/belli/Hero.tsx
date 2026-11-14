export function BelliHero({ lines, sub, image, imageAlt }: { lines: string[]; sub: string[]; image: string; imageAlt: string }) {
  return (
    <section className="bl-hero">
      <div className="bl-hero-copy">
        <h1 className="bl-hero-title">
          {lines.map(l => <span key={l}>{l}</span>)}
        </h1>
        <p className="bl-hero-sub">{sub.map(s => <span key={s}>{s}</span>)}</p>
      </div>
      <div className="bl-hero-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={imageAlt} fetchPriority="high" />
      </div>
    </section>
  )
}
