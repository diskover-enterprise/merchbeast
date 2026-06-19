'use client'

import { useEffect, useRef, useState } from 'react'
import { Upload, X, Check, ChevronDown, ChevronUp, ExternalLink, Plus, Pencil, Trash2 } from 'lucide-react'

type Shop = {
  id: string
  name: string
  slug: string
  ownerEmail: string
  tagline: string | null
  bannerImage: string | null
  logo: string | null
  primaryColor: string
  accentColor: string
  heroHeadline: string | null
  about: string | null
  instagram: string | null
  websiteUrl: string | null
}

type MerchProduct = {
  id: string
  slug: string
  shopId: string | null
  name: string
  price: string
  images: string[]
  sizes: string[]
  colors: string[]
  description: string
  tag: string | null
  active: boolean
}

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
const COLOR_OPTIONS = ['Black', 'White', 'Grey', 'Navy', 'Red', 'Green', 'Blue', 'Brown', 'Lavender', 'Sand', 'Teal']

const emptyProduct = {
  shopId: '',
  name: '',
  description: '',
  price: '',
  tag: '',
  images: [] as string[],
  sizes: [] as string[],
  colors: [] as string[],
  active: true,
}

function ImageUploadField({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(files: FileList | null) {
    if (!files || !files[0]) return
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', files[0])
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    setUploading(false)
    if (!res.ok) { setError('Upload failed'); return }
    const { url } = await res.json()
    onChange(url)
  }

  return (
    <div className="db-field">
      <label>{label}</label>
      {value && (
        <div style={{ position: 'relative', marginBottom: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--line)' }} />
          <button type="button" onClick={() => onChange('')} style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.65)', border: 'none', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
            <X size={11} />
          </button>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="Paste URL or upload…" style={{ flex: 1, background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '6px 10px', color: 'var(--ink)', fontSize: 12 }} />
        <button type="button" className="db-btn ghost" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? <span className="db-spinner" /> : <Upload size={12} />}
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files)} />
      {error && <p style={{ color: '#ff5050', fontSize: 11, marginTop: 4 }}>{error}</p>}
    </div>
  )
}

function MultiImageUpload({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return
    setUploading(true)
    const uploaded: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (res.ok) { const { url } = await res.json(); uploaded.push(url) }
    }
    onChange([...images, ...uploaded])
    setUploading(false)
  }

  return (
    <div className="db-field">
      <label>Product Images</label>
      {images.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          {images.map((url, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 4, border: '1px solid var(--line)' }} />
              <button type="button" onClick={() => onChange(images.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: -4, right: -4, background: '#ff5050', border: 'none', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                <X size={9} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="text" placeholder="Paste image URL…" onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const v = (e.target as HTMLInputElement).value.trim(); if (v) { onChange([...images, v]);(e.target as HTMLInputElement).value = '' } } }} style={{ flex: 1, background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '6px 10px', color: 'var(--ink)', fontSize: 12 }} />
        <button type="button" className="db-btn ghost" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? <span className="db-spinner" /> : <Upload size={12} />}
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
    </div>
  )
}

function toggleChip<T extends string>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]
}

