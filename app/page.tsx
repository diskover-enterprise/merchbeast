'use client'

import './merch-homepage.css'

export default function Home() {
  return (
    <div className="mb-page">

      {/* ── Nav ── */}
      <header className="mb-nav">
        <a href="/" className="mb-logo">
          <span className="mb-logo-dot" />
          MERCH&nbsp;BEAST
        </a>
        <nav className="mb-nav-links">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#how">Process</a>
          <a href="/products">Shop</a>
          <a href="#cta" className="mb-btn-nav">Get A Quote</a>
        </nav>
      </header>

      {/* ── Marquee ── */}
      <div className="mb-ticker" aria-hidden="true">
        <div className="mb-ticker-track">
          {[1, 2].map(i => (
            <span key={i}>
              ★ CUSTOM APPAREL &nbsp;·&nbsp; EMBROIDERY &nbsp;·&nbsp; SCREEN PRINT &nbsp;·&nbsp; BRANDED MERCH &nbsp;·&nbsp;
              TEAM GEAR &nbsp;·&nbsp; EVENTS &nbsp;·&nbsp; NO MINIMUMS &nbsp;·&nbsp; FAST TURNAROUND &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="mb-hero" id="home">
        <div className="mb-hero-bg" />
        <div className="mb-hero-inner">
          <div className="mb-hero-copy">
            <p className="mb-eyebrow">Custom Merch Studio</p>
            <h1 className="mb-headline">
              MERCH THAT<br />
              <span className="mb-headline-accent">HITS DIFFERENT.</span>
            </h1>
            <p className="mb-subheadline">
              Custom apparel, embroidery, and branded merch built for
              businesses, teams, events, and brands that refuse to blend in.
            </p>
            <div className="mb-hero-ctas">
              <a href="#cta" className="mb-btn mb-btn-primary">Start Your Project</a>
              <a href="#work" className="mb-btn mb-btn-ghost">View Our Work</a>
            </div>
            <div className="mb-hero-stats">
              <div className="mb-stat">
                <span className="mb-stat-num">2,000+</span>
                <span className="mb-stat-label">Orders Completed</span>
              </div>
              <div className="mb-stat-divider" />
              <div className="mb-stat">
                <span className="mb-stat-num">14 Day</span>
                <span className="mb-stat-label">Avg. Turnaround</span>
              </div>
              <div className="mb-stat-divider" />
              <div className="mb-stat">
                <span className="mb-stat-num">No MOQ</span>
                <span className="mb-stat-label">From 1 Piece Up</span>
              </div>
            </div>
          </div>
          <div className="mb-hero-visual">
            <div className="mb-hero-img-wrap">
              <img
                src="/images/hero-merch.jpg"
                alt="Premium custom merch"
                className="mb-hero-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div className="mb-hero-img-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Feed The Beast ── */}
      <section className="mb-services" id="services">
        <div className="mb-container">
          <div className="mb-section-head">
            <div className="mb-section-label">What We Do</div>
            <h2 className="mb-section-title">Feed The Beast.</h2>
            <p className="mb-section-sub">
              From premium embroidery to bold apparel printing, we help bring
              your brand to life with merch people actually want to wear.
            </p>
          </div>
          <div className="mb-cards">

            <article className="mb-card">
              <div className="mb-card-img-wrap">
                <img src="/images/service-printing.jpg" alt="Apparel Printing" className="mb-card-img" style={{objectPosition:'50% 40%'}} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <div className="mb-card-img-overlay" />
              </div>
              <div className="mb-card-body">
                <div className="mb-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="13" rx="1" />
                    <path d="M8 21h8M12 17v4" />
                    <circle cx="18.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <h3 className="mb-card-title">Apparel Printing</h3>
                <p className="mb-card-text">Bold designs. Premium quality. Made to stand out.</p>
              </div>
            </article>

            <article className="mb-card">
              <div className="mb-card-img-wrap">
                <img src="/images/service-embroidery.jpg" alt="Embroidery" className="mb-card-img" style={{objectPosition:'50% 40%'}} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <div className="mb-card-img-overlay" />
              </div>
              <div className="mb-card-body">
                <div className="mb-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M3 12 L9 6 L15 18 L21 12" />
                    <circle cx="9" cy="6" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="15" cy="18" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <h3 className="mb-card-title">Embroidery</h3>
                <p className="mb-card-text">Clean stitching. Premium finishes. Built to last.</p>
              </div>
            </article>

            <article className="mb-card">
              <div className="mb-card-img-wrap">
                <img src="/images/service-team.jpg" alt="Team & Business Merch" className="mb-card-img" style={{objectPosition:'50% 30%'}} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <div className="mb-card-img-overlay" />
              </div>
              <div className="mb-card-body">
                <div className="mb-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="9" cy="7" r="2.5" />
                    <circle cx="17" cy="7" r="2.5" />
                    <path d="M3 21v-1a6 6 0 0112 0v1" />
                    <path d="M15 14a6 6 0 016 6v1" />
                  </svg>
                </div>
                <h3 className="mb-card-title">Team &amp; Business Merch</h3>
                <p className="mb-card-text">Custom gear for teams, businesses, and organizations.</p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ── Featured Work ── */}
      <section className="mb-work" id="work">
        <div className="mb-container">
          <div className="mb-section-head mb-section-head--center">
            <div className="mb-section-label">Portfolio</div>
            <h2 className="mb-section-title">Beast Work</h2>
            <p className="mb-section-sub mb-section-sub--center">
              A look at custom merch created for businesses, teams, events, and brands.
            </p>
          </div>
          <div className="mb-grid">
            {[
              { label: 'Embroidered Hats',  src: '/images/work-hats.jpg',    pos: '50% 30%' },
              { label: 'Custom Hoodies',    src: '/images/work-hoodies.jpg', pos: '50% 40%' },
              { label: 'Team Jerseys',      src: '/images/work-jerseys.jpg', pos: '50% 30%' },
              { label: 'Business Apparel',  src: '/images/work-business.jpg', pos: '50% 30%' },
              { label: 'Event Merch',       src: '/images/work-events.jpg',  pos: '50% 25%' },
              { label: 'Promo Products',    src: '/images/work-promo.jpg',   pos: '50% 30%' },
              { label: 'Custom Tees',       src: '/images/work-automotive.jpg', pos: '50% 20%' },
              { label: 'Streetwear',        src: '/images/work-streetwear.jpg', pos: '50% 20%' },
              { label: 'Embroidered Caps',  src: '/images/work-cap.jpg',        pos: '50% 30%' },
              { label: 'Event Tees',        src: '/images/work-airport.jpg',    pos: '50% 20%' },
            ].map(({ label, src, pos }) => (
              <div className="mb-grid-item" key={label}>
                <img src={src} alt={label} className="mb-grid-img" style={{objectPosition: pos}} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <div className="mb-grid-overlay" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="mb-how" id="how">
        <div className="mb-container">
          <div className="mb-section-head mb-section-head--center">
            <div className="mb-section-label">Process</div>
            <h2 className="mb-section-title">How The Beast Works</h2>
          </div>
          <div className="mb-steps">

            <div className="mb-step">
              <div className="mb-step-num">01</div>
              <div className="mb-step-connector" aria-hidden="true" />
              <div className="mb-step-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <h3 className="mb-step-title">Send Your Logo</h3>
              <p className="mb-step-text">Upload your logo, artwork, or idea.</p>
            </div>

            <div className="mb-step">
              <div className="mb-step-num">02</div>
              <div className="mb-step-connector" aria-hidden="true" />
              <div className="mb-step-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <polyline points="8 21 12 17 16 21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="mb-step-title">Approve Your Mockup</h3>
              <p className="mb-step-text">We create a clean preview before production.</p>
            </div>

            <div className="mb-step">
              <div className="mb-step-num">03</div>
              <div className="mb-step-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="mb-step-title">Get Your Merch</h3>
              <p className="mb-step-text">Your custom merch is produced and ready to wear.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mb-cta" id="cta">
        <div className="mb-cta-inner">
          <div className="mb-cta-glow" aria-hidden="true" />
          <p className="mb-cta-label">Let&apos;s Build Something</p>
          <h2 className="mb-cta-title">Ready To Build?</h2>
          <p className="mb-cta-text">
            Tell us what you need and we&apos;ll help turn your idea into
            high-quality custom merch.
          </p>
          <a href="mailto:team@merchbeast.shop" className="mb-btn mb-btn-primary mb-btn-lg">
            Get A Quote
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mb-footer">
        <div className="mb-footer-brand">
          <span className="mb-logo-dot" />
          MERCH BEAST
        </div>
        <p className="mb-footer-copy">© 2026 Merch Beast. All rights reserved.</p>
        <nav className="mb-footer-links">
          <a href="mailto:team@merchbeast.shop">team@merchbeast.shop</a>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="/admin/login">Admin</a>
        </nav>
      </footer>

    </div>
  )
}
