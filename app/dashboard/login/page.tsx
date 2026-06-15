'use client'

import { useState } from 'react'

export default function DashboardLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/dashboard/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoading(false)
    if (res.ok) {
      window.location.href = '/dashboard'
    } else {
      setError('Incorrect password.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 380,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '2.5rem 2rem',
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#39ff14', marginBottom: '0.5rem' }}>MERCH BEAST</div>
          <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Dashboard</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#ff4444', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#39ff14',
              color: '#000',
              border: 'none',
              borderRadius: 8,
              padding: '0.85rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