function ProductModal({ shopId, product, onClose, onSaved }: {
  shopId: string
  product: MerchProduct | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState(product ? {
    shopId: product.shopId || shopId,
    name: product.name,
    description: product.description,
    price: product.price,
    tag: product.tag || '',
    images: product.images,
    sizes: product.sizes,
    colors: product.colors,
    active: product.active,
  } : { ...emptyProduct, shopId })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function save() {
    if (!form.name || !form.price) { setError('Name and price are required.'); return }
    setSaving(true)
    setError('')
    const url = product ? `/api/merch-products/${product.id}` : '/api/merch-products'
    const res = await fetch(url, {
      method: product ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) { onSaved(); onClose() }
    else { const d = await res.json().catch(() => ({})); setError(d.error || 'Save failed') }
  }

  return (
    <div className="db-modal-overlay">
      <div className="db-modal" style={{ maxWidth: 560 }}>
        <div className="db-modal-head">
          <span className="db-modal-title">{product ? 'Edit Product' : 'Add Product'}</span>
          <button className="db-modal-close" onClick={onClose}><X size={13} /></button>
        </div>
        <div className="db-modal-body">
          <div className="db-field-row">
            <div className="db-field">
              <label>Name *</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Boasty Tee — Lavender" />
            </div>
            <div className="db-field">
              <label>Price *</label>
              <input type="text" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="$40.00 CAD" />
            </div>
          </div>
          <div className="db-field">
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} placeholder="Short product description" />
          </div>
          <div className="db-field">
            <label>Category / Tag</label>
            <input type="text" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} placeholder="Tee, Hat, Crewneck…" />
          </div>
          <div className="db-field">
            <label>Sizes</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SIZE_OPTIONS.map(s => (
                <button key={s} type="button" onClick={() => setForm({ ...form, sizes: toggleChip(form.sizes, s) })}
                  style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', background: form.sizes.includes(s) ? 'var(--neon)' : 'var(--bg-2)', color: form.sizes.includes(s) ? '#000' : 'var(--ink)', border: `1px solid ${form.sizes.includes(s) ? 'var(--neon)' : 'var(--line)'}`, fontWeight: form.sizes.includes(s) ? 700 : 400 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="db-field">
            <label>Colors</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {COLOR_OPTIONS.map(c => (
                <button key={c} type="button" onClick={() => setForm({ ...form, colors: toggleChip(form.colors, c) })}
                  style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', background: form.colors.includes(c) ? 'var(--neon)' : 'var(--bg-2)', color: form.colors.includes(c) ? '#000' : 'var(--ink)', border: `1px solid ${form.colors.includes(c) ? 'var(--neon)' : 'var(--line)'}`, fontWeight: form.colors.includes(c) ? 700 : 400 }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <MultiImageUpload images={form.images} onChange={imgs => setForm({ ...form, images: imgs })} />
          {error && <p style={{ color: '#ff5050', fontSize: 12 }}>{error}</p>}
        </div>
        <div className="db-modal-foot">
          <button className="db-btn ghost" onClick={onClose}>Cancel</button>
          <button className="db-btn primary" onClick={save} disabled={saving}>
            <Check size={13} /> {saving ? 'Saving…' : 'Save Product'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ShopEditor({ shop, onSaved }: { shop: Shop; onSaved: (updated: Shop) => void }) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'settings' | 'products'>('settings')
  const [form, setForm] = useState(shop)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [products, setProducts] = useState<MerchProduct[]>([])
  const [productsLoaded, setProductsLoaded] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<MerchProduct | null>(null)

  async function loadProducts() {
    const res = await fetch(`/api/merch-products?shopId=${shop.id}`)
    if (res.ok) setProducts(await res.json())
    setProductsLoaded(true)
  }

  function openTab(tab: 'settings' | 'products') {
    setActiveTab(tab)
    if (tab === 'products' && !productsLoaded) loadProducts()
  }

  function set(key: keyof Shop, val: string) {
    setForm(f => ({ ...f, [key]: val }))
    setMsg('')
  }

  async function save() {
    setSaving(true)
    setMsg('')
    const res = await fetch(`/api/admin/shops/${shop.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) { const updated = await res.json(); setMsg('✓ Saved'); onSaved({ ...form, ...updated }) }
    else setMsg('Failed to save.')
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/merch-products/${id}`, { method: 'DELETE' })
    loadProducts()
  }

  const shopUrl = `/shop/${shop.slug}`

  return (
    <div className="db-card" style={{ marginBottom: 12 }}>
      {/* Header row */}
      <div onClick={() => setOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', cursor: 'pointer', userSelect: 'none' }}>
        {form.bannerImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.bannerImage} alt={form.name} style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid var(--line)', flexShrink: 0 }} />
        ) : (
          <div style={{ width: 56, height: 40, background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 4, flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{form.name}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{form.ownerEmail}</div>
        </div>
        <a href={shopUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color: 'var(--ink-mute)', marginRight: 8 }}>
          <ExternalLink size={13} />
        </a>
        {open ? <ChevronUp size={14} color="var(--ink-mute)" /> : <ChevronDown size={14} color="var(--ink-mute)" />}
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--line)' }}>
            {(['settings', 'products'] as const).map(tab => (
              <button key={tab} onClick={() => openTab(tab)} style={{ padding: '10px 20px', fontSize: 12, fontWeight: activeTab === tab ? 700 : 400, color: activeTab === tab ? 'var(--neon)' : 'var(--ink-mute)', background: 'none', border: 'none', borderBottom: activeTab === tab ? '2px solid var(--neon)' : '2px solid transparent', cursor: 'pointer', textTransform: 'capitalize', letterSpacing: '0.05em' }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Settings tab */}
          {activeTab === 'settings' && (
            <div style={{ padding: '20px' }}>
              <ImageUploadField label="Hero Image" value={form.bannerImage || ''} onChange={v => set('bannerImage', v)} />
              <ImageUploadField label="Logo" value={form.logo || ''} onChange={v => set('logo', v)} />
              <div className="db-field-row">
                <div className="db-field">
                  <label>Shop Name</label>
                  <input type="text" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div className="db-field">
                  <label>Tagline</label>
                  <input type="text" value={form.tagline || ''} onChange={e => set('tagline', e.target.value)} placeholder="Short tagline…" />
                </div>
              </div>
              <div className="db-field">
                <label>Hero Headline</label>
                <input type="text" value={form.heroHeadline || ''} onChange={e => set('heroHeadline', e.target.value)} placeholder="Big text on the hero…" />
              </div>
              <div className="db-field">
                <label>About</label>
                <textarea value={form.about || ''} onChange={e => set('about', e.target.value)} rows={3} placeholder="About this shop…" />
              </div>
              <div className="db-field-row">
                <div className="db-field">
                  <label>Primary Color</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="color" value={form.primaryColor} onChange={e => set('primaryColor', e.target.value)} style={{ width: 40, height: 36, padding: 2, border: '1px solid var(--line)', borderRadius: 4, background: 'var(--bg-2)', cursor: 'pointer' }} />
                    <input type="text" value={form.primaryColor} onChange={e => set('primaryColor', e.target.value)} style={{ flex: 1 }} />
                  </div>
                </div>
                <div className="db-field">
                  <label>Accent Color</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="color" value={form.accentColor} onChange={e => set('accentColor', e.target.value)} style={{ width: 40, height: 36, padding: 2, border: '1px solid var(--line)', borderRadius: 4, background: 'var(--bg-2)', cursor: 'pointer' }} />
                    <input type="text" value={form.accentColor} onChange={e => set('accentColor', e.target.value)} style={{ flex: 1 }} />
                  </div>
                </div>
              </div>
              <div className="db-field-row">
                <div className="db-field">
                  <label>Instagram</label>
                  <input type="text" value={form.instagram || ''} onChange={e => set('instagram', e.target.value)} placeholder="@handle" />
                </div>
                <div className="db-field">
                  <label>Website</label>
                  <input type="text" value={form.websiteUrl || ''} onChange={e => set('websiteUrl', e.target.value)} placeholder="https://…" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <button className="db-btn primary" onClick={save} disabled={saving}>
                  <Check size={13} /> {saving ? 'Saving…' : 'Save Changes'}
                </button>
                {msg && <span style={{ fontSize: 12, color: msg.startsWith('✓') ? 'var(--neon)' : '#ff5050' }}>{msg}</span>}
              </div>
            </div>
          )}

          {/* Products tab */}
          {activeTab === 'products' && (
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <button className="db-btn primary" onClick={() => { setEditingProduct(null); setShowProductModal(true) }}>
                  <Plus size={13} /> Add Product
                </button>
              </div>

              {!productsLoaded ? (
                <div className="db-skeleton" style={{ height: 48 }} />
              ) : products.length === 0 ? (
                <div className="db-empty" style={{ padding: '32px 0' }}>
                  <p className="db-empty-tag">No products yet</p>
                  <p className="db-empty-headline">Add your first product</p>
                </div>
              ) : (
                <div className="db-table-wrap">
                  <table className="db-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Sizes</th>
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
                                <img src={p.images[0]} alt={p.name} style={{ width: 36, height: 36, objectFit: 'contain', background: '#fff', border: '1px solid var(--line)', borderRadius: 3, flexShrink: 0, padding: 2 }} />
                              ) : (
                                <div style={{ width: 36, height: 36, background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 3, flexShrink: 0 }} />
                              )}
                              {p.name}
                            </div>
                          </td>
                          <td>{p.price}</td>
                          <td style={{ fontSize: 11 }}>{p.sizes.join(', ') || '—'}</td>
                          <td className="right">
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                              <button className="db-btn ghost" style={{ padding: '5px 10px' }} onClick={() => { setEditingProduct(p); setShowProductModal(true) }}><Pencil size={12} /></button>
                              <button className="db-btn ghost" style={{ padding: '5px 10px', borderColor: 'rgba(255,80,80,.35)', color: '#ff5050' }} onClick={() => deleteProduct(p.id)}><Trash2 size={12} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {showProductModal && (
        <ProductModal
          shopId={shop.id}
          product={editingProduct}
          onClose={() => setShowProductModal(false)}
          onSaved={loadProducts}
        />
      )}
    </div>
  )
}

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/shops')
      .then(r => r.json())
      .then(data => { setShops(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <>
      <div className="db-sec-head"><span className="num">[ 05 ]</span><span className="label">Shops</span><span className="spacer" /><span>Loading…</span></div>
      <div className="db-content">{[1, 2, 3].map(i => <div key={i} className="db-skeleton" style={{ height: 72, marginBottom: 10 }} />)}</div>
    </>
  )

  return (
    <>
      <div className="db-sec-head">
        <span className="num">[ 05 ]</span>
        <span className="label">Shops</span>
        <span className="spacer" />
        <span>{shops.length}&nbsp;shops</span>
        <span className="blink" />
      </div>

      <div className="db-content">
        {shops.map(shop => (
          <ShopEditor key={shop.id} shop={shop} onSaved={updated => setShops(shops.map(s => s.id === updated.id ? updated : s))} />
        ))}
      </div>
    </>
  )
}
