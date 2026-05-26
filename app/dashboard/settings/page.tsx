'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Upload } from 'lucide-react'

const FONT_OPTIONS = ['Inter', 'Roboto', 'Playfair Display', 'Oswald', 'Montserrat', 'Dancing Script']

interface Settings {
  name: string
  tagline: string
  description: string
  about: string
  heroHeadline: string
  logo: string
  bannerImage: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  instagram: string
  websiteUrl: string
  address: string
}

const defaults: Settings = {
  name: '', tagline: '', description: '', about: '', heroHeadline: '',
  logo: '', bannerImage: '',
  primaryColor: '#000000', secondaryColor: '#ffffff', accentColor: '#ff6600',
  fontFamily: 'Inter',
  instagram: '', websiteUrl: '', address: '',
}

function UploadBtn({ onUploaded }: { onUploaded: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      onUploaded(url)
    }
    setUploading(false)
    e.target.value = ''
  }

  return (
    <>
      <button type="button" className="db-btn ghost" onClick={() => ref.current?.click()} disabled={uploading} style={{ flexShrink: 0 }}>
        {uploading ? <span className="db-spinner" /> : <Upload size={12} />}
        {uploading ? 'Uploading…' : 'Upload'}
      </button>
      <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleChange} />
    </>
  )
}

