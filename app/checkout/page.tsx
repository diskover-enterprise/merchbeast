'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/lib/utils'
import { MarketplaceNavbar } from '@/components/storefront/MarketplaceNavbar'
import { ShoppingBag, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function CheckoutPage() {
  const { cart, total, mounted } = useCart()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isCustomer = session?.user?.role === 'customer'

  async function handleCheckout() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          customerEmail: isCustomer ? session?.user?.email : undefined,
          successUrl: `${window.location.origin}/order-confirmation/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout`,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Failed to start checkout. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <MarketplaceNavbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
          <ShoppingBag size={64} className="opacity-20" />
          <p className="text-xl">Your cart is empty</p>
          <Link href="/" className="text-gray-900 underline hover:no-underline">Browse Restaurants</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MarketplaceNavbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} <span className="text-gray-400">× {item.quantity}</span>
                </span>
                <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {isCustomer ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-sm text-green-800 flex items-center gap-2">
            <span className="text-base">✓</span>
            Checking out as <strong>{session?.user?.email}</strong>. Your order will be saved to your account.
          </div>
        ) : (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 text-sm text-orange-800 flex items-center justify-between gap-3">
            <span>
              <Link href="/account/login?callbackUrl=/checkout" className="font-semibold underline">Sign in</Link>
              {' '}or{' '}
              <Link href="/account/signup" className="font-semibold underline">create an account</Link>
              {' '}to save your order history.
            </span>
            <Link href="/account/login?callbackUrl=/checkout" className="shrink-0">
              <LogIn size={18} />
            </Link>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
          🔒 You&apos;ll be redirected to Stripe&apos;s secure checkout. Use test card <strong>4242 4242 4242 4242</strong>.
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Redirecting to Stripe...' : `Pay ${formatCurrency(total)}`}
        </button>
      </main>
    </div>
  )
}
