'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/utils'

interface OrderItem {
  product: { name: string }
  quantity: number
  priceAtPurchase: number
}

interface AdminOrder {
  id: string
  total: number
  status: string
  createdAt: string
  customer: { name: string; email: string }
  restaurant: { name: string; slug: string }
  items: OrderItem[]
}

interface RestaurantOption {
  id: string
  name: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [restaurants, setRestaurants] = useState<RestaurantOption[]>([])
  const [selectedShopId, setSelectedRestaurantId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/shops')
      .then((r) => r.json())
      .then((data: Array<{ id: string; name: string }>) => setRestaurants(data))
  }, [])

  useEffect(() => {
    setLoading(true)
    const url = selectedShopId
      ? `/api/admin/orders?shopId=${selectedShopId}`
      : '/api/admin/orders'
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [selectedShopId])

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-1">Admin</p>
          <h1 className="text-2xl font-light text-gray-900">Orders</h1>
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1">
            Filter by Restaurant
          </label>
          <select
            value={selectedShopId}
            onChange={(e) => setSelectedRestaurantId(e.target.value)}
            className="border border-gray-200 text-sm px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-gray-400"
          >
            <option value="">All Restaurants</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div className="border border-gray-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Order ID</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Customer</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Restaurant</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Items</th>
                <th className="text-right px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Total</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{order.id.slice(0, 8)}&hellip;</td>
                  <td className="px-4 py-3">
                    <p className="text-gray-900 font-medium">{order.customer.name}</p>
                    <p className="text-gray-400 text-xs">{order.customer.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.restaurant.name}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs max-w-[200px]">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.quantity}&times; {item.product.name}
                        {i < order.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900 font-medium">{formatCurrency(order.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-[10px] tracking-wider uppercase px-2 py-0.5 ${
                      order.status === 'paid' ? 'bg-green-50 text-green-700' :
                      order.status === 'fulfilled' ? 'bg-blue-50 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