export default function SettingsPage() {
  const [form, setForm] = useState<Settings>(defaults)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [slug, setSlug] = useState('')

  useEffect(() => {
    fetch('/api/dashboard/settings').then((r) => r.json()).then((data) => {
      setSlug(data.slug ?? '')
      setForm({
        name:           data.name           ?? '',
        tagline:        data.tagline        ?? '',
        description:    data.description    ?? '',
        about:          data.about          ?? '',
        heroHeadline:   data.heroHeadline   ?? '',
        logo:           data.logo           ?? '',
        bannerImage:    data.bannerImage    ?? '',
        primaryColor:   data.primaryColor   ?? '#000000',
        secondaryColor: data.secondaryColor ?? '#ffffff',
        accentColor:    data.accentColor    ?? '#ff6600',
        fontFamily:     data.fontFamily     ?? 'Inter',
        instagram:      data.instagram      ?? '',
        websiteUrl:     data.websiteUrl     ?? '',
        address:        data.address        ?? '',
      })
      setLoading(false)
    })
  }, [])

  function set(key: keyof Settings, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    await fetch('/api/dashboard/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) {
    return (
      <>
        <div className="db-sec-head">
          <span className="num">[ 04 ]</span>
          <span className="label">Settings</span>
          <span className="spacer" />
          <span>Loading…</span>
        </div>
        <div className="db-content" style={{ maxWidth: 680 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="db-skeleton" style={{ height: 140, marginBottom: 14, borderRadius: 2 }} />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="db-sec-head">
        <span className="num">[ 04 ]</span>
        <span className="label">Settings</span>
        <span className="spacer" />
        {slug && (
          <a href={`/shop/${slug}`} target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--neon)', letterSpacing: '.18em', fontSize: 10 }}>
            View Shop ↗
          </a>
        )}
        <span className="blink" />
      </div>

      <div className="db-content" style={{ maxWidth: 680 }}>

        {/* Brand Identity */}
        <div className="db-section">
          <div className="db-section-head">Brand Identity</div>
          <div className="db-section-body">
            <div className="db-field">
              <label>Store Name</label>
              <p className="db-field-hint">Displayed in the navbar and page title.</p>
              <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your store name" />
            </div>
            <div className="db-field">
              <label>Tagline</label>
              <p className="db-field-hint">Short line under your logo. e.g. "Est. 2019 · London"</p>
              <input type="text" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} placeholder="Short tagline" />
            </div>
            <div className="db-field">
              <label>Hero Headline</label>
              <p className="db-field-hint">Large text on the storefront hero. Leave blank to use store name.</p>
              <input type="text" value={form.heroHeadline} onChange={(e) => set('heroHeadline', e.target.value)} placeholder="Hero headline" />
            </div>
            <div className="db-field">
              <label>Brand Description</label>
              <p className="db-field-hint">One to two sentences shown as an editorial quote.</p>
              <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} placeholder="Short description" />
            </div>
            <div className="db-field">
              <label>About / Brand Story</label>
              <p className="db-field-hint">Longer text shown in the About section. Tell your story.</p>
              <textarea value={form.about} onChange={(e) => set('about', e.target.value)} rows={5} placeholder="Your brand story…" />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="db-section">
          <div className="db-section-head">Media</div>
          <div className="db-section-body">
            <div className="db-field">
              <label>Logo</label>
              <p className="db-field-hint">Transparent PNG recommended.</p>
              <div className="db-img-row">
                <div className="db-field" style={{ marginBottom: 0 }}>
                  <input type="url" value={form.logo} onChange={(e) => set('logo', e.target.value)} placeholder="https://…" />
                </div>
                <UploadBtn onUploaded={(url) => set('logo', url)} />
                {form.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.logo} alt="" style={{ width: 40, height: 40, objectFit: 'contain', border: '1px solid var(--line)', flexShrink: 0 }} />
                )}
              </div>
            </div>
            <div className="db-field">
              <label>Banner / Hero Image</label>
              <p className="db-field-hint">Wide landscape image (1400×600 recommended).</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div className="db-img-row">
                  <div className="db-field" style={{ marginBottom: 0 }}>
                    <input type="url" value={form.bannerImage} onChange={(e) => set('bannerImage', e.target.value)} placeholder="https://…" />
                  </div>
                  <UploadBtn onUploaded={(url) => set('bannerImage', url)} />
                </div>
                {form.bannerImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.bannerImage} alt="" style={{ width: '100%', height: 80, objectFit: 'cover', border: '1px solid var(--line)' }} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Design */}
        <div className="db-section">
          <div className="db-section-head">Design</div>
          <div className="db-section-body">
            <div className="db-field">
              <label>Font Family</label>
              <select value={form.fontFamily} onChange={(e) => set('fontFamily', e.target.value)}>
                {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            <div className="db-color-row">
              {([
                { key: 'primaryColor'   as const, label: 'Primary',   hint: 'Navbar, hero' },
                { key: 'secondaryColor' as const, label: 'Secondary',  hint: 'Page bg' },
                { key: 'accentColor'    as const, label: 'Accent',     hint: 'Highlights' },
              ]).map(({ key, label, hint }) => (
                <div key={key}>
                  <p className="db-color-label">{label}</p>
                  <p style={{ fontSize: 10, color: 'var(--ink-mute)', marginBottom: 8 }}>{hint}</p>
                  <div className="db-color-pick">
                    <input type="color" value={form[key]} onChange={(e) => set(key, e.target.value)} />
                    <span className="hex">{form[key]}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Live preview */}
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 8 }}>Preview</p>
              <div className="db-brand-preview" style={{ backgroundColor: form.primaryColor }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: form.accentColor, color: form.secondaryColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, flexShrink: 0,
                }}>
                  {form.name[0]?.toUpperCase() ?? 'S'}
                </div>
                <div>
                  <p style={{ fontFamily: form.fontFamily, color: form.secondaryColor, fontWeight: 600, fontSize: 14, lineHeight: 1 }}>
                    {form.name || 'Store Name'}
                  </p>
                  {form.tagline && (
                    <p style={{ color: form.secondaryColor, fontSize: 11, opacity: .6, marginTop: 4 }}>{form.tagline}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="db-section">
          <div className="db-section-head">Contact &amp; Social</div>
          <div className="db-section-body">
            <div className="db-field">
              <label>Instagram URL</label>
              <input type="url" value={form.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="https://instagram.com/yourbrand" />
            </div>
            <div className="db-field">
              <label>Website URL</label>
              <input type="url" value={form.websiteUrl} onChange={(e) => set('websiteUrl', e.target.value)} placeholder="https://yourbrand.com" />
            </div>
            <div className="db-field" style={{ marginBottom: 0 }}>
              <label>Address</label>
              <input type="text" value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="City, Country" />
            </div>
          </div>
        </div>

        <button className="db-btn primary" onClick={handleSave} disabled={saving} style={{ marginTop: 8 }}>
          {saved ? <><Check size={13} /> Saved!</> : saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </>
  )
}
