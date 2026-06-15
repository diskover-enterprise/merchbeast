'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, LogOut } from 'lucide-react'
import '../client.css'

type Stats = {
  shopName: string
  totalOrders: number
  recentOrdersCount: number
  totalRevenue: number
  productCount: number
}

export default function ClientDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/client/stats')
      .then(async r => {
        if (!r.ok) { window.location.href = '/client/login'; return }
        return r.json()
      })
      .then(d => d && setStats(d))
      .catch(() => setError('Failed to load stats'))
  }, [])

  async function signOut() {
    await fetch('/api/client/auth', { method: 'DELETE' })
    window.location.href = '/client/login'
  }

  return (
    <div className="cl-shell">
      <aside className="cl-sidebar">
        <div className="cl-brand">
          <div className="cl-brand-tag">MERCH BEAST</div>
          <div className="cl-brand-name">{stats?.shopName || 'Client Portal'}</div>
          <div className="cl-brand-sub">Store Dashboard</div>
        </div>
        <nav className="cl-nav">
          <Link href="/client/dashboard" className="cl-nav-item active">
            <LayoutDashboard size={14} /> Overview
          </Link>
          <Link href="/client/orders" className="cl-nav-item">
            <ShoppingBag size={14} /> Orders
          </Link>
        </nav>
        <button className="cl-signout" onClick={signOut}>
          <LogOut size={14} /> Sign Out
        </button>
      </aside>

      <main className="cl-main">
        <div className="cl-sec-head">
          <span className="num">[ 01 ]</span>
          <span className="label">Overview</span>
          <span className="spacer" />
          {stats && <span style={{ color: 'var(--neon)', fontSize: '0.7rem' }}>Status OK</span>}
        </div>

        <div className="cl-content">
          {error && <p style={{ color: '#ff5050', marginBottom: 16 }}>{error}</p>}

          {!stats ? (
            <p style={{ color: 'var(--ink-mute)' }}>Loading…</p>
          ) : (
            <div className="cl-stats">
              <div className="cl-stat">
                <div className="cl-stat-label">Revenue · 30d</div>
                <div className="cl-stat-value">${stats.totalRevenue.toFixed(2)}</div>
                <div className="cl-stat-sub">gross sales</div>
              </div>
              <div className="cl-stat">
                <div className="cl-stat-label">Orders · 30d</div>
                <div className="cl-stat-value">{stats.recentOrdersCount}</div>
                <div className="cl-stat-sub">recent orders</div>
              </div>
              <div className="cl-stat">
                <div className="cl-stat-label">All-time Orders</div>
                <div className="cl-stat-value">{stats.totalOrders}</div>
                <div className="cl-stat-sub">lifetime count</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
