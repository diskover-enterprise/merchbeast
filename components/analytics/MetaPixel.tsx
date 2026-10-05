'use client'

import { useEffect } from 'react'

declare global {
  interface Window { fbq?: (...args: any[]) => void; _fbq?: any }
}

function initPixel(pixelId: string) {
  if (typeof window === 'undefined') return
  if (!window.fbq) {
    const fbq: any = function (...args: any[]) { fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args) }
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    window.fbq = fbq
    window._fbq = fbq
    const s = document.createElement('script')
    s.async = true
    s.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(s)
  }
  window.fbq!('init', pixelId)
  window.fbq!('track', 'PageView')
}

export function MetaPixel({ pixelIds }: { pixelIds: (string | null | undefined)[] }) {
  useEffect(() => {
    pixelIds.filter(Boolean).forEach(id => initPixel(id!))
  }, [])
  return null
}
