'use client'

import { useEffect, useState } from 'react'
import { SalesChart } from '@/components/dashboard/SalesChart'
import { formatCurrency } from '@/lib/utils'
import { ShoppingBag, DollarSign, TrendingUp, Package } from 'lucide-react'

interface Stats {
  totalOrders: number
  totalRevenue: number
  recentOrdersCount: number
  topProducts: { id: string; name: string; soldCount: number }[]
  dailyRevenue: { date: string; revenue: number }[]
}

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/dashboard/stats').then((r) => r.json()).then(setStats)
  }, [])

  if (!stats) {
    return (
      <div className="p-8 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-28 bg-gray-200 rounded-xl" />)}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    )
  }

  const statCards = [
    { label: 'Total Revenue (30d)', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Orders (30d)', value: stats.recentOrdersCount, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { label: 'All-time Orders', value: stats.totalOrders, icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-700 mb-4">Revenue — Last 7 Days</h2>
          <SalesChart data={stats.dailyRevenue} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Package size={16} /> Top Products
          </h2>
          {stats.topProducts.length === 0 ? (
            <p className="text-gray-400 text-sm">No sales yet</p>
          ) : (
            <ol className="space-y-3">
              {stats.topProducts.map((p, i) => (
                <li key={p.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.soldCount} sold</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  )
}
