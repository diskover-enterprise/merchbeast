export function CommunitySection({ title, audiences, body }: { title: string; audiences: string[]; body: string }) {
  return (
    <section id="community" className="lf-community">
      <div className="lf-wrap lf-community-inner">
        <h2 className="lf-community-title">{title}</h2>
        <p className="lf-micro lf-community-audiences">
          {audiences.map((a, i) => <span key={a}>{i > 0 && <span className="lf-dot" aria-hidden>•</span>}{a}</span>)}
        </p>
        <p className="lf-community-body">{body}</p>
      </div>
    </section>
  )
}
