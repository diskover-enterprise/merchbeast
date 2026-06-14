'use client'

import Link from 'next/link'
import { products } from './products-data'
import '../merch-homepage.css'
import './products.css'

export default function ProductsPage() {
  return (
    <div className="mb-page">

      <header className="mb-nav">
        <a href="/" className="mb-logo">
          <span className="mb-logo-dot" />
          MERCH&nbsp;BEAST
        </a>
        <nav className="mb-nav-links">
          <a href="/#services">Services</a>
          <a href="/#work">Work</a>
          <a href="/#how">Process</a>
          <a href="/products" style={{color:'var(--green)'}}>Shop</a>
          <a href="/#cta" className="mb-btn-nav">Get A Quote</a>
        </nav>
      </header>

      <section className="shop-hero">
        <div className="mb-container">
          <div className="mb-eyebrow">Lunch Lady x Merch Beast</div>
          <h1 className="shop-title">THE DROP</h1>
          <p className="shop-sub">Premium apparel for those who move different.</p>
        </div>
      </section>

      <section className="shop-grid-section">
        <div className="mb-container">
          <div className="shop-grid">
            {products.map(product => (
              <Link href={`/products/${product.slug}`} key={product.slug} className="shop-card">
                <div className="shop-card-img-wrap">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="shop-card-img"
                  />
                  {product.tag && <span className="shop-card-tag">{product.tag}</span>}
                </div>
                <div className="shop-card-info">
                  <h3 className="shop-card-name">{product.name}</h3>
                  <span className="shop-card-price">{product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="mb-footer">
        <div className="mb-footer-brand">
          <span className="mb-logo-dot" />
          MERCH BEAST
        </div>
        <p className="mb-footer-copy">© 2026 Merch Beast. All rights reserved.</p>
        <nav className="mb-footer-links">
          <a href="mailto:team@merchbeast.shop">team@merchbeast.shop</a>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
        </nav>
      </footer>

    </div>
  )
}
