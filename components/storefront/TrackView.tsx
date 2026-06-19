'use client'

import { useEffect } from 'react'

export function TrackView({ shopId, productSlug }: { shopId: string; productSlug?: string }) {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopId, productSlug }),
    }).catch(() => {})
  }, [shopId, productSlug])
  return null
}
