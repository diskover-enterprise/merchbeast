'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/utils'

interface RevenueByRestaurant {
  shopId: string
  name: string
  revenue: number
  orderCount: number
}

interface RecentOrderItem {
  product: { name: string }
  quantity: number
  priceAtPurchase: number
}

interface RecentOrder {
  id: string
  total: number
  status: string
  createdAt: string
  customer: { name: string; email: string }
  restaurant: { name: string; slug: string }
  items: RecentOrderItem[]
}

interface Stats {
  totalRevenue: number
  totalOrders: number
  totalRestaurants: number
  revenueByRestaurant: RevenueByRestaurant[]
  recentOrders: RecentOrder[]
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-500">Failed to load stats.</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-1">Admin</p>
        <h1 className="text-2xl font-light text-gray-900">Overview</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-gray-50 border border-gray-200 p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2">Total Revenue</p>
          <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2">Total Orders</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2">Restaurants</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.totalRestaurants}</p>
        </div>
      </div>

      {/* Revenue by restaurant */}
      <div className="mb-10">
        <h2 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">Revenue by Restaurant</h2>
        <div className="border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Name</th>
                <th className="text-right px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Orders</th>
                <th className="text-right px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.revenueByRestaurant
                .sort((a, b) => b.revenue - a.revenue)
                .map((r) => (
                  <tr key={r.shopId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-900 font-medium">{r.name}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{r.orderCount}</td>
                    <td className="px-4 py-3 text-right text-gray-900 font-medium">{formatCurrency(r.revenue)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent orders */}
      <div>
        <h2 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">Recent Orders</h2>
        <div className="border border-gray-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Order ID</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Customer</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Restaurant</th>
                <th className="text-right px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Total</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{order.id.slice(0, 8)}&hellip;</td>
                  <td className="px-4 py-3 text-gray-900">{order.customer.name}</td>
                  <td className="px-4 py-3 text-gray-600">{order.restaurant.name}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
