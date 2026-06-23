'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, ToggleLeft, ToggleRight, Tag } from 'lucide-react'

type Shop = { id: string; name: string; slug: string }

type DiscountCode = {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrderAmount: number
  maxUses: number | null
  usedCount: number
  expiresAt: string | null
  active: boolean
  createdAt: string
}

const emptyForm = {
  code: '',
  type: 'percentage' as 'percentage' | 'fixed',
  value: '',
  minOrderAmount: '',
  maxUses: '',
  expiresAt: '',
}

export default function DiscountsPage() {
  const [shops, setShops] = useState<Shop[]>([])
  const [selectedShopId, setSelectedShopId] = useState('')
  const [codes, setCodes] = useState<DiscountCode[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/dashboard/shops').then(r => r.json()).then((data: Shop[]) => {
      setShops(data)
      if (data.length > 0) setSelectedShopId(data[0].id)
    }).catch(() => {})
  }, [])

  async function load(shopId: string) {
    if (!shopId) return
    setLoading(true)
    const res = await fetch(`/api/dashboard/discounts?shopId=${shopId}`)
    if (res.ok) setCodes(await res.json())
    setLoading(false)
  }

  useEffect(() => { if (selectedShopId) load(selectedShopId) }, [selectedShopId])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const res = await fetch('/api/dashboard/discounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shopId: selectedShopId,
        code: form.code,
        type: form.type,
        value: parseFloat(form.value),
        minOrderAmount: form.minOrderAmount ? parseFloat(form.minOrderAmount) : 0,
        maxUses: form.maxUses ? parseInt(form.maxUses) : null,
        expiresAt: form.expiresAt || null,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      setForm(emptyForm)
      setShowForm(false)
      load(selectedShopId)
    } else {
      setError(data.error || 'Failed to create code')
    }
    setSaving(false)
  }

  async function toggleActive(code: DiscountCode) {
    await fetch(`/api/dashboard/discounts/${code.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !code.active }),
    })
    load(selectedShopId)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this discount code?')) return
    await fetch(`/api/dashboard/discounts/${id}`, { method: 'DELETE' })
    load(selectedShopId)
  }

  function formatValue(code: DiscountCode) {
    return code.type === 'percentage'
      ? `${code.value}% off`
      : `$${(code.value / 100).toFixed(2)} off`
  }

  const inputStyle = { width: '100%', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '8px 10px', color: 'var(--ink)', fontSize: 13, boxSizing: 'border-box' as const }

  return (
    <div>
      <div className="db-page-head">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Discount Codes</h1>
          <p style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 4 }}>Create promo codes per shop</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select
            value={selectedShopId}
            onChange={e => setSelectedShopId(e.target.value)}
            style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '6px 12px', color: 'var(--ink)', fontSize: 12 }}
          >
            {shops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <button className="db-btn primary" onClick={() => { setShowForm(true); setError(null) }} disabled={!selectedShopId}>
            <Plus size={13} /> New Code
          </button>
        </div>
      </div>

      {showForm && (
        <div className="db-card" style={{ marginBottom: 24 }}>
          <div className="db-card-head"><span>New Discount Code</span></div>
          <div className="db-card-body">
            <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="db-field">
                <label>Code *</label>
                <input
                  required
                  placeholder="SUMMER20"
                  value={form.code}
                  onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                  style={{ ...inputStyle, textTransform: 'uppercase' }}
                />
              </div>
              <div className="db-field">
                <label>Type *</label>
                <select
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value as 'percentage' | 'fixed' }))}
                  style={inputStyle}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed amount ($)</option>
                </select>
              </div>
              <div className="db-field">
                <label>{form.type === 'percentage' ? 'Discount %' : 'Discount $ amount'} *</label>
                <input
                  required
                  type="number"
                  min={form.type === 'percentage' ? 1 : 0.01}
                  max={form.type === 'percentage' ? 100 : undefined}
                  step={form.type === 'percentage' ? 1 : 0.01}
                  placeholder={form.type === 'percentage' ? '20' : '10.00'}
                  value={form.value}
                  onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              <div className="db-field">
                <label>Minimum order ($)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  value={form.minOrderAmount}
                  onChange={e => setForm(f => ({ ...f, minOrderAmount: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              <div className="db-field">
                <label>Max uses (blank = unlimited)</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  placeholder="Unlimited"
                  value={form.maxUses}
                  onChange={e => setForm(f => ({ ...f, maxUses: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              <div className="db-field">
                <label>Expires (blank = never)</label>
                <input
                  type="date"
                  value={form.expiresAt}
                  onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              {error && <p style={{ gridColumn: '1 / -1', color: '#ef4444', fontSize: 13 }}>{error}</p>}
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
                <button type="submit" className="db-btn primary" disabled={saving}>
                  {saving ? 'Creating...' : 'Create Code'}
                </button>
                <button type="button" className="db-btn ghost" onClick={() => { setShowForm(false); setError(null) }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="db-card">
        {loading ? (
          <div className="db-card-body"><p style={{ color: 'var(--ink-mute)', fontSize: 14 }}>Loading...</p></div>
        ) : codes.length === 0 ? (
          <div className="db-card-body" style={{ textAlign: 'center', padding: '48px 0' }}>
            <Tag size={32} style={{ color: 'var(--ink-mute)', marginBottom: 12 }} />
            <p style={{ color: 'var(--ink-mute)', fontSize: 14 }}>No discount codes yet.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                {['Code', 'Discount', 'Min Order', 'Uses', 'Expires', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {codes.map(code => (
                <tr key={code.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: 'var(--neon)', letterSpacing: '0.1em' }}>{code.code}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, color: 'var(--ink)' }}>{formatValue(code)}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--ink-mute)' }}>
                    {code.minOrderAmount > 0 ? `$${(code.minOrderAmount / 100).toFixed(2)}` : '—'}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--ink-mute)' }}>
                    {code.usedCount}{code.maxUses !== null ? ` / ${code.maxUses}` : ''}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--ink-mute)' }}>
                    {code.expiresAt ? new Date(code.expiresAt).toLocaleDateString() : '—'}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button
                      onClick={() => toggleActive(code)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: code.active ? '#22c55e' : 'var(--ink-mute)', fontSize: 13 }}
                    >
                      {code.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                      {code.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button
                      onClick={() => handleDelete(code.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-mute)', padding: 4 }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
