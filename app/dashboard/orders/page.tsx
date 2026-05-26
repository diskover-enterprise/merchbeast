'use client'

import { useEffect, useState } from 'react'
import { Order } from '@/types'
import { OrderStatusBadge } from '@/components/ui/OrderStatusBadge'
import { formatCurrency } from '@/lib/utils'

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
      <div className="p-8 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-32" />
        {[1, 2, 3, 4].map((i) => <div key={i} className="h-16 bg-gray-200 rounded-xl" />)}
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-xl">No orders yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
              <tr>
                <th className="text-left px-5 py-3">Order ID</th>
                <th className="text-left px-5 py-3">Customer</th>
                <th className="text-left px-5 py-3">Items</th>
                <th className="text-left px-5 py-3">Total</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-gray-500">
                    {order.id.slice(0, 8)}…
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{order.customer?.name}</p>
                    <p className="text-gray-400 text-xs">{order.customer?.email}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {order.items?.map((i) => `${i.product?.name} ×${i.quantity}`).join(', ')}
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-5 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
