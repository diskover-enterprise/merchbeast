'use client'

import { products } from '@/app/products/products-data'
import { ImageIcon } from 'lucide-react'

export default function ProductsPage() {
  return (
    <>
      <div className="db-sec-head">
        <span className="num">[ 03 ]</span>
        <span className="label">Products</span>
        <span className="spacer" />
        <span>{products.length}&nbsp;items</span>
        <span className="blink" />
      </div>

      <div className="db-content">
        <div className="db-card">
          <div className="db-table-wrap">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Tag</th>
                  <th>Price</th>
                  <th>Sizes</th>
                  <th>Colors</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug}>
                    <td className="strong">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {p.images[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.images[0]} alt={p.name} style={{ width: 36, height: 36, objectFit: 'cover', border: '1px solid var(--line)', flexShrink: 0 }} />
                        ) : (
                          <div style={{ width: 36, height: 36, background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <ImageIcon size={14} style={{ color: 'var(--ink-mute)' }} />
                          </div>
                        )}
                        <div>
                          <span>{p.name}</span>
                          <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontWeight: 400 }}>{p.description?.slice(0, 50)}{(p.description?.length ?? 0) > 50 ? '…' : ''}</div>
                        </div>
                      </div>
                    </td>
                    <td>{p.tag || '—'}</td>
                    <td className="strong">{p.price}</td>
                    <td>{p.sizes?.join(', ') || '—'}</td>
                    <td>{p.colors?.join(', ') || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
