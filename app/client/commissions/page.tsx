'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, DollarSign, BarChart2, LogOut } from 'lucide-react'
import '../client.css'

type MonthRow = {
  month: string
  revenue: number
  commission: number
  rate: number
  paid: boolean
  paidAt: string | null
  note: string | null
}

function formatMonth(m: string) {
  const [year, month] = m.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleString('en-CA', { month: 'long', year: 'numeric' })
}

export default function ClientCommissions() {
  const [rows, setRows] = useState<MonthRow[]>([])
  const [loading, setLoading] = useState(true)
  const [shopName, setShopName] = useState('Client Portal')

  useEffect(() => {
    fetch('/api/client/stats')
      .then(r => { if (!r.ok) { window.location.href = '/client/login'; return null } return r.json() })
      .then(d => d && setShopName(d.shopName))

    fetch('/api/client/commissions')
      .then(r => { if (!r.ok) { window.location.href = '/client/login'; return null } return r.json() })
      .then(d => d && setRows(d))
      .finally(() => setLoading(false))
  }, [])

  async function signOut() {
    await fetch('/api/client/auth', { method: 'DELETE' })
    window.location.href = '/client/login'
  }

  const totalOwed = rows.filter(r => !r.paid).reduce((sum, r) => sum + r.commission, 0)
  const totalPaid = rows.filter(r => r.paid).reduce((sum, r) => sum + r.commission, 0)

  return (
    <div className="cl-shell">
      <aside className="cl-sidebar">
        <div className="cl-brand">
          <div className="cl-brand-tag">MERCH BEAST</div>
          <div className="cl-brand-name">{shopName}</div>
          <div className="cl-brand-sub">Store Dashboard</div>
        </div>
        <nav className="cl-nav">
          <Link href="/client/dashboard" className="cl-nav-item">
            <LayoutDashboard size={14} /> Overview
          </Link>
          <Link href="/client/orders" className="cl-nav-item">
            <ShoppingBag size={14} /> Orders
          </Link>
          <Link href="/client/commissions" className="cl-nav-item active">
            <DollarSign size={14} /> Commissions
          </Link>
          <Link href="/client/analytics" className="cl-nav-item">
            <BarChart2 size={14} /> Analytics
          </Link>
        </nav>
        <button className="cl-signout" onClick={signOut}>
          <LogOut size={14} /> Sign Out
        </button>
      </aside>

      <main className="cl-main">
        <div className="cl-sec-head">
          <span className="num">[ 03 ]</span>
          <span className="label">Commissions</span>
          <span className="spacer" />
          <span style={{ color: 'var(--neon)', fontSize: '0.7rem' }}>25% of sales · Paid monthly</span>
        </div>

        <div className="cl-content">
          {/* Summary cards */}
          <div className="cl-stats" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: 480, marginBottom: 24 }}>
            <div className="cl-stat">
              <div className="cl-stat-label">Outstanding</div>
              <div className="cl-stat-value" style={{ color: totalOwed > 0 ? '#ffb400' : 'var(--ink)' }}>
                ${totalOwed.toFixed(2)}
              </div>
              <div className="cl-stat-sub">awaiting payment</div>
            </div>
            <div className="cl-stat">
              <div className="cl-stat-label">Paid to Date</div>
              <div className="cl-stat-value" style={{ color: 'var(--neon)' }}>${totalPaid.toFixed(2)}</div>
              <div className="cl-stat-sub">lifetime paid</div>
            </div>
          </div>

          {loading ? (
            <p style={{ color: 'var(--ink-mute)' }}>Loading…</p>
          ) : rows.length === 0 ? (
            <div className="cl-card">
              <div className="cl-empty">No commission data yet. Sales will appear here monthly.</div>
            </div>
          ) : (
            <div className="cl-card">
              <table className="cl-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Gross Sales</th>
                    <th>Your Cut (25%)</th>
                    <th>Status</th>
                    <th>Paid On</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.month}>
                      <td style={{ fontWeight: 600 }}>{formatMonth(r.month)}</td>
                      <td>${r.revenue.toFixed(2)}</td>
                      <td style={{ fontWeight: 700, color: 'var(--neon)' }}>${r.commission.toFixed(2)}</td>
                      <td>
                        <span className={`cl-badge ${r.paid ? 'paid' : 'pending'}`}>
                          {r.paid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td style={{ color: 'var(--ink-mute)', fontSize: 12 }}>
                        {r.paidAt ? new Date(r.paidAt).toLocaleDateString() : '—'}
                        {r.note && <div style={{ fontSize: 11, marginTop: 2 }}>{r.note}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
