'use client'

import { useState } from 'react'

interface PromoCodeInputProps {
  shopSlug: string
  orderTotalCents: number
  onApply: (code: string, discountCents: number) => void
  onRemove: () => void
  appliedCode: string | null
  discountCents: number
  theme?: 'light' | 'dark'
}

export function PromoCodeInput({ shopSlug, orderTotalCents, onApply, onRemove, appliedCode, discountCents, theme = 'light' }: PromoCodeInputProps) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isDark = theme === 'dark'

  async function handleApply() {
    if (!code.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/discount/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), shopSlug, orderTotal: orderTotalCents }),
      })
      const data = await res.json()
      if (data.valid) {
        onApply(code.trim().toUpperCase(), data.discountAmount)
        setCode('')
      } else {
        setError(data.error || 'Invalid code')
      }
    } catch {
      setError('Could not validate code')
    } finally {
      setLoading(false)
    }
  }

  const borderColor = isDark ? 'rgba(255,255,255,0.15)' : '#ddd'
  const bg = isDark ? 'rgba(255,255,255,0.05)' : '#fff'
  const textColor = isDark ? '#fff' : '#111'
  const mutedColor = isDark ? 'rgba(255,255,255,0.4)' : '#999'

  if (appliedCode) {
    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: `1px solid ${isDark ? 'rgba(120,200,120,0.4)' : '#c3e6cb'}`, background: isDark ? 'rgba(100,200,100,0.08)' : '#f0fff4', borderRadius: 4 }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 600, color: isDark ? '#86efac' : '#276749', letterSpacing: '0.05em' }}>
              {appliedCode}
            </span>
            <span style={{ fontSize: 12, color: isDark ? '#86efac' : '#276749', marginLeft: 8 }}>
              −${(discountCents / 100).toFixed(2)}
            </span>
          </div>
          <button onClick={onRemove} style={{ background: 'none', border: 'none', color: mutedColor, cursor: 'pointer', fontSize: 14, padding: '0 4px' }}>✕</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Promo code"
          value={code}
          onChange={e => { setCode(e.target.value.toUpperCase()); setError(null) }}
          onKeyDown={e => e.key === 'Enter' && handleApply()}
          style={{ flex: 1, padding: '10px 14px', border: `1px solid ${borderColor}`, background: bg, color: textColor, fontSize: 13, fontFamily: 'inherit', outline: 'none', letterSpacing: '0.05em' }}
        />
        <button
          onClick={handleApply}
          disabled={loading || !code.trim()}
          style={{ padding: '10px 16px', background: 'none', border: `1px solid ${borderColor}`, color: textColor, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'inherit', cursor: loading || !code.trim() ? 'not-allowed' : 'pointer', opacity: loading || !code.trim() ? 0.5 : 1, whiteSpace: 'nowrap' }}
        >
          {loading ? '...' : 'Apply'}
        </button>
      </div>
      {error && <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 6 }}>{error}</p>}
    </div>
  )
}
