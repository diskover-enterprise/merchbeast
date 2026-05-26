'use client'

import { useState, useRef } from 'react'
import './merch-homepage.css'

const ITEMS = [
  { key: 'tee', label: 'T-Shirt', icon: <svg viewBox="0 0 32 32"><path d="M6 8 L11 4 L21 4 L26 8 L29 12 L25 15 L24 14 L24 28 L8 28 L8 14 L7 15 L3 12 Z" strokeLinejoin="round"/></svg> },
  { key: 'hoodie', label: 'Hoodie', icon: <svg viewBox="0 0 32 32"><path d="M8 10 L12 4 L20 4 L24 10 L29 13 L26 18 L25 17 L25 28 L7 28 L7 17 L6 18 L3 13 Z" strokeLinejoin="round"/><path d="M12 4 Q16 8 20 4" /></svg> },
  { key: 'cap', label: 'Cap', icon: <svg viewBox="0 0 32 32"><path d="M4 20 Q4 12 16 12 Q28 12 28 20 L28 22 L4 22 Z" strokeLinejoin="round"/><path d="M16 12 L16 8" /><circle cx="16" cy="7" r="1.4"/></svg> },
  { key: 'patch', label: 'Patch', icon: <svg viewBox="0 0 32 32"><path d="M16 4 L26 10 L26 22 L16 28 L6 22 L6 10 Z" strokeLinejoin="round"/><circle cx="16" cy="16" r="4"/></svg> },
  { key: 'tote', label: 'Tote', icon: <svg viewBox="0 0 32 32"><path d="M8 12 L8 28 L24 28 L24 12 Z" strokeLinejoin="round"/><path d="M12 12 Q12 6 16 6 Q20 6 20 12"/></svg> },
  { key: 'polo', label: 'Polo', icon: <svg viewBox="0 0 32 32"><path d="M6 8 L11 4 L13 8 L16 11 L19 8 L21 4 L26 8 L29 12 L25 15 L24 14 L24 28 L8 28 L8 14 L7 15 L3 12 Z" strokeLinejoin="round"/></svg> },
  { key: 'jacket', label: 'Jacket', icon: <svg viewBox="0 0 32 32"><path d="M6 8 L12 4 L16 8 L20 4 L26 8 L28 14 L25 16 L25 28 L7 28 L7 16 L4 14 Z" strokeLinejoin="round"/><path d="M16 8 L16 28"/></svg> },
  { key: 'other', label: 'Other', icon: <svg viewBox="0 0 32 32"><circle cx="9" cy="16" r="2"/><circle cx="16" cy="16" r="2"/><circle cx="23" cy="16" r="2"/></svg> },
]

