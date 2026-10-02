'use client'

import { useEffect, useState } from 'react'
import { Order } from '@/types'
import { formatCurrency } from '@/lib/utils'

const STATUS_LABELS: Record<string, string> = {
  paid: 'Unfulfilled',
  'in-production': 'In Production',
  shipped: 'Shipped',
  fulfilled: 'Fulfilled',
  refunded: 'Refunded',
}

function StatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status] ?? status
  const key = status === 'paid' ? 'unfulfilled' : status.toLowerCase().replace(/\s+/g, '-')
  return <span className={`db-badge db-badge-${key}`}>{label}</span>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders').then((r) => r.json()).then((data) => {
      setOrders(data)
      setLoading(false)
    })
  }, [])

  async function fetchAddress(orderId: string) {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, _fetchingAddress: true, _error: null } : o))
    try {
      const res = await fetch(`/api/orders/${orderId}/fetch-address`, { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, shippingAddress: data.shippingAddress, _fetchingAddress: false } : o))
      } else {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, _fetchingAddress: false, _error: data.error } : o))
      }
    } catch {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, _fetchingAddress: false } : o))
    }
  }

  async function resendNotification(orderId: string) {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, _resending: true, _resendResult: null } : o))
    try {
      const res = await fetch(`/api/orders/${orderId}/resend-notification`, { method: 'POST' })
      const data = await res.json()
      setOrders(prev => prev.map(o => o.id === orderId
        ? { ...o, _resending: false, _resendResult: res.ok ? 'sent' : (data.errors?.[0] ?? 'error') }
        : o
      ))
    } catch {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, _resending: false, _resendResult: 'error' } : o))
    }
  }

  async function updateStatus(orderId: string, prevStatus: string, newStatus: string) {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    }).catch(() => {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: prevStatus } : o))
    })
  }

  if (loading) {
    return (
      <>
        <div className="db-sec-head">
          <span className="num">[ 02 ]</span>
          <span className="label">Orders</span>
          <span className="spacer" />
          <span>Loading…</span>
        </div>
        <div className="db-content">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="db-skeleton" style={{ height: 48, marginBottom: 8 }} />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="db-sec-head">
        <span className="num">[ 02 ]</span>
        <span className="label">Orders</span>
        <span className="spacer" />
        <span>{orders.length}&nbsp;total</span>
        <span className="blink" />
      </div>

      <div className="db-content">
        {orders.length === 0 ? (
          <div className="db-card">
            <div className="db-empty">
              <p className="db-empty-tag">No orders yet</p>
              <p className="db-empty-headline">Standing By</p>
            </div>
          </div>
        ) : (
          <div className="db-card">
            <div className="db-table-wrap">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Shop</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Ship To</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Tracking</th>
                    <th>Fulfillment</th>
                    <th>Notify</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="mono">{order.id.slice(0, 8)}…</td>
                      <td style={{ fontSize: 12, textTransform: 'capitalize' }}>{order.shopSlug?.replace(/-/g, ' ') || '—'}</td>
                      <td className="strong">
                        {order.customer?.name}
                        <br />
                        <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--ink-mute)' }}>
                          {order.customer?.email}
                        </span>
                      </td>
                      <td>
                        {order.items?.map((i: any) => `${i.product?.name} ×${i.quantity}`).join(', ')}
                      </td>
                      <td style={{ fontSize: 12 }}>
                        {order.items?.map((i: any) => i.size).filter(Boolean).join(', ') || <span style={{ color: 'var(--ink-mute)' }}>—</span>}
                      </td>
                      <td style={{ fontSize: 12 }}>
                        {order.items?.map((i: any) => i.color).filter(Boolean).join(', ') || <span style={{ color: 'var(--ink-mute)' }}>—</span>}
                      </td>
                      <td style={{ fontSize: 12 }}>
                        {order.shippingAddress
                          ? <span style={{ color: 'inherit' }}>{order.shippingAddress}</span>
                          : <button
                              className="db-fulfill-btn mark"
                              style={{ fontSize: 9 }}
                              onClick={() => fetchAddress(order.id)}
                              disabled={order._fetchingAddress}
                            >
                              {order._fetchingAddress ? '…' : 'Fetch from Stripe'}
                            </button>
                        }
                      </td>
                      <td className="strong">{formatCurrency(order.total)}</td>
                      <td><StatusBadge status={order.status} /></td>
                      <td style={{ fontSize: 12 }}>
                        {order.trackingUrl
                          ? <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon)', textDecoration: 'none', fontFamily: 'monospace', fontSize: 11 }}>{order.chitchatsId}</a>
                          : <span style={{ color: 'var(--ink-mute)' }}>—</span>}
                      </td>
                      <td>
                        <select
                          value={order.status}
                          onChange={e => updateStatus(order.id, order.status, e.target.value)}
                          style={{
                            fontSize: 11, fontFamily: 'monospace', padding: '4px 6px',
                            background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--ink-mute)',
                            borderRadius: 4, cursor: 'pointer',
                          }}
                        >
                          <option value="paid">Unfulfilled</option>
                          <option value="in-production">In Production</option>
                          <option value="shipped">Shipped</option>
                          <option value="fulfilled">Fulfilled</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="db-fulfill-btn mark"
                          style={{ fontSize: 9 }}
                          onClick={() => resendNotification(order.id)}
                          disabled={order._resending}
                        >
                          {order._resending ? '…' : '✉ Resend'}
                        </button>
                        {order._resendResult && (
                          <p style={{ fontSize: 9, marginTop: 3, color: order._resendResult === 'sent' ? '#4ade80' : '#ff5050' }}>
                            {order._resendResult === 'sent' ? 'Sent ✓' : order._resendResult}
                          </p>
                        )}
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
