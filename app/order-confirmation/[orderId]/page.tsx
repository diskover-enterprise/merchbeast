'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Package } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { MarketplaceNavbar } from '@/components/storefront/MarketplaceNavbar'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ConfirmationContent({ orderId }: { orderId: string }) {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCart()
  const { data: session } = useSession()
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (orderId !== 'success' || confirmed) return

    clearCart()

    if (sessionId) {
      fetch('/api/orders/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          customerName: session?.user?.name ?? 'Guest',
        }),
      }).catch(console.error)
    }

    setConfirmed(true)
  }, [orderId, sessionId, clearCart, session, confirmed])

  const isCustomer = session?.user?.role === 'customer'

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle size={80} className="text-green-500 mb-6" />
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Order Confirmed!</h1>
      <p className="text-gray-500 max-w-md mb-8">
        Thank you for your purchase. You&apos;ll receive a confirmation email shortly.
        The restaurant will fulfill your order.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        {isCustomer && (
          <Link
            href="/account/orders"
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            <Package size={18} /> View My Orders
          </Link>
        )}
        <Link
          href="/"
          className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = use(params)

  return (
    <div className="min-h-screen flex flex-col">
      <MarketplaceNavbar />
      <Suspense>
        <ConfirmationContent orderId={orderId} />
      </Suspense>
    </div>
  )
}
