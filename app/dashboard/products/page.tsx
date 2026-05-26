'use client'

import { useEffect, useRef, useState } from 'react'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Plus, Pencil, Trash2, X, Check, Upload, ImageIcon } from 'lucide-react'

const emptyForm = { name: '', description: '', price: '', category: '', stock: '', images: '' }

function ImageUploader({
  value,
  onChange,
}: {
  value: string
  onChange: (urls: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const urls = value ? value.split(',').map((s) => s.trim()).filter(Boolean) : []

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    setError('')
    const uploaded: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) { setError('Upload failed'); continue }
      const { url } = await res.json()
      uploaded.push(url)
    }
    onChange([...urls, ...uploaded].join(', '))
    setUploading(false)
  }

  function removeUrl(idx: number) {
    onChange(urls.filter((_, i) => i !== idx).join(', '))
  }

  return (
    <div>
      {urls.length > 0 && (
        <div className="db-img-list">
          {urls.map((url, idx) => (
            <div key={idx} className="db-img-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" />
              <button className="db-img-remove" onClick={() => removeUrl(idx)}>
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="db-upload-row">
        <button type="button" className="db-btn ghost" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? <span className="db-spinner" /> : <Upload size={13} />}
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        <button
          type="button"
          className="db-btn ghost"
          onClick={() => {
            const url = prompt('Paste an image URL:')
            if (url?.trim()) onChange([...urls, url.trim()].join(', '))
          }}
        >
          <ImageIcon size={13} /> Paste URL
        </button>
        <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)} />
      </div>
      {error && <p style={{ color: '#ff5050', fontSize: 11, marginTop: 6 }}>{error}</p>}
    </div>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function loadProducts() {
    const data = await fetch('/api/products').then((r) => r.json())
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => { loadProducts() }, [])

  function openAdd() {
    setEditing(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(p: Product) {
    setEditing(p)
    setForm({
      name: p.name,
      description: p.description,
      price: (p.price / 100).toFixed(2),
      category: p.category,
      stock: String(p.stock),
      images: p.images.join(', '),
    })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    const payload = {
      name: form.name,
      description: form.description,
      price: form.price,
      category: form.category,
      stock: form.stock,
      images: form.images ? form.images.split(',').map((s) => s.trim()).filter(Boolean) : [],
    }
    if (editing) {
      await fetch(`/api/products/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }
    setSaving(false)
    setShowForm(false)
    loadProducts()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    loadProducts()
  }

  if (loading) {
    return (
      <>
        <div className="db-sec-head">
          <span className="num">[ 03 ]</span>
          <span className="label">Products</span>
          <span className="spacer" />
          <span>Loading…</span>
        </div>
        <div className="db-content">
          {[1, 2, 3].map((i) => (
            <div key={i} className="db-skeleton" style={{ height: 56, marginBottom: 8 }} />
          ))}
        </div>
      </>
    )
  }

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
        <div className="db-page-head">
          <div />
          <button className="db-btn primary" onClick={openAdd}>
            <Plus size={13} /> Add Product
          </button>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="db-modal-overlay">
            <div className="db-modal">
              <div className="db-modal-head">
                <span className="db-modal-title">{editing ? 'Edit Product' : 'New Product'}</span>
                <button className="db-modal-close" onClick={() => setShowForm(false)}>
                  <X size={13} />
                </button>
              </div>
              <div className="db-modal-body">
                <div className="db-field">
                  <label>Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" />
                </div>
                <div className="db-field">
                  <label>Category</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. T-Shirts" />
                </div>
                <div className="db-field">
                  <label>Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Short product description" />
                </div>
                <div className="db-field-row">
                  <div className="db-field">
                    <label>Price ($)</label>
                    <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
                  </div>
                  <div className="db-field">
                    <label>Stock</label>
                    <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0" />
                  </div>
                </div>
                <div className="db-field">
                  <label>Images</label>
                  <ImageUploader value={form.images} onChange={(v) => setForm({ ...form, images: v })} />
                </div>
              </div>
              <div className="db-modal-foot">
                <button className="db-btn ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="db-btn primary" onClick={handleSave} disabled={saving}>
                  <Check size={13} /> {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}

        {products.length === 0 ? (
          <div className="db-card">
            <div className="db-empty">
              <p className="db-empty-tag">Nothing here yet</p>
              <p className="db-empty-headline" style={{ marginBottom: 20 }}>No Products</p>
              <button className="db-btn primary" onClick={openAdd}>
                <Plus size={13} /> Add First Product
              </button>
            </div>
          </div>
        ) : (
          <div className="db-card">
            <div className="db-table-wrap">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
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
                            <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontWeight: 400 }}>{p.description?.slice(0, 40)}{p.description?.length > 40 ? '…' : ''}</div>
                          </div>
                        </div>
                      </td>
                      <td>{p.category}</td>
                      <td className="strong">{formatCurrency(p.price)}</td>
                      <td style={{ color: p.stock > 0 ? '#00c882' : '#ff5050' }}>{p.stock}</td>
                      <td className="right">
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                          <button className="db-btn ghost" style={{ padding: '5px 10px' }} onClick={() => openEdit(p)}>
                            <Pencil size={12} />
                          </button>
                          <button className="db-btn ghost" style={{ padding: '5px 10px', borderColor: 'rgba(255,80,80,.35)', color: '#ff5050' }} onClick={() => handleDelete(p.id)}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
