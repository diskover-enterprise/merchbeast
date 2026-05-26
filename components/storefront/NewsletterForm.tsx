'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <section className="py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.2em] uppercase font-medium text-white/50 mb-4">
            Newsletter
          </p>
          <h2
            className="font-[family-name:var(--font-display)] text-5xl font-light leading-[0.95] mb-4"
          >
            Stay in the loop.
          </h2>
          <p className="text-sm text-white/60 mb-8 leading-relaxed">
            Get first access to new drops and exclusive releases.
          </p>
          {subscribed ? (
            <p className="text-sm tracking-wider uppercase text-white/70">
              You&apos;re subscribed. Thanks.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="border border-white px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-[#0A0A0A] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
