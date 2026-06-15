'use client'

import { useEffect, useState } from 'react'
import { SalesChart } from '@/components/dashboard/SalesChart'
import { formatCurrency } from '@/lib/utils'
import { DollarSign, ShoppingBag, TrendingUp, Package } from 'lucide-react'

interface Stats {
  totalOrders: number
  totalRevenue: number
  recentOrdersCount: number
  topProducts: { id: string; name: string; soldCount: number }[]
  dailyRevenue: { date: string; revenue: number }[]
}

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(async (r) => {
        if (!r.ok) {
          const text = await r.text()
          throw new Error(`${r.status}: ${text.slice(0, 200)}`)
        }
        return r.json()
      })
      .then(setStats)
      .catch((e) => setError(e.message))
  }, [])

  if (error) {
    return (
      <div className="db-content" style={{ padding: '2rem' }}>
        <p style={{ color: '#ff4444', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>Stats error: {error}</p>
      </div>
    )
  }

  if (!stats) {
    return (
      <>
        <div className="db-sec-head">
          <span className="num">[ 01 ]</span>
          <span className="label">Overview</span>
          <span className="spacer" />
          <span>Loading…</span>
        </div>
        <div className="db-content">
          <div className="db-stats">
            {[1, 2, 3].map((i) => (
              <div key={i} className="db-stat">
                <div className="db-skeleton" style={{ height: 12, width: '60%', marginBottom: 18 }} />
                <div className="db-skeleton" style={{ height: 34, width: '80%' }} />
              </div>
            ))}
          </div>
          <div className="db-skeleton" style={{ height: 280, borderRadius: 2 }} />
        </div>
      </>
    )
  }

  const statCards = [
    {
      label: 'Revenue · 30d',
      value: formatCurrency(stats.totalRevenue),
      sub: 'gross sales',
      icon: DollarSign,
    },
    {
      label: 'Orders · 30d',
      value: stats.recentOrdersCount,
      sub: 'recent orders',
      icon: ShoppingBag,
    },
    {
      label: 'All-time Orders',
      value: stats.totalOrders,
      sub: 'lifetime count',
      icon: TrendingUp,
    },
  ]

  return (
    <>
      <div className="db-sec-head">
        <span className="num">[ 01 ]</span>
        <span className="label">Overview</span>
        <span className="spacer" />
        <span>Status&nbsp;<b style={{ color: 'var(--neon)' }}>OK</b></span>
        <span className="blink" />
      </div>

      <div className="db-content">
        {/* Stat cards */}
        <div className="db-stats">
          {statCards.map(({ label, value, sub, icon: Icon }) => (
            <div key={label} className="db-stat">
              <div className="db-stat-label">
                {label}
                <Icon />
              </div>
              <div className="db-stat-value">{value}</div>
              <div className="db-stat-sub">{sub}</div>
            </div>
          ))}
        </div>

        {/* Chart + top products */}
        <div className="db-grid-2-1">
          <div className="db-card">
            <div className="db-card-head">
              <svg viewBox="0 0 16 16"><rect x="1" y="8" width="3" height="7"/><rect x="6" y="4" width="3" height="11"/><rect x="11" y="1" width="3" height="14"/></svg>
              <span>Revenue — Last 7 Days</span>
            </div>
            <div className="db-card-body">
              <SalesChart data={stats.dailyRevenue} />
            </div>
          </div>

          <div className="db-card">
            <div className="db-card-head">
              <Package size={13} style={{ stroke: 'var(--neon)', fill: 'none' }} />
              <span>Top Products</span>
            </div>
            <div className="db-card-body">
              {stats.topProducts.length === 0 ? (
                <div className="db-empty">
                  <p className="db-empty-tag">No data yet</p>
                  <p className="db-empty-headline">Empty</p>
                </div>
              ) : (
                <ol className="db-top-list">
                  {stats.topProducts.map((p, i) => (
                    <li key={p.id} className="db-top-item">
                      <span className={`db-top-rank${i === 0 ? ' first' : ''}`}>{i + 1}</span>
                      <span className="db-top-name">{p.name}</span>
                      <span className="db-top-count">{p.soldCount}&nbsp;sold</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
