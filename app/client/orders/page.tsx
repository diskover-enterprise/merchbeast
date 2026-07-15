'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, DollarSign, BarChart2, LogOut } from 'lucide-react'
import '../client.css'

type Order = {
  id: string
  customer: { name: string; email: string }
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: string
  createdAt: string
  shippingAddress?: string
}

export default function ClientOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [shopName, setShopName] = useState('Client Portal')

  useEffect(() => {
    fetch('/api/client/stats')
      .then(r => { if (!r.ok) { window.location.href = '/client/login'; return null } return r.json() })
      .then(d => d && setShopName(d.shopName))

    fetch('/api/client/orders')
      .then(r => { if (!r.ok) { window.location.href = '/client/login'; return null } return r.json() })
      .then(d => d && setOrders(d))
      .finally(() => setLoading(false))
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
          <div className="cl-brand-name">{shopName}</div>
          <div className="cl-brand-sub">Store Dashboard</div>
        </div>
        <nav className="cl-nav">
          <Link href="/client/dashboard" className="cl-nav-item">
            <LayoutDashboard size={14} /> Overview
          </Link>
          <Link href="/client/orders" className="cl-nav-item active">
            <ShoppingBag size={14} /> Orders
          </Link>
          <Link href="/client/commissions" className="cl-nav-item">
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
          <span className="num">[ 02 ]</span>
          <span className="label">Orders</span>
          <span className="spacer" />
          <span>{orders.length} total</span>
        </div>

        <div className="cl-content">
          {loading ? (
            <p style={{ color: 'var(--ink-mute)' }}>Loading…</p>
          ) : orders.length === 0 ? (
            <div className="cl-card">
              <div className="cl-empty">No orders yet.</div>
            </div>
          ) : (
            <div className="cl-card">
              <table className="cl-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Ship To</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ink-mute)' }}>{o.id.slice(0, 8)}…</td>
                      <td>
                        <div>{o.customer.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{o.customer.email}</div>
                      </td>
                      <td style={{ fontSize: 12 }}>{o.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}</td>
                      <td style={{ fontSize: 12, color: o.shippingAddress ? 'inherit' : 'var(--ink-mute)' }}>{o.shippingAddress ?? '—'}</td>
                      <td style={{ fontWeight: 600 }}>${o.total.toFixed(2)}</td>
                      <td><span className={`cl-badge ${o.status}`}>{o.status}</span></td>
                      <td style={{ color: 'var(--ink-mute)', fontSize: 12 }}>{new Date(o.createdAt).toLocaleDateString()}</td>
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
