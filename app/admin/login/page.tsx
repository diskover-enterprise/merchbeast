'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('admin-credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)
    console.log('signIn result:', JSON.stringify(res))
    if (res?.ok) {
      window.location.href = '/admin'
    } else {
      setError(`Debug: ok=${res?.ok} error=${res?.error} status=${res?.status} url=${res?.url}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">
            Platform
          </p>
          <h1 className="text-2xl font-light tracking-[0.05em] text-white">
            After Dessert Admin
          </h1>
        </div>

        <div className="bg-white/5 border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="admin@afterdessert.com"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 pr-12 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#0A0A0A] text-xs tracking-[0.2em] uppercase py-4 font-medium hover:bg-white/90 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-[10px] text-white/20 text-center mt-6 tracking-wide">
          admin@afterdessert.com / admin123
        </p>
      </div>
    </div>
  )
}
