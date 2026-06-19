'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Upload, X } from 'lucide-react'

type Shop = { id: string; name: string; slug: string; bannerImage: string | null }

export default function SettingsPage() {
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' })
  const [passwordMsg, setPasswordMsg] = useState('')
  const [passwordSaving, setPasswordSaving] = useState(false)

  const [shops, setShops] = useState<Shop[]>([])
  const [selectedShopId, setSelectedShopId] = useState('')
  const [heroImage, setHeroImage] = useState('')
  const [heroUploading, setHeroUploading] = useState(false)
  const [heroMsg, setHeroMsg] = useState('')
  const heroInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/shops').then(r => r.json()).then((data: Shop[]) => {
      setShops(data)
      if (data.length > 0) {
        setSelectedShopId(data[0].id)
        setHeroImage(data[0].bannerImage || '')
      }
    }).catch(() => {})
  }, [])

  function handleShopChange(id: string) {
    setSelectedShopId(id)
    const shop = shops.find(s => s.id === id)
    setHeroImage(shop?.bannerImage || '')
    setHeroMsg('')
  }

  async function handleHeroUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    setHeroUploading(true)
    setHeroMsg('')
    const fd = new FormData()
    fd.append('file', files[0])
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    setHeroUploading(false)
    if (!res.ok) { setHeroMsg('Upload failed.'); return }
    const { url } = await res.json()
    setHeroImage(url)
  }

  async function handleHeroSave() {
    if (!selectedShopId) return
    setHeroMsg('')
    const res = await fetch(`/api/admin/shops/${selectedShopId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bannerImage: heroImage }),
    })
    if (res.ok) {
      setHeroMsg('✓ Hero image saved.')
      setShops(shops.map(s => s.id === selectedShopId ? { ...s, bannerImage: heroImage } : s))
    } else {
      setHeroMsg('Failed to save.')
    }
  }

  async function handlePasswordSave() {
    if (!passwordForm.next) { setPasswordMsg('Enter a new password.'); return }
    if (passwordForm.next !== passwordForm.confirm) { setPasswordMsg('Passwords do not match.'); return }
    setPasswordSaving(true)
    setPasswordMsg('')
    // Verify current password first
    const verify = await fetch('/api/dashboard/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordForm.current }),
    })
    if (!verify.ok) {
      setPasswordMsg('Current password is incorrect.')
      setPasswordSaving(false)
      return
    }
    const res = await fetch('/api/dashboard/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword: passwordForm.next }),
    })
    setPasswordSaving(false)
    if (res.ok) {
      setPasswordMsg('✓ Password updated.')
      setPasswordForm({ current: '', next: '', confirm: '' })
    } else {
      setPasswordMsg('Failed to update password.')
    }
  }

  return (
    <>
      <div className="db-sec-head">
        <span className="num">[ 04 ]</span>
        <span className="label">Settings</span>
        <span className="spacer" />
        <span className="blink" />
      </div>

      <div className="db-content" style={{ maxWidth: 560 }}>

        {/* Store Info — read only for now */}
        <div className="db-section">
          <div className="db-section-head">Store</div>
          <div className="db-section-body">
            <div className="db-field">
              <label>Store Name</label>
              <input type="text" defaultValue="Merch Beast" disabled style={{ opacity: 0.5 }} />
            </div>
            <div className="db-field">
              <label>Live Domain</label>
              <input type="text" defaultValue="www.merchbeast.shop" disabled style={{ opacity: 0.5 }} />
            </div>
            <div className="db-field" style={{ marginBottom: 0 }}>
              <label>Stripe Mode</label>
              <input type="text" defaultValue="Live (sk_live_…)" disabled style={{ opacity: 0.5 }} />
            </div>
            <p style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 10 }}>
              To update Stripe keys or the domain, go to your Vercel project → Environment Variables.
            </p>
          </div>
        </div>

        {/* Shop Hero Images */}
        <div className="db-section">
          <div className="db-section-head">Shop Hero Image</div>
          <div className="db-section-body">
            <div className="db-field">
              <label>Shop</label>
              <select value={selectedShopId} onChange={e => handleShopChange(e.target.value)} style={{ width: '100%', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '8px 10px', color: 'var(--ink)', fontSize: 13 }}>
                {shops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            {heroImage && (
              <div style={{ position: 'relative', marginBottom: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroImage} alt="Hero" style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--line)' }} />
                <button onClick={() => setHeroImage('')} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                  <X size={12} />
                </button>
              </div>
            )}
            <div className="db-field">
              <label>Image URL</label>
              <input type="text" value={heroImage} onChange={e => setHeroImage(e.target.value)} placeholder="https://..." />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
              <button className="db-btn ghost" onClick={() => heroInputRef.current?.click()} disabled={heroUploading}>
                {heroUploading ? <span className="db-spinner" /> : <Upload size={13} />}
                {heroUploading ? 'Uploading…' : 'Upload Image'}
              </button>
              <input ref={heroInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleHeroUpload(e.target.files)} />
            </div>
            {heroMsg && <p style={{ fontSize: 12, marginBottom: 10, color: heroMsg.startsWith('✓') ? 'var(--neon)' : '#ff5050' }}>{heroMsg}</p>}
            <button className="db-btn primary" onClick={handleHeroSave} disabled={!heroImage}>
              <Check size={13} /> Save Hero Image
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="db-section">
          <div className="db-section-head">Dashboard Password</div>
          <div className="db-section-body">
            <div className="db-field">
              <label>Current Password</label>
              <input
                type="password"
                value={passwordForm.current}
                onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="db-field">
              <label>New Password</label>
              <input
                type="password"
                value={passwordForm.next}
                onChange={e => setPasswordForm({ ...passwordForm, next: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="db-field" style={{ marginBottom: 0 }}>
              <label>Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            {passwordMsg && (
              <p style={{ fontSize: 12, marginTop: 10, color: passwordMsg.startsWith('✓') ? 'var(--neon)' : '#ff5050' }}>
                {passwordMsg}
              </p>
            )}
            <button
              className="db-btn primary"
              onClick={handlePasswordSave}
              disabled={passwordSaving}
              style={{ marginTop: 16 }}
            >
              <Check size={13} /> {passwordSaving ? 'Saving…' : 'Update Password'}
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
