'use client'

import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products, getProduct } from '../products-data'
import '../../merch-homepage.css'
import '../products.css'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = getProduct(slug)
  if (!product) notFound()

  const [activeImg, setActiveImg] = useState(0)

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

      <div className="product-page">
        <div className="mb-container">

          <div className="product-breadcrumb">
            <Link href="/products">← Back to Shop</Link>
          </div>

          <div className="product-layout">

            {/* Images */}
            <div className="product-gallery">
              <div className="product-main-img-wrap">
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="product-main-img"
                />
              </div>
              {product.images.length > 1 && (
                <div className="product-thumbs">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      className={`product-thumb ${i === activeImg ? 'active' : ''}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="product-info">
              {product.tag && <div className="mb-section-label">{product.tag}</div>}
              <h1 className="product-name">{product.name}</h1>
              <p className="product-price">{product.price}</p>
              <p className="product-desc">{product.description}</p>

              {product.sizes && (
                <div className="product-sizes">
                  <p className="product-sizes-label">Available Sizes</p>
                  <div className="product-sizes-grid">
                    {product.sizes.map(s => (
                      <span key={s} className="product-size-chip">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={product.shopifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-btn mb-btn-primary mb-btn-lg product-buy-btn"
              >
                Shop Now
              </a>

              <p className="product-note">You'll be taken to our secure Shopify checkout.</p>
            </div>

          </div>

          {/* Related */}
          <div className="product-related">
            <h2 className="product-related-title">More Drops</h2>
            <div className="shop-grid">
              {products.filter(p => p.slug !== product.slug).slice(0, 3).map(p => (
                <Link href={`/products/${p.slug}`} key={p.slug} className="shop-card">
                  <div className="shop-card-img-wrap">
                    <img src={p.images[0]} alt={p.name} className="shop-card-img" />
                    {p.tag && <span className="shop-card-tag">{p.tag}</span>}
                  </div>
                  <div className="shop-card-info">
                    <h3 className="shop-card-name">{p.name}</h3>
                    <span className="shop-card-price">{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

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
