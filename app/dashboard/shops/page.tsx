'use client'

import { useEffect, useRef, useState } from 'react'
import { Upload, X, Check, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

type Shop = {
  id: string
  name: string
  slug: string
  ownerEmail: string
  tagline: string | null
  bannerImage: string | null
  logo: string | null
  primaryColor: string
  accentColor: string
  heroHeadline: string | null
  about: string | null
  instagram: string | null
  websiteUrl: string | null
}

function ImageUploadField({
  label, value, onChange
}: { label: string; value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(files: FileList | null) {
    if (!files || !files[0]) return
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', files[0])
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    setUploading(false)
    if (!res.ok) { setError('Upload failed'); return }
    const { url } = await res.json()
    onChange(url)
  }

  return (
    <div className="db-field">
      <label>{label}</label>
      {value && (
        <div style={{ position: 'relative', marginBottom: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--line)' }} />
          <button type="button" onClick={() => onChange('')} style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.65)', border: 'none', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
            <X size={11} />
          </button>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste URL or upload…"
          style={{ flex: 1, background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '6px 10px', color: 'var(--ink)', fontSize: 12 }}
        />
        <button type="button" className="db-btn ghost" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? <span className="db-spinner" /> : <Upload size={12} />}
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files)} />
      {error && <p style={{ color: '#ff5050', fontSize: 11, marginTop: 4 }}>{error}</p>}
    </div>
  )
}

function ShopEditor({ shop, onSaved }: { shop: Shop; onSaved: (updated: Shop) => void }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(shop)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function set(key: keyof Shop, val: string) {
    setForm(f => ({ ...f, [key]: val }))
    setMsg('')
  }

  async function save() {
    setSaving(true)
    setMsg('')
    const res = await fetch(`/api/admin/shops/${shop.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      const updated = await res.json()
      setMsg('✓ Saved')
      onSaved({ ...form, ...updated })
    } else {
      setMsg('Failed to save.')
    }
  }

  const shopUrl = `/shop/${shop.slug}`

  return (
    <div className="db-card" style={{ marginBottom: 12 }}>
      {/* Header row */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', cursor: 'pointer', userSelect: 'none' }}
      >
        {form.bannerImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.bannerImage} alt={form.name} style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid var(--line)', flexShrink: 0 }} />
        ) : (
          <div style={{ width: 56, height: 40, background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 4, flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{form.name}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{form.ownerEmail}</div>
        </div>
        <a href={shopUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color: 'var(--ink-mute)', marginRight: 8 }}>
          <ExternalLink size={13} />
        </a>
        {open ? <ChevronUp size={14} color="var(--ink-mute)" /> : <ChevronDown size={14} color="var(--ink-mute)" />}
      </div>

      {/* Expanded editor */}
      {open && (
        <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--line)' }}>
          <div style={{ paddingTop: 20 }}>
            <ImageUploadField label="Hero Image" value={form.bannerImage || ''} onChange={v => set('bannerImage', v)} />
            <ImageUploadField label="Logo" value={form.logo || ''} onChange={v => set('logo', v)} />

            <div className="db-field-row">
              <div className="db-field">
                <label>Shop Name</label>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div className="db-field">
                <label>Tagline</label>
                <input type="text" value={form.tagline || ''} onChange={e => set('tagline', e.target.value)} placeholder="Short tagline…" />
              </div>
            </div>

            <div className="db-field">
              <label>Hero Headline</label>
              <input type="text" value={form.heroHeadline || ''} onChange={e => set('heroHeadline', e.target.value)} placeholder="Big text on the hero…" />
            </div>

            <div className="db-field">
              <label>About</label>
              <textarea value={form.about || ''} onChange={e => set('about', e.target.value)} rows={3} placeholder="About this shop…" />
            </div>

            <div className="db-field-row">
              <div className="db-field">
                <label>Primary Color</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={form.primaryColor} onChange={e => set('primaryColor', e.target.value)} style={{ width: 40, height: 36, padding: 2, border: '1px solid var(--line)', borderRadius: 4, background: 'var(--bg-2)', cursor: 'pointer' }} />
                  <input type="text" value={form.primaryColor} onChange={e => set('primaryColor', e.target.value)} style={{ flex: 1 }} />
                </div>
              </div>
              <div className="db-field">
                <label>Accent Color</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={form.accentColor} onChange={e => set('accentColor', e.target.value)} style={{ width: 40, height: 36, padding: 2, border: '1px solid var(--line)', borderRadius: 4, background: 'var(--bg-2)', cursor: 'pointer' }} />
                  <input type="text" value={form.accentColor} onChange={e => set('accentColor', e.target.value)} style={{ flex: 1 }} />
                </div>
              </div>
            </div>

            <div className="db-field-row">
              <div className="db-field">
                <label>Instagram</label>
                <input type="text" value={form.instagram || ''} onChange={e => set('instagram', e.target.value)} placeholder="@handle" />
              </div>
              <div className="db-field">
                <label>Website</label>
                <input type="text" value={form.websiteUrl || ''} onChange={e => set('websiteUrl', e.target.value)} placeholder="https://…" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <button className="db-btn primary" onClick={save} disabled={saving}>
                <Check size={13} /> {saving ? 'Saving…' : 'Save Changes'}
              </button>
              {msg && <span style={{ fontSize: 12, color: msg.startsWith('✓') ? 'var(--neon)' : '#ff5050' }}>{msg}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/shops')
      .then(r => r.json())
      .then(data => { setShops(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function handleSaved(updated: Shop) {
    setShops(shops.map(s => s.id === updated.id ? updated : s))
  }

  if (loading) return (
    <>
      <div className="db-sec-head"><span className="num">[ 05 ]</span><span className="label">Shops</span><span className="spacer" /><span>Loading…</span></div>
      <div className="db-content">{[1,2,3].map(i => <div key={i} className="db-skeleton" style={{ height: 72, marginBottom: 10 }} />)}</div>
    </>
  )

  return (
    <>
      <div className="db-sec-head">
        <span className="num">[ 05 ]</span>
        <span className="label">Shops</span>
        <span className="spacer" />
        <span>{shops.length}&nbsp;shops</span>
        <span className="blink" />
      </div>

      <div className="db-content">
        {shops.map(shop => (
          <ShopEditor key={shop.id} shop={shop} onSaved={handleSaved} />
        ))}
      </div>
    </>
  )
}
