'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-800">Something went wrong</h2>
      <p className="text-gray-500">We couldn&apos;t load this store page.</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
        >
          Try again
        </button>
        <Link href="/" className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
          Back to Marketplace
        </Link>
      </div>
    </div>
  )
}
