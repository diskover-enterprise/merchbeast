'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { OrderStatusBadge } from '@/components/ui/OrderStatusBadge'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

interface OrderItem {
  id: string
  quantity: number
  priceAtPurchase: number
  product: { name: string; images: string[] } | null
}

interface Order {
  id: string
  status: string
  total: number
  createdAt: string
  restaurant: { name: string; slug: string; primaryColor: string; accentColor: string }
  items: OrderItem[]
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/account/orders')
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-40" />
        {[1, 2].map((i) => <div key={i} className="h-32 bg-gray-200 rounded-xl" />)}
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <ShoppingBag size={56} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg mb-4">No orders yet</p>
          <Link href="/" className="text-orange-500 font-medium hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ backgroundColor: order.restaurant.primaryColor }}
              >
                <Link
                  href={`/restaurants/${order.restaurant.slug}`}
                  className="font-semibold text-sm hover:underline"
                  style={{ color: '#fff' }}
                >
                  {order.restaurant.name}
                </Link>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className="px-5 py-4">
                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">
                        {item.product?.name ?? 'Product'}{' '}
                        <span className="text-gray-400">× {item.quantity}</span>
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.priceAtPurchase * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </span>
                  <span className="font-bold text-gray-900">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
