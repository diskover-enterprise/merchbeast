'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export default function SettingsPage() {
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' })
  const [passwordMsg, setPasswordMsg] = useState('')
  const [passwordSaving, setPasswordSaving] = useState(false)

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
