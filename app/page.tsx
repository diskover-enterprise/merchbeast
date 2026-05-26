'use client'

import { useState, useRef } from 'react'
import './merch-homepage.css'

const PRODUCTS = ['Hat', 'Hoodie', 'T-Shirt', 'Crew Neck']
const SIZES    = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const COLORS   = ['Black', 'White', 'Grey', 'Navy', 'Olive', 'Red', 'Natural']

interface OrderItem { id: number; product: string; size: string; color: string; qty: number }

export default function Home() {
  // Order form state
  const [form, setForm] = useState({
    fname: '', lname: '', email: '', phone: '',
    address: '', address2: '', city: '', state: '', zip: '',
    country: 'United Kingdom', notes: '',
  })
  const [items, setItems] = useState<OrderItem[]>([
    { id: 1, product: 'T-Shirt', size: 'M', color: 'Black', qty: 1 },
  ])
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const nextId = useRef(2)

  function setField(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }))
  }
  function addItem() {
    setItems(prev => [...prev, { id: nextId.current++, product: 'T-Shirt', size: 'M', color: 'Black', qty: 1 }])
  }
  function removeItem(id: number) {
    setItems(prev => prev.filter(i => i.id !== id))
  }
  function updateItem(id: number, field: string, value: string | number) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const required = ['fname', 'lname', 'email', 'address', 'city', 'state', 'zip']
    const missing = required.filter(k => !form[k as keyof typeof form].trim())
    setErrors(missing)
    if (missing.length > 0 || items.length === 0) return
    setSubmitted(true)
  }

  const totalUnits = items.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="merch-page">
      <div className="mb-bg-grid" />
      <div className="mb-bg-scratches">
        <svg viewBox="0 0 1600 1200" preserveAspectRatio="none">
          <g stroke="#ffffff" strokeLinecap="round" fill="none">
            <line x1="40"   y1="120" x2="180"  y2="60"  strokeWidth=".6" opacity=".18"/>
            <line x1="220"  y1="380" x2="380"  y2="320" strokeWidth=".5" opacity=".15"/>
            <line x1="900"  y1="80"  x2="1080" y2="40"  strokeWidth=".4" opacity=".2"/>
            <line x1="1300" y1="220" x2="1480" y2="180" strokeWidth=".6" opacity=".15"/>
            <line x1="80"   y1="640" x2="240"  y2="600" strokeWidth=".5" opacity=".18"/>
            <line x1="1200" y1="540" x2="1420" y2="490" strokeWidth=".7" opacity=".14"/>
            <line x1="500"  y1="780" x2="660"  y2="730" strokeWidth=".5" opacity=".18"/>
            <line x1="780"  y1="980" x2="940"  y2="940" strokeWidth=".6" opacity=".15"/>
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
          <a href="#quote">Order</a>
          <a href="#contact">Contact</a>
          <a href="/dashboard/login" className="mb-btn primary" style={{padding:'10px 20px',fontSize:'12px'}}>Owner Login</a>
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
            <img src="/godzilla.svg" alt="Merch Beast Godzilla mascot" />
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

      {/* Order Form */}
      <div className="mb-sec-head" id="quote">
        <span className="num">[ 02 ]</span>
        <span className="title">ORDER FORM</span>
        <span className="spacer" />
        <span>RESPONSE &lt; 24H</span>
        <span className="blink" />
      </div>

      <section className="mb-of-wrap">
        <div className="mb-of">
          {submitted ? (
            <div className="mb-of-success">
              <div className="mb-of-success-icon">✓</div>
              <h2>Order Received!</h2>
              <p>Thanks! We&apos;ll review your order and reach out to confirm details shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off">

              {/* Customer Info */}
              <div className="mb-of-section">
                <div className="mb-of-sec-label">Customer Info</div>
                <div className="mb-of-grid">
                  <div className={`mb-of-field${errors.includes('fname') ? ' error' : ''}`}>
                    <label>First Name <span>*</span></label>
                    <input type="text" value={form.fname} onChange={e => setField('fname', e.target.value)} placeholder="Jane" />
                  </div>
                  <div className={`mb-of-field${errors.includes('lname') ? ' error' : ''}`}>
                    <label>Last Name <span>*</span></label>
                    <input type="text" value={form.lname} onChange={e => setField('lname', e.target.value)} placeholder="Doe" />
                  </div>
                  <div className={`mb-of-field full${errors.includes('email') ? ' error' : ''}`}>
                    <label>Email <span>*</span></label>
                    <input type="email" value={form.email} onChange={e => setField('email', e.target.value)} placeholder="jane@example.com" />
                  </div>
                  <div className="mb-of-field full">
                    <label>Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setField('phone', e.target.value)} placeholder="+44 (0) 7700 000000" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-of-section">
                <div className="mb-of-sec-label">Shipping Address</div>
                <div className="mb-of-grid">
                  <div className={`mb-of-field full${errors.includes('address') ? ' error' : ''}`}>
                    <label>Street Address <span>*</span></label>
                    <input type="text" value={form.address} onChange={e => setField('address', e.target.value)} placeholder="123 Main St" />
                  </div>
                  <div className="mb-of-field full">
                    <label>Apt / Suite / Unit</label>
                    <input type="text" value={form.address2} onChange={e => setField('address2', e.target.value)} placeholder="Apt 4B" />
                  </div>
                  <div className={`mb-of-field${errors.includes('city') ? ' error' : ''}`}>
                    <label>City <span>*</span></label>
                    <input type="text" value={form.city} onChange={e => setField('city', e.target.value)} placeholder="London" />
                  </div>
                  <div className={`mb-of-field${errors.includes('state') ? ' error' : ''}`}>
                    <label>County / State <span>*</span></label>
                    <input type="text" value={form.state} onChange={e => setField('state', e.target.value)} placeholder="Greater London" />
                  </div>
                  <div className={`mb-of-field${errors.includes('zip') ? ' error' : ''}`}>
                    <label>Postcode <span>*</span></label>
                    <input type="text" value={form.zip} onChange={e => setField('zip', e.target.value)} placeholder="EC1A 1BB" />
                  </div>
                  <div className="mb-of-field">
                    <label>Country</label>
                    <select value={form.country} onChange={e => setField('country', e.target.value)}>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="mb-of-section">
                <div className="mb-of-sec-label">Items</div>
                <div className="mb-of-rows">
                  {items.map(item => (
                    <div key={item.id} className="mb-of-item-row">
                      <div className="mb-of-field">
                        <label>Product</label>
                        <select value={item.product} onChange={e => updateItem(item.id, 'product', e.target.value)}>
                          {PRODUCTS.map(p => <option key={p}>{p}</option>)}
                        </select>
                      </div>
                      <div className="mb-of-field">
                        <label>Size</label>
                        <select
                          value={item.product === 'Hat' ? 'One Size' : item.size}
                          disabled={item.product === 'Hat'}
                          onChange={e => updateItem(item.id, 'size', e.target.value)}
                          style={item.product === 'Hat' ? { opacity: .35, cursor: 'not-allowed' } : {}}
                        >
                          {item.product === 'Hat'
                            ? <option>One Size</option>
                            : SIZES.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="mb-of-field">
                        <label>Color</label>
                        <select value={item.color} onChange={e => updateItem(item.id, 'color', e.target.value)}>
                          {COLORS.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="mb-of-field">
                        <label>Qty</label>
                        <input type="number" min={1} value={item.qty} style={{ textAlign: 'center' }}
                          onChange={e => updateItem(item.id, 'qty', Math.max(1, parseInt(e.target.value) || 1))} />
                      </div>
                      <button type="button" className="mb-of-remove" onClick={() => removeItem(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <button type="button" className="mb-of-add-btn" onClick={addItem}>+ Add Another Item</button>
              </div>

              {/* Summary */}
              <div className="mb-of-section">
                <div className="mb-of-sec-label">Order Summary</div>
                <div className="mb-of-summary">
                  <div className="mb-of-sum-row"><span>Unique Items</span><span>{items.length}</span></div>
                  <div className="mb-of-sum-row"><span>Total Units</span><span>{totalUnits}</span></div>
                  <div className="mb-of-sum-row total"><span>Grand Total</span><span>{totalUnits} unit{totalUnits !== 1 ? 's' : ''}</span></div>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-of-section">
                <div className="mb-of-sec-label">Additional Notes</div>
                <div className="mb-of-field">
                  <label>Special Instructions</label>
                  <textarea value={form.notes} rows={3} onChange={e => setField('notes', e.target.value)}
                    placeholder="Any special requests, sizing notes, or delivery instructions…" />
                </div>
              </div>

              {items.length === 0 && (
                <p style={{ color: '#ff5050', fontSize: 12, marginBottom: 12, letterSpacing: '.1em' }}>
                  Please add at least one item.
                </p>
              )}

              <button type="submit" className="mb-btn primary mb-of-submit">
                Submit Order →
              </button>
            </form>
          )}
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
          <a href="/admin/login">Admin</a>
        </div>
      </footer>

      <div className="mb-bg-scan" />
      <div className="mb-bg-vignette" />
    </div>
  )
}
