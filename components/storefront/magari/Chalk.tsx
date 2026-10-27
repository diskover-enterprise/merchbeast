import { Fragment, type CSSProperties, type ElementType, type ReactNode } from 'react'

// Deterministic 0..1 noise so server and client render the same wobble
function noise(seed: string, i: number) {
  let h = 2166136261
  const s = `${seed}:${i}`
  for (let k = 0; k < s.length; k++) h = Math.imul(h ^ s.charCodeAt(k), 16777619)
  return ((h >>> 0) % 1000) / 1000
}

/** SVG filters that roughen glyph edges like chalk on a board (or marker on paper). Render once per page. */
export function ChalkFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden focusable="false">
      <defs>
        <filter id="mg-chalk-rough" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feComponentTransfer in="grain" result="holes">
            <feFuncA type="discrete" tableValues="1 1 1 1 1 1 0.55 1" />
          </feComponentTransfer>
          <feComposite in="rough" in2="holes" operator="in" />
        </filter>
        <filter id="mg-ink-rough" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

/**
 * Text written by hand: each letter gets a small, stable shift in baseline,
 * rotation and size. `amount` scales the wobble (keep it ≤ 1 for legibility).
 */
export function ChalkText({ children, seed, amount = 1 }: { children: string; seed?: string; amount?: number }) {
  const key = seed ?? children
  let i = 0
  return (
    <span aria-label={children} role="text">
      {children.split(' ').map((word, w) => (
        <Fragment key={w}>
        {w > 0 && ' '}
        <span aria-hidden style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {Array.from(word).map(ch => {
            const n = i++
            const rot = (noise(key, n) - 0.5) * 5 * amount
            const y = (noise(key, n + 97) - 0.5) * 3 * amount
            const scale = 1 + (noise(key, n + 211) - 0.5) * 0.1 * amount
            return (
              <span key={n} className="mg-chalk-char" style={{ transform: `translateY(${y.toFixed(2)}px) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})` }}>
                {ch}
              </span>
            )
          })}
        </span>
        </Fragment>
      ))}
    </span>
  )
}

/** Handwritten heading — chalk on a board, or marker-ink on paper. */
export function ChalkHeading({
  children, as: Tag = 'h2', size = 'l', onBoard = false, tilt = -1, className = '', style,
}: {
  children: string
  as?: ElementType
  size?: 'xl' | 'l' | 'm'
  onBoard?: boolean
  tilt?: number
  className?: string
  style?: CSSProperties
}) {
  const cls = onBoard ? 'mg-chalk' : 'mg-hand on-paper'
  return (
    <Tag className={`${cls} mg-heading-${size} ${className}`} style={{ margin: 0, fontWeight: 400, transform: `rotate(${tilt}deg)`, transformOrigin: 'left center', ...style }}>
      <ChalkText>{children}</ChalkText>
    </Tag>
  )
}

/** A piece of blackboard. Pads, tilts and sizes vary per use so boards don't look stamped out. */
export function ChalkboardPanel({
  children, className = '', style, as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: ElementType
}) {
  return <Tag className={`mg-board ${className}`} style={style}>{children}</Tag>
}

/** Hand-drawn chalk underline. */
export function ChalkUnderline({ width = 180, seed = 1, className = '', style }: { width?: number | string; seed?: number; className?: string; style?: CSSProperties }) {
  const d = seed % 2
    ? 'M2 9 C 40 4, 90 7, 130 5 S 190 6, 198 3'
    : 'M3 6 C 50 9, 100 3, 150 6 S 185 8, 197 5'
  return (
    <svg className={`mg-chalk-mark mg-underline ${className}`} viewBox="0 0 200 12" preserveAspectRatio="none" style={{ width, height: 12, ...style }} aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

/** Loose chalk arrow, pointing right. */
export function ChalkArrow({ width = 64, style }: { width?: number; style?: CSSProperties }) {
  return (
    <svg className="mg-chalk-mark" viewBox="0 0 70 30" style={{ width, height: 'auto', display: 'inline-block', verticalAlign: 'middle', ...style }} aria-hidden>
      <path d="M3 20 C 20 14, 38 13, 62 15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M50 6 L 64 15 L 51 25" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Chalk loop drawn around a short word ("new", "sold out"). */
export function ChalkCircled({ children, tilt = -4 }: { children: string; tilt?: number }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', padding: '6px 14px', transform: `rotate(${tilt}deg)` }}>
      <svg className="mg-chalk-mark" viewBox="0 0 120 50" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden>
        <path d="M14 10 C 40 2, 96 3, 112 16 C 124 30, 92 46, 56 46 C 20 46, 2 36, 6 22 C 9 13, 24 8, 40 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className="mg-chalk-note" style={{ color: 'var(--mg-chalk)', fontSize: 26 }}>{children}</span>
    </span>
  )
}
