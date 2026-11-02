'use client'

import { useState } from 'react'
import { LF_LOGO_VERTICAL, footerLinks } from '@/app/products/little-flower-content'

export function LittleFlowerFooter() {
  const [joined, setJoined] = useState(false)

  return (
    <footer className="lf-footer">
      <div className="lf-wrap">
        <div className="lf-footer-top">
          <div className="lf-footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LF_LOGO_VERTICAL} alt="Little Flower Academy" className="lf-footer-logo" />
            <p className="lf-micro">Vancouver, BC · Est. 1927</p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="lf-micro lf-footer-heading">{heading}</p>
              <ul className="lf-footer-list">
                {links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lf-newsletter">
            <p className="lf-micro lf-footer-heading">Newsletter</p>
            <p className="lf-newsletter-title">Join the LFA community</p>
            {joined ? (
              <p className="lf-footer-note">Thank you. You&rsquo;re on the list.</p>
            ) : (
              <form className="lf-newsletter-form" onSubmit={e => { e.preventDefault(); setJoined(true) }}>
                <label htmlFor="lf-email" className="lf-sr">Email address</label>
                <input id="lf-email" type="email" required placeholder="Email address" />
                <button type="submit">Sign up</button>
              </form>
            )}
          </div>
        </div>

        <div className="lf-footer-bottom">
          <span>© {new Date().getFullYear()} Little Flower Academy</span>
          <span>For customer inquiries, contact team@merchbeast.shop</span>
        </div>
      </div>
    </footer>
  )
}
