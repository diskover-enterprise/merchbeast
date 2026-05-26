'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface AdminRestaurant {
  id: string
  name: string
  slug: string
  ownerEmail: string
  createdAt: string
  orderCount: number
  revenue: number
}

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<AdminRestaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/shops')
      .then((r) => r.json())
      .then((data) => {
        setRestaurants(data)
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

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-1">Admin</p>
        <h1 className="text-2xl font-light text-gray-900">Restaurants</h1>
      </div>

      <div className="border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Name</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Slug</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Owner Email</th>
              <th className="text-right px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Orders</th>
              <th className="text-right px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Revenue</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-500 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {restaurants.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-900 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{r.slug}</td>
                <td className="px-4 py-3 text-gray-600">{r.ownerEmail}</td>
                <td className="px-4 py-3 text-right text-gray-600">{r.orderCount}</td>
                <td className="px-4 py-3 text-right text-gray-900 font-medium">{formatCurrency(r.revenue)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/shops/${r.id}`}
                      className="text-[10px] tracking-wider uppercase underline text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Edit Settings
                    </Link>
                    <Link
                      href={`/shop/${r.slug}`}
                      target="_blank"
                      className="text-[10px] tracking-wider uppercase underline text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      View Store
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
