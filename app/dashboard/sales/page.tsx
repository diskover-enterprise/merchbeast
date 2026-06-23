'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, ToggleLeft, ToggleRight, Percent } from 'lucide-react'

type DBProduct = { id: string; slug: string; name: string }

type ShopSale = {
  id: string
  name: string
  type: 'percentage' | 'fixed'
  value: number
  scope: 'cart' | 'products'
  productSlugs: string[]
  active: boolean
  createdAt: string
}

const emptyForm = {
  name: '',
  type: 'percentage' as 'percentage' | 'fixed',
  value: '',
  scope: 'cart' as 'cart' | 'products',
  productSlugs: [] as string[],
}

export default function SalesPage() {
  const [sales, setSales] = useState<ShopSale[]>([])
  const [products, setProducts] = useState<DBProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const [salesRes, shopRes] = await Promise.all([
      fetch('/api/dashboard/sales'),
      fetch('/api/dashboard/settings'),
    ])
    if (salesRes.ok) setSales(await salesRes.json())
    if (shopRes.ok) {
      const shop = await shopRes.json()
      if (shop?.id) {
        const prodsRes = await fetch(`/api/merch-products?shopId=${shop.id}`)
        if (prodsRes.ok) setProducts(await prodsRes.json())
      }
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const res = await fetch('/api/dashboard/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        type: form.type,
        value: parseFloat(form.value),
        scope: form.scope,
        productSlugs: form.scope === 'products' ? form.productSlugs : [],
      }),
    })
    const data = await res.json()
    if (res.ok) {
      setForm(emptyForm)
      setShowForm(false)
      load()
    } else {
      setError(data.error || 'Failed to create sale')
    }
    setSaving(false)
  }

  async function toggleActive(sale: ShopSale) {
    await fetch(`/api/dashboard/sales/${sale.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !sale.active }),
    })
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this sale?')) return
    await fetch(`/api/dashboard/sales/${id}`, { method: 'DELETE' })
    load()
  }

  function toggleProduct(slug: string) {
    setForm(f => ({
      ...f,
      productSlugs: f.productSlugs.includes(slug)
        ? f.productSlugs.filter(s => s !== slug)
        : [...f.productSlugs, slug],
    }))
  }

  function formatSale(sale: ShopSale) {
    const discount = sale.type === 'percentage' ? `${sale.value}% off` : `$${(sale.value / 100).toFixed(2)} off`
    const scope = sale.scope === 'cart' ? 'entire cart' : `${sale.productSlugs.length} product(s)`
    return `${discount} — ${scope}`
  }

  const inputStyle = { width: '100%', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '8px 10px', color: 'var(--ink)', fontSize: 13, boxSizing: 'border-box' as const }

  return (
    <div>
      <div className="db-page-head">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Automated Sales</h1>
          <p style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 4 }}>Apply discounts automatically — no code needed</p>
        </div>
        <button className="db-btn primary" onClick={() => { setShowForm(true); setError(null) }}>
          <Plus size={13} /> New Sale
        </button>
      </div>

      {showForm && (
        <div className="db-card" style={{ marginBottom: 24 }}>
          <div className="db-card-head"><span>New Sale</span></div>
          <div className="db-card-body">
            <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="db-field" style={{ gridColumn: '1 / -1' }}>
                <label>Sale Name *</label>
                <input
                  required
                  placeholder="Summer Sale"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              <div className="db-field">
                <label>Discount Type *</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'percentage' | 'fixed' }))} style={inputStyle}>
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed amount ($)</option>
                </select>
              </div>
              <div className="db-field">
                <label>{form.type === 'percentage' ? 'Discount %' : 'Discount $'} *</label>
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
              <div className="db-field" style={{ gridColumn: '1 / -1' }}>
                <label>Applies To *</label>
                <select value={form.scope} onChange={e => setForm(f => ({ ...f, scope: e.target.value as 'cart' | 'products', productSlugs: [] }))} style={inputStyle}>
                  <option value="cart">Entire Cart (all products)</option>
                  <option value="products">Specific Products</option>
                </select>
              </div>
              {form.scope === 'products' && products.length > 0 && (
                <div className="db-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Select Products</label>
                  <div style={{ border: '1px solid var(--line)', borderRadius: 6, padding: 12, maxHeight: 200, overflowY: 'auto', background: 'var(--bg-2)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {products.map(p => (
                      <label key={p.slug} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--ink)' }}>
                        <input
                          type="checkbox"
                          checked={form.productSlugs.includes(p.slug)}
                          onChange={() => toggleProduct(p.slug)}
                          style={{ accentColor: 'var(--neon)', width: 14, height: 14 }}
                        />
                        {p.name}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {error && <p style={{ gridColumn: '1 / -1', color: '#ef4444', fontSize: 13 }}>{error}</p>}
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
                <button type="submit" className="db-btn primary" disabled={saving}>
                  {saving ? 'Creating...' : 'Create Sale'}
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
        ) : sales.length === 0 ? (
          <div className="db-card-body" style={{ textAlign: 'center', padding: '48px 0' }}>
            <Percent size={32} style={{ color: 'var(--ink-mute)', marginBottom: 12 }} />
            <p style={{ color: 'var(--ink-mute)', fontSize: 14 }}>No sales yet.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                {['Name', 'Discount', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{sale.name}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--ink-mute)' }}>{formatSale(sale)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button
                      onClick={() => toggleActive(sale)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: sale.active ? '#22c55e' : 'var(--ink-mute)', fontSize: 13 }}
                    >
                      {sale.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                      {sale.active ? 'Live' : 'Off'}
                    </button>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => handleDelete(sale.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-mute)', padding: 4 }}>
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
