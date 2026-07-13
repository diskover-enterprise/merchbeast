'use client'

import { useEffect, useState } from 'react'
import { Order } from '@/types'
import { formatCurrency } from '@/lib/utils'

function StatusBadge({ status }: { status: string }) {
  const display = status === 'paid' ? 'unfulfilled' : status
  const cls = `db-badge db-badge-${status === 'paid' ? 'unfulfilled' : status.toLowerCase()}`
  return <span className={cls}>{display}</span>
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

  async function toggleFulfilled(orderId: string, currentStatus: string) {
    if (currentStatus === 'fulfilled') {
      // Revert to paid/unfulfilled
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'paid' } : o))
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'paid' }),
      }).catch(() => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'fulfilled' } : o))
      })
      return
    }

    // Mark fulfilled — create Chit Chats shipment
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, _fulfilling: true } : o))
    try {
      const res = await fetch(`/api/orders/${orderId}/fulfill`, { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId
          ? { ...o, status: 'fulfilled', chitchatsId: data.chitchatsId, trackingUrl: data.trackingUrl, _fulfilling: false }
          : o
        ))
      } else {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, _fulfilling: false, _error: data.error } : o))
      }
    } catch {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, _fulfilling: false } : o))
    }
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
                      <td style={{ fontSize: 12, color: order.shippingAddress ? 'inherit' : 'var(--ink-mute)' }}>
                        {order.shippingAddress ?? '—'}
                      </td>
                      <td className="strong">{formatCurrency(order.total)}</td>
                      <td><StatusBadge status={order.status} /></td>
                      <td style={{ fontSize: 12 }}>
                        {order.trackingUrl
                          ? <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon)', textDecoration: 'none', fontFamily: 'monospace', fontSize: 11 }}>{order.chitchatsId}</a>
                          : <span style={{ color: 'var(--ink-mute)' }}>—</span>}
                      </td>
                      <td>
                        {order._error && <p style={{ color: '#ff5050', fontSize: 10, marginBottom: 4 }}>{order._error}</p>}
                        <button
                          className={`db-fulfill-btn ${order.status === 'fulfilled' ? 'unmark' : 'mark'}`}
                          onClick={() => toggleFulfilled(order.id, order.status)}
                          disabled={order._fulfilling}
                        >
                          {order._fulfilling ? '…' : order.status === 'fulfilled' ? 'Unfulfill' : 'Fulfil'}
                        </button>
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
