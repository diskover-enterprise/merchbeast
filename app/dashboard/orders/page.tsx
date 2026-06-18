'use client'

import { useEffect, useState } from 'react'
import { Order } from '@/types'
import { formatCurrency } from '@/lib/utils'

function StatusBadge({ status }: { status: string }) {
  const cls = `db-badge db-badge-${status.toLowerCase()}`
  return <span className={cls}>{status}</span>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders').then((r) => r.json()).then((data) => {
      setOrders(data)
      setLoading(false)
    })
  }, [])

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
                    <th>Ship To</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="mono">{order.id.slice(0, 8)}…</td>
                      <td style={{ fontSize: 12, textTransform: 'capitalize' }}>{(order as any).shopSlug?.replace(/-/g, ' ') || '—'}</td>
                      <td className="strong">
                        {order.customer?.name}
                        <br />
                        <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--ink-mute)' }}>
                          {order.customer?.email}
                        </span>
                      </td>
                      <td>
                        {order.items?.map((i) => `${i.product?.name} ×${i.quantity}`).join(', ')}
                      </td>
                      <td style={{ fontSize: 12, color: (order as any).shippingAddress ? 'inherit' : 'var(--ink-mute)' }}>
                        {(order as any).shippingAddress ?? '—'}
                      </td>
                      <td className="strong">{formatCurrency(order.total)}</td>
                      <td><StatusBadge status={order.status} /></td>
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
