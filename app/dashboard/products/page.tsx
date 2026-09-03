'use client'

import { useEffect, useRef, useState } from 'react'
import { ImageIcon, Plus, Pencil, Trash2, X, Check, Upload, Copy } from 'lucide-react'
import { products as staticProducts } from '@/app/products/products-data'

type Shop = { id: string; name: string; slug: string }

type MerchProduct = {
  id: string
  slug: string
  shopId: string | null
  name: string
  description: string
  price: string
  images: string[]
  sizes: string[]
  colors: string[]
  tag: string | null
  active: boolean
}

const emptyForm = {
  shopId: '',
  name: '',
  description: '',
  price: '',
  tag: '',
  images: [] as string[],
  sizes: [] as string[],
  colors: [] as string[],
  active: true,
  stock: '',
}

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
const COLOR_OPTIONS = ['Black', 'White', 'Ivory', 'Grey', 'Navy', 'Red', 'Green', 'Blue', 'Brown']

function ImageUploader({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState('')

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
    onChange([...images, ...uploaded])
    setUploading(false)
  }

  function addUrl() {
    const url = urlInput.trim()
    if (!url) return
    onChange([...images, url])
    setUrlInput('')
  }

  return (
    <div>
      {images.length > 0 && (
        <div className="db-img-list" style={{ marginBottom: 10 }}>
          {images.map((url, idx) => (
            <div key={idx} className="db-img-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" />
              <button className="db-img-remove" type="button" onClick={() => onChange(images.filter((_, i) => i !== idx))}>
                <X size={11} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          type="text"
          placeholder="Paste image URL…"
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addUrl())}
          style={{ flex: 1, background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '6px 10px', color: 'var(--ink)', fontSize: 12 }}
        />
        <button type="button" className="db-btn ghost" onClick={addUrl}>Add</button>
      </div>
      <button type="button" className="db-btn ghost" onClick={() => inputRef.current?.click()} disabled={uploading}>
        {uploading ? <span className="db-spinner" /> : <Upload size={13} />}
        {uploading ? 'Uploading…' : 'Upload File'}
      </button>
      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
      {error && <p style={{ color: '#ff5050', fontSize: 11, marginTop: 6 }}>{error}</p>}
    </div>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 36, height: 20, borderRadius: 10, background: checked ? 'var(--neon)' : 'var(--bg-2)',
          border: '1px solid var(--line)', position: 'relative', transition: 'background .2s', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: 2, left: checked ? 17 : 2,
          width: 14, height: 14, borderRadius: '50%', background: checked ? '#000' : 'var(--ink-mute)',
          transition: 'left .2s',
        }} />
      </div>
      <span style={{ fontSize: 13, color: 'var(--ink)' }}>{label}</span>
    </label>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<MerchProduct[]>([])
  const [shops, setShops] = useState<Shop[]>([])
  const [filterShopId, setFilterShopId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<MerchProduct | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    fetch('/api/admin/shops').then(r => r.json()).then(setShops).catch(() => {})
  }, [])

  async function load() {
    try {
      const url = filterShopId ? `/api/merch-products?shopId=${filterShopId}` : '/api/merch-products'
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) throw new Error(`${res.status}`)
      const data = await res.json()
      if (data.length === 0) {
        // Fall back to hardcoded products before DB is connected
        setProducts(staticProducts.map((p, i) => ({
          id: p.slug,
          slug: p.slug,
          name: p.name,
          description: p.description,
          price: p.price,
          images: p.images,
          sizes: p.sizes || [],
          colors: p.colors || [],
          tag: p.tag || null,
          active: true,
        })))
      } else {
        setProducts(data)
      }
    } catch {
      // API not available yet — show static products
      setProducts(staticProducts.map((p) => ({
        id: p.slug,
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        images: p.images,
        sizes: p.sizes || [],
        colors: p.colors || [],
        tag: p.tag || null,
        active: true,
      })))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [filterShopId])

  function openAdd() {
    setEditing(null)
    setForm(emptyForm)
    setSaveError('')
    setShowForm(true)
  }

  function openEdit(p: MerchProduct) {
    setEditing(p)
    setForm({ shopId: p.shopId || '', name: p.name, description: p.description, price: p.price, tag: p.tag || '', images: p.images, sizes: p.sizes, colors: p.colors, active: p.active, stock: p.stock != null ? String(p.stock) : '' })
    setSaveError('')
    setShowForm(true)
  }

  function openDuplicate(p: MerchProduct) {
    setEditing(null) // treat as new product
    setForm({ shopId: p.shopId || '', name: `${p.name} (Copy)`, description: p.description, price: p.price, tag: p.tag || '', images: p.images, sizes: p.sizes, colors: p.colors, active: false, stock: p.stock != null ? String(p.stock) : '' })
    setSaveError('')
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name || !form.price) { setSaveError('Name and price are required.'); return }
    setSaving(true)
    setSaveError('')
    try {
      const url = editing ? `/api/merch-products/${editing.id}` : '/api/merch-products'
      const res = await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || `Error ${res.status}`)
      }
      setShowForm(false)
      load()
    } catch (e: any) {
      setSaveError(e.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/merch-products/${id}`, { method: 'DELETE' })
    load()
  }

  function toggleChip<T extends string>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]
  }

  if (loading) return (
    <>
      <div className="db-sec-head"><span className="num">[ 03 ]</span><span className="label">Products</span><span className="spacer" /><span>Loading…</span></div>
      <div className="db-content">{[1,2,3].map(i => <div key={i} className="db-skeleton" style={{ height: 56, marginBottom: 8 }} />)}</div>
    </>
  )

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
        {error && (
          <p style={{ color: '#ff5050', fontFamily: 'monospace', marginBottom: 16 }}>Error: {error}</p>
        )}

        <div className="db-page-head">
          <select
            value={filterShopId}
            onChange={e => setFilterShopId(e.target.value)}
            style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '6px 12px', color: 'var(--ink)', fontSize: 12 }}
          >
            <option value="">All Shops</option>
            {shops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <button className="db-btn primary" onClick={openAdd}><Plus size={13} /> Add Product</button>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="db-modal-overlay">
            <div className="db-modal" style={{ maxWidth: 560 }}>
              <div className="db-modal-head">
                <span className="db-modal-title">{editing ? 'Edit Product' : 'New Product'}</span>
                <button className="db-modal-close" onClick={() => setShowForm(false)}><X size={13} /></button>
              </div>
              <div className="db-modal-body">
                <div className="db-field">
                  <label>Shop *</label>
                  <select value={form.shopId} onChange={e => setForm({ ...form, shopId: e.target.value })} style={{ width: '100%', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '8px 10px', color: 'var(--ink)', fontSize: 13 }}>
                    <option value="">Select a shop…</option>
                    {shops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="db-field">
                  <label>Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Boasty Tee — Lavender" />
                </div>
                <div className="db-field-row">
                  <div className="db-field">
                    <label>Price *</label>
                    <input type="text" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="$45.00 CAD" />
                  </div>
                  <div className="db-field">
                    <label>Tag</label>
                    <input type="text" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} placeholder="Tee, Crewneck, Cap…" />
                  </div>
                </div>
                <div className="db-field">
                  <label>Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Short product description" />
                </div>
                <div className="db-field">
                  <label>Sizes</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {SIZE_OPTIONS.map(s => (
                      <button
                        key={s} type="button"
                        onClick={() => setForm({ ...form, sizes: toggleChip(form.sizes, s) })}
                        style={{
                          padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                          background: form.sizes.includes(s) ? 'var(--neon)' : 'var(--bg-2)',
                          color: form.sizes.includes(s) ? '#000' : 'var(--ink)',
                          border: `1px solid ${form.sizes.includes(s) ? 'var(--neon)' : 'var(--line)'}`,
                          fontWeight: form.sizes.includes(s) ? 700 : 400,
                        }}
                      >{s}</button>
                    ))}
                  </div>
                </div>
                <div className="db-field">
                  <label>Colors</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {COLOR_OPTIONS.map(c => (
                      <button
                        key={c} type="button"
                        onClick={() => setForm({ ...form, colors: toggleChip(form.colors, c) })}
                        style={{
                          padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                          background: form.colors.includes(c) ? 'var(--neon)' : 'var(--bg-2)',
                          color: form.colors.includes(c) ? '#000' : 'var(--ink)',
                          border: `1px solid ${form.colors.includes(c) ? 'var(--neon)' : 'var(--line)'}`,
                          fontWeight: form.colors.includes(c) ? 700 : 400,
                        }}
                      >{c}</button>
                    ))}
                  </div>
                </div>
                <div className="db-field">
                  <label>Images</label>
                  <ImageUploader images={form.images} onChange={imgs => setForm({ ...form, images: imgs })} />
                </div>
                <div className="db-field">
                  <label>Limited Edition Stock <span style={{ color: 'var(--ink-mute)', fontWeight: 400 }}>(leave blank for unlimited)</span></label>
                  <input type="number" min="0" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} placeholder="e.g. 100" />
                </div>
                <div className="db-field">
                  <Toggle label="Active (visible in store)" checked={form.active} onChange={v => setForm({ ...form, active: v })} />
                </div>
                {saveError && <p style={{ color: '#ff5050', fontSize: 12, marginTop: 4 }}>{saveError}</p>}
              </div>
              <div className="db-modal-foot">
                <button className="db-btn ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="db-btn primary" onClick={handleSave} disabled={saving}>
                  <Check size={13} /> {saving ? 'Saving…' : 'Save Product'}
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
              <button className="db-btn primary" onClick={openAdd}><Plus size={13} /> Add First Product</button>
            </div>
          </div>
        ) : (
          <div className="db-card">
            <div className="db-table-wrap">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Tag</th>
                    <th>Price</th>
                    <th>Sizes</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
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
                            <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontWeight: 400 }}>{p.description?.slice(0, 45)}{(p.description?.length ?? 0) > 45 ? '…' : ''}</div>
                          </div>
                        </div>
                      </td>
                      <td>{p.tag || '—'}</td>
                      <td className="strong">{p.price}</td>
                      <td style={{ fontSize: 11 }}>{p.sizes.join(', ') || '—'}</td>
                      <td>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: p.active ? 'rgba(57,255,20,.12)' : 'rgba(255,80,80,.12)', color: p.active ? 'var(--neon)' : '#ff5050' }}>
                          {p.active ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="right">
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                          <button className="db-btn ghost" style={{ padding: '5px 10px' }} title="Duplicate" onClick={() => openDuplicate(p)}><Copy size={12} /></button>
                          <button className="db-btn ghost" style={{ padding: '5px 10px' }} onClick={() => openEdit(p)}><Pencil size={12} /></button>
                          <button className="db-btn ghost" style={{ padding: '5px 10px', borderColor: 'rgba(255,80,80,.35)', color: '#ff5050' }} onClick={() => handleDelete(p.id)}><Trash2 size={12} /></button>
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
