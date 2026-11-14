import { Fragment } from 'react'

function TickerRun({ words }: { words: string[] }) {
  return (
    <div className="bl-ticker-run">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="bl-ticker-word">{w}</span>
          <span className="bl-ticker-dot">•</span>
        </Fragment>
      ))}
    </div>
  )
}

/**
 * Endless marquee. The word run is drawn twice and the track slides by exactly one run,
 * so the loop never jumps. Each run repeats the words so it covers wide screens.
 */
export function BelliTicker({ words, label = 'What we make' }: { words: string[]; label?: string }) {
  const run = [...words, ...words]
  return (
    <section className="bl-ticker" aria-label={label}>
      <p className="bl-sr">{words.join(', ')}</p>
      <div className="bl-ticker-track" aria-hidden>
        <TickerRun words={run} />
        <TickerRun words={run} />
      </div>
    </section>
  )
}
