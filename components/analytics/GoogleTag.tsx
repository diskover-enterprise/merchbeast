'use client'

import { useEffect } from 'react'

declare global {
  interface Window { dataLayer?: any[] }
}

function initGTM(gtmId: string) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(s)
}

export function GoogleTag({ gtmIds }: { gtmIds: (string | null | undefined)[] }) {
  useEffect(() => {
    gtmIds.filter(Boolean).forEach(id => initGTM(id!))
  }, [])
  return null
}