export default function Home() {
  const [activeItem, setActiveItem] = useState('tee')
  const [fileNames, setFileNames] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFiles(files: FileList | null) {
    if (!files) return
    setFileNames(Array.from(files).map(f => f.name))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2400)
  }

  return (
    <div className="merch-page">
      <div className="mb-bg-grid" />
      <div className="mb-bg-scratches">
        <svg viewBox="0 0 1600 1200" preserveAspectRatio="none">
          <g stroke="#ffffff" strokeLinecap="round" fill="none">
            <line x1="40" y1="120" x2="180" y2="60" strokeWidth=".6" opacity=".18"/>
            <line x1="220" y1="380" x2="380" y2="320" strokeWidth=".5" opacity=".15"/>
            <line x1="900" y1="80" x2="1080" y2="40" strokeWidth=".4" opacity=".2"/>
            <line x1="1300" y1="220" x2="1480" y2="180" strokeWidth=".6" opacity=".15"/>
            <line x1="80" y1="640" x2="240" y2="600" strokeWidth=".5" opacity=".18"/>
            <line x1="1200" y1="540" x2="1420" y2="490" strokeWidth=".7" opacity=".14"/>
            <line x1="500" y1="780" x2="660" y2="730" strokeWidth=".5" opacity=".18"/>
            <line x1="780" y1="980" x2="940" y2="940" strokeWidth=".6" opacity=".15"/>
          </g>
        </svg>
      </div>

      {/* Nav */}
      <header className="mb-top">
        <div className="mb-brand">
          <span className="dot" />
          MERCH&nbsp;BEAST
        </div>
        <nav className="mb-nav">
          <a href="#services">Services</a>
          <a href="#quote">Get a Quote</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Marquee */}
      <div className="mb-marquee">
        <div className="mb-marquee-track">
          <span><b>★</b>EMBROIDERY<b>★</b>SCREEN PRINT<b>★</b>DTG<b>★</b>PATCHES<b>★</b>HEAT TRANSFER<b>★</b>NO MINIMUMS<b>★</b>WORLDWIDE SHIPPING<b>★</b>TURNING IDEAS INTO MONSTERS<b>★</b></span>
          <span><b>★</b>EMBROIDERY<b>★</b>SCREEN PRINT<b>★</b>DTG<b>★</b>PATCHES<b>★</b>HEAT TRANSFER<b>★</b>NO MINIMUMS<b>★</b>WORLDWIDE SHIPPING<b>★</b>TURNING IDEAS INTO MONSTERS<b>★</b></span>
        </div>
      </div>

      {/* Hero */}
      <section className="mb-hero">
        <div className="mb-hero-copy">
          <div className="mb-hero-eyebrow">PLAYER 1 // PRESS START</div>
          <h1 className="mb-wordmark">
            <span className="solid">Merch</span>
            <span className="neon">Beast</span>
          </h1>
          <p className="mb-tagline"><em>Turning ideas into monsters.</em> Custom apparel &amp; merch built loud — embroidered, printed, and shipped fast from our workshop.</p>
          <div className="mb-hero-ctas">
            <a href="#quote" className="mb-btn primary">Get a Quote →</a>
            <a href="#services" className="mb-btn ghost">See Services</a>
          </div>
          <div className="mb-hero-stats">
            <div><b>14&nbsp;day</b>Avg. turnaround</div>
            <div><b>2,400+</b>Beasts shipped</div>
            <div><b>No&nbsp;MOQ</b>From 1 piece up</div>
          </div>
        </div>

        <div className="mb-mascot-wrap">
          <div className="mb-mascot-frame" />
          <div className="mb-mascot-corner-br" />
          <div className="mb-mascot-corner-br2" />
          <div className="mb-mascot-label">MASCOT.LIVE</div>
          <div className="mb-mascot-readout">
            <span>FPS <b>60</b></span>
            <span>SYS <b>OK</b></span>
            <span>HP <b>∞</b></span>
          </div>
          <div className="mb-mascot">
            <img src="/gorilla.svg" alt="Merch Beast gorilla mascot" />
          </div>
        </div>

        {/* Claw gashes */}
        <div className="mb-gashes">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="none">
            <path className="mb-gash mb-gash-1" style={{'--len':'1700','--final':'.92'} as React.CSSProperties} d="M -40 120 C 400 200, 900 360, 1640 700"/>
            <path className="mb-gash mb-gash-2" style={{'--len':'1700','--final':'.8','animationDelay':'.08s'} as React.CSSProperties} d="M -40 200 C 380 280, 900 440, 1640 780"/>
            <path className="mb-gash mb-gash-3" style={{'--len':'1700','--final':'.55','animationDelay':'.16s'} as React.CSSProperties} d="M -40 280 C 380 340, 880 500, 1640 860"/>
            <path className="mb-gash mb-gash-4" style={{'--len':'900','--final':'.85','animationDelay':'.5s'} as React.CSSProperties} d="M 1640 80 C 1200 180, 900 220, 500 360"/>
            <path className="mb-gash mb-gash-3" style={{'--len':'900','--final':'.5','animationDelay':'.58s'} as React.CSSProperties} d="M 1640 150 C 1180 240, 880 300, 480 440"/>
          </svg>
        </div>
      </section>

      {/* Services */}
      <div className="mb-sec-head">
        <span className="num">[ 01 ]</span>
        <span className="title">SERVICES</span>
        <span className="spacer" />
        <span>EMBROIDERY · PRINT</span>
        <span className="blink" />
      </div>

      <section className="mb-services" id="services">
        <div className="mb-svc-intro">
          <h2>Two ways<br/>to bring<br/><span className="accent">the beast.</span></h2>
          <p>Whether you need a heavyweight stitched patch or a vivid full-colour print, our workshop runs both lines under one roof. Sample first, ship fast, no surprises on quantity or quality.</p>
        </div>
        <div className="mb-svc-grid">
          <article className="mb-svc">
            <div className="mb-svc-head">
              <span className="mb-svc-tag">// 01 — STITCH</span>
              <div className="mb-svc-icon">
                <svg viewBox="0 0 24 24"><path d="M3 12 L9 6 L15 18 L21 12" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="18" r="1.4"/></svg>
              </div>
            </div>
            <h3>Embroidery</h3>
            <p>Heavy-thread stitching with up to 15 colour heads. Built for caps, polos, jackets, and patches that need to outlive the wearer.</p>
          </article>
          <article className="mb-svc">
            <div className="mb-svc-head">
              <span className="mb-svc-tag">// 02 — INK</span>
              <div className="mb-svc-icon">
                <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="6" rx="1"/><rect x="7" y="10" width="10" height="5"/><path d="M8 15 L8 21 L16 21 L16 15" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <h3>Print</h3>
            <p>Screen print, DTG and DTF under one roof. Punchy ink lay-down on tees, hoodies, totes — gradient-friendly, washes like iron.</p>
          </article>
        </div>
      </section>

      {/* Quote form */}
      <div className="mb-sec-head" id="quote">
        <span className="num">[ 02 ]</span>
        <span className="title">GET A QUOTE</span>
        <span className="spacer" />
        <span>RESPONSE &lt; 24H</span>
        <span className="blink" />
      </div>

      <section className="mb-quote">
        <div className="mb-quote-inner">
          <div className="mb-quote-head">
            <h2>Feed the<br/><span>beast.</span></h2>
            <p>Drop your artwork and a few details. We&apos;ll come back within 24 hours with a price, a turnaround, and a sample-ready mock — no obligation, no pressure.</p>
            <ul className="mb-quote-checks">
              <li>Free artwork review &amp; digitising</li>
              <li>Sample before bulk run</li>
              <li>UK-made, worldwide shipping</li>
            </ul>
            <div className="mb-quote-meta">
              <div>EMAIL<b>hello@merchbeast.co</b></div>
              <div>WORKSHOP<b>Mon–Fri 09–18</b></div>
            </div>
          </div>

          <form className="mb-qf" autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-row-2">
              <div className="mb-field">
                <label>Name <span className="req">*</span></label>
                <input type="text" name="name" placeholder="Your full name" required />
              </div>
              <div className="mb-field">
                <label>Email <span className="req">*</span></label>
                <input type="email" name="email" placeholder="you@somewhere.com" required />
              </div>
            </div>
            <div className="mb-field">
              <label>Choose your item <span className="req">*</span></label>
              <div className="mb-items">
                {ITEMS.map(item => (
                  <button key={item.key} type="button"
                    className={`mb-item-pick${activeItem === item.key ? ' active' : ''}`}
                    onClick={() => setActiveItem(item.key)}>
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              <input type="hidden" name="item" value={activeItem} readOnly />
            </div>
            <div className="mb-field">
              <label>Upload artwork <span className="req">*</span></label>
              <label className={`mb-dropzone${dragging ? ' drag' : ''}`}
                onDragEnter={e => { e.preventDefault(); setDragging(true) }}
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={e => { e.preventDefault(); setDragging(false) }}
                onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 16 L12 4 M7 9 L12 4 L17 9" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 16 L4 20 L20 20 L20 16" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="hint">Drop artwork or <u>browse files</u></div>
                <div className="sub">PNG · JPG · PDF · AI · SVG · up to 50&nbsp;MB</div>
                <input ref={fileRef} type="file" multiple accept=".png,.jpg,.jpeg,.pdf,.ai,.svg"
                  onChange={e => handleFiles(e.target.files)} />
                {fileNames.length > 0 && <div className="files">✓ {fileNames.join(', ')}</div>}
              </label>
            </div>
            <div className="mb-qf-submit">
              <div className="small">REPLY WITHIN <b>24 HOURS</b></div>
              <button type="submit" className="mb-btn primary"
                style={submitted ? {pointerEvents:'none'} : {}}>
                {submitted ? 'Sent ✓' : 'Unleash It →'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="mb-footer" id="contact">
        <div className="left">
          <span className="mb-brand"><span className="dot" /> MERCH&nbsp;BEAST</span>
          <span>© 2026 — ALL RIGHTS FERAL</span>
        </div>
        <div className="right">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="mailto:hello@merchbeast.co">hello@merchbeast.co</a>
        </div>
      </footer>

      <div className="mb-bg-scan" />
      <div className="mb-bg-vignette" />
    </div>
  )
}
