'use client'

import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'

type MonthRow = {
  month: string
  revenue: number
  commission: number
  paid: boolean
  paidAt: string | null
  paymentId: string | null
  note: string | null
}

type ShopData = {
  shopId: string
  shopName: string
  months: MonthRow[]
}

function formatMonth(m: string) {
  const [year, month] = m.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleString('en-CA', { month: 'long', year: 'numeric' })
}

export default function CommissionsPage() {
  const [shops, setShops] = useState<ShopData[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({})

  async function load() {
    const res = await fetch('/api/dashboard/commissions')
    if (res.ok) setShops(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function markPaid(shopId: string, month: string) {
    const key = `${shopId}-${month}`
    setSaving(key)
    await fetch('/api/dashboard/commissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantId: shopId, month, note: noteInputs[key] || null }),
    })
    setSaving(null)
    load()
  }

  async function unmarkPaid(shopId: string, month: string) {
    const key = `${shopId}-${month}`
    setSaving(key)
    await fetch('/api/dashboard/commissions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantId: shopId, month }),
    })
    setSaving(null)
    load()
  }

  const totalOwed = shops.flatMap(s => s.months).filter(m => !m.paid).reduce((sum, m) => sum + m.commission, 0)

  if (loading) return (
    <>
      <div className="db-sec-head"><span className="num">[ 05 ]</span><span className="label">Commissions</span><span className="spacer" /><span>Loading…</span></div>
      <div className="db-content">{[1,2].map(i => <div key={i} className="db-skeleton" style={{ height: 80, marginBottom: 12 }} />)}</div>
    </>
  )

  return (
    <>
      <div className="db-sec-head">
        <span className="num">[ 05 ]</span>
        <span className="label">Commissions</span>
        <span className="spacer" />
        {totalOwed > 0 && <span style={{ color: '#ffb400' }}>${totalOwed.toFixed(2)} outstanding</span>}
        <span className="blink" />
      </div>

      <div className="db-content">
        {shops.length === 0 ? (
          <div className="db-card">
            <div className="db-empty">
              <p className="db-empty-tag">Nothing yet</p>
              <p className="db-empty-headline">No commission data</p>
            </div>
          </div>
        ) : shops.map(shop => (
          <div key={shop.shopId} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--neon)', marginBottom: 10 }}>
              {shop.shopName}
            </div>
            <div className="db-card">
              <div className="db-table-wrap">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Gross Sales</th>
                      <th>Commission (25%)</th>
                      <th>Status</th>
                      <th>Note</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shop.months.map(row => {
                      const key = `${shop.shopId}-${row.month}`
                      return (
                        <tr key={row.month}>
                          <td style={{ fontWeight: 600 }}>{formatMonth(row.month)}</td>
                          <td>${row.revenue.toFixed(2)}</td>
                          <td style={{ fontWeight: 700, color: 'var(--neon)' }}>${row.commission.toFixed(2)}</td>
                          <td>
                            <span style={{
                              fontSize: 11, padding: '2px 8px', borderRadius: 4,
                              background: row.paid ? 'rgba(57,255,20,.12)' : 'rgba(255,180,0,.12)',
                              color: row.paid ? 'var(--neon)' : '#ffb400',
                            }}>
                              {row.paid ? `Paid ${row.paidAt ? new Date(row.paidAt).toLocaleDateString() : ''}` : 'Pending'}
                            </span>
                          </td>
                          <td>
                            {!row.paid && (
                              <input
                                type="text"
                                placeholder="Optional note…"
                                value={noteInputs[key] || ''}
                                onChange={e => setNoteInputs({ ...noteInputs, [key]: e.target.value })}
                                style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '4px 8px', color: 'var(--ink)', fontSize: 12, width: 160 }}
                              />
                            )}
                            {row.paid && row.note && <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{row.note}</span>}
                          </td>
                          <td className="right">
                            {row.paid ? (
                              <button
                                className="db-btn ghost"
                                style={{ padding: '5px 10px', fontSize: 11, borderColor: 'rgba(255,80,80,.35)', color: '#ff5050' }}
                                onClick={() => unmarkPaid(shop.shopId, row.month)}
                                disabled={saving === key}
                              >
                                <X size={12} /> Unmark
                              </button>
                            ) : (
                              <button
                                className="db-btn primary"
                                style={{ padding: '5px 12px', fontSize: 11 }}
                                onClick={() => markPaid(shop.shopId, row.month)}
                                disabled={saving === key}
                              >
                                <Check size={12} /> {saving === key ? 'Saving…' : 'Mark Paid'}
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
