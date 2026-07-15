'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, DollarSign, BarChart2, LogOut } from 'lucide-react'
import '../client.css'

type Analytics = {
  total: number
  last30: number
  last7: number
  today: number
  topViewed: { slug: string; views: number }[]
  topPurchased: { name: string; unitsSold: number; orders: number }[]
  daily: { day: string; count: number }[]
}

export default function ClientAnalytics() {
  const [data, setData] = useState<Analytics | null>(null)
  const [shopName, setShopName] = useState('Client Portal')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/client/stats')
      .then(r => { if (!r.ok) { window.location.href = '/client/login'; return null } return r.json() })
      .then(d => d && setShopName(d.shopName))

    fetch('/api/client/analytics')
      .then(r => { if (!r.ok) { window.location.href = '/client/login'; return null } return r.json() })
      .then(d => d && setData(d))
      .finally(() => setLoading(false))
  }, [])

  async function signOut() {
    await fetch('/api/client/auth', { method: 'DELETE' })
    window.location.href = '/client/login'
  }

  const maxDaily = data ? Math.max(...data.daily.map(d => d.count), 1) : 1

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
          <Link href="/client/commissions" className="cl-nav-item">
            <DollarSign size={14} /> Commissions
          </Link>
          <Link href="/client/analytics" className="cl-nav-item active">
            <BarChart2 size={14} /> Analytics
          </Link>
        </nav>
        <button className="cl-signout" onClick={signOut}>
          <LogOut size={14} /> Sign Out
        </button>
      </aside>

      <main className="cl-main">
        <div className="cl-sec-head">
          <span className="num">[ 04 ]</span>
          <span className="label">Analytics</span>
          <span className="spacer" />
          <span style={{ color: 'var(--ink-mute)', fontSize: '0.7rem' }}>Page views · your shop only</span>
        </div>

        <div className="cl-content">
          {loading ? (
            <p style={{ color: 'var(--ink-mute)' }}>Loading…</p>
          ) : !data ? (
            <p style={{ color: '#ff5050' }}>Failed to load analytics.</p>
          ) : (
            <>
              {/* Stats */}
              <div className="cl-stats" style={{ marginBottom: 24 }}>
                <div className="cl-stat">
                  <div className="cl-stat-label">Today</div>
                  <div className="cl-stat-value">{data.today}</div>
                  <div className="cl-stat-sub">page views</div>
                </div>
                <div className="cl-stat">
                  <div className="cl-stat-label">Last 7 days</div>
                  <div className="cl-stat-value">{data.last7}</div>
                  <div className="cl-stat-sub">page views</div>
                </div>
                <div className="cl-stat">
                  <div className="cl-stat-label">Last 30 days</div>
                  <div className="cl-stat-value">{data.last30}</div>
                  <div className="cl-stat-sub">page views</div>
                </div>
                <div className="cl-stat">
                  <div className="cl-stat-label">All Time</div>
                  <div className="cl-stat-value">{data.total}</div>
                  <div className="cl-stat-sub">total views</div>
                </div>
              </div>

              {/* Daily chart */}
              {data.daily.length > 0 && (
                <div className="cl-card" style={{ marginBottom: 24 }}>
                  <div style={{ padding: '16px 20px 8px', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Daily Views — Last 30 Days</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, padding: '8px 20px 16px', height: 120 }}>
                    {data.daily.map(d => (
                      <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }} title={`${d.day}: ${d.count} views`}>
                        <div style={{ width: '100%', background: 'var(--neon)', borderRadius: 2, height: `${Math.max(2, (d.count / maxDaily) * 88)}px`, opacity: 0.85 }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top purchased */}
              {data.topPurchased.length > 0 && (
                <div className="cl-card" style={{ marginBottom: 24 }}>
                  <div style={{ padding: '16px 20px 8px', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Top Products Purchased — All Time</div>
                  <table className="cl-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Units Sold</th>
                        <th>Orders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topPurchased.map(p => (
                        <tr key={p.name}>
                          <td style={{ fontWeight: 600 }}>{p.name}</td>
                          <td style={{ fontWeight: 700, color: 'var(--neon)' }}>{p.unitsSold}</td>
                          <td style={{ color: 'var(--ink-mute)' }}>{p.orders}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Top viewed */}
              {data.topViewed.length > 0 && (
                <div className="cl-card">
                  <div style={{ padding: '16px 20px 8px', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Top Products Viewed — Last 30 Days</div>
                  <table className="cl-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topViewed.map(p => (
                        <tr key={p.slug}>
                          <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.slug}</td>
                          <td style={{ fontWeight: 600, color: 'var(--neon)' }}>{p.views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {data.total === 0 && (
                <div className="cl-card">
                  <div className="cl-empty">No page view data yet. Views will appear here as customers visit your shop.</div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
