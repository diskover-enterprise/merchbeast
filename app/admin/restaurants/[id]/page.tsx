'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Check, Upload, ArrowLeft } from 'lucide-react'

const FONT_OPTIONS = ['Inter', 'Roboto', 'Playfair Display', 'Oswald', 'Montserrat', 'Dancing Script']

interface Settings {
  name: string
  tagline: string
  description: string
  about: string
  heroHeadline: string
  logo: string
  bannerImage: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  instagram: string
  websiteUrl: string
  address: string
}

const defaults: Settings = {
  name: '', tagline: '', description: '', about: '', heroHeadline: '',
  logo: '', bannerImage: '',
  primaryColor: '#000000', secondaryColor: '#ffffff', accentColor: '#ff6600',
  fontFamily: 'Inter',
  instagram: '', websiteUrl: '', address: '',
}

function ImageUploadButton({ onUploaded }: { onUploaded: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      onUploaded(url)
    }
    setUploading(false)
    e.target.value = ''
  }

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 shrink-0 transition-colors"
      >
        {uploading
          ? <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          : <Upload size={13} />}
        {uploading ? 'Uploading…' : 'Upload'}
      </button>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h2>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      {children}
    </div>
  )
}

export default function AdminRestaurantSettingsPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [form, setForm] = useState<Settings>(defaults)
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/restaurants/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => {
        setSlug(data.slug ?? '')
        setForm({
          name: data.name ?? '',
          tagline: data.tagline ?? '',
          description: data.description ?? '',
          about: data.about ?? '',
          heroHeadline: data.heroHeadline ?? '',
          logo: data.logo ?? '',
          bannerImage: data.bannerImage ?? '',
          primaryColor: data.primaryColor ?? '#000000',
          secondaryColor: data.secondaryColor ?? '#ffffff',
          accentColor: data.accentColor ?? '#ff6600',
          fontFamily: data.fontFamily ?? 'Inter',
          instagram: data.instagram ?? '',
          websiteUrl: data.websiteUrl ?? '',
          address: data.address ?? '',
        })
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load restaurant settings:', err)
        setLoading(false)
      })
  }, [id])

  function set(key: keyof Settings, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    await fetch(`/api/admin/restaurants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const input = (key: keyof Settings) => (
    <input
      value={form[key]}
      onChange={(e) => set(key, e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  )

  const textarea = (key: keyof Settings, rows = 3) => (
    <textarea
      value={form[key]}
      onChange={(e) => set(key, e.target.value)}
      rows={rows}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
    />
  )

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-4 max-w-2xl">
        {[1, 2, 3, 4].map((i) => <div key={i} className="h-32 bg-gray-200 rounded-xl" />)}
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => router.push('/admin/restaurants')}
          className="text-gray-400 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Admin</p>
          <h1 className="text-2xl font-light text-gray-900">{form.name || 'Restaurant'} Settings</h1>
        </div>
      </div>

      {slug && (
        <a
          href={`/restaurants/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-6 text-xs text-gray-500 underline hover:text-gray-900"
        >
          View Storefront →
        </a>
      )}

      <Section title="Brand Identity">
        <Field label="Store Name">
          {input('name')}
        </Field>
        <Field label="Tagline" hint="Short line shown under the logo on the hero.">
          {input('tagline')}
        </Field>
        <Field label="Hero Headline" hint="Large text on the storefront hero. Leave blank to use store name.">
          {input('heroHeadline')}
        </Field>
        <Field label="Brand Description" hint="Editorial quote shown on the storefront.">
          {textarea('description', 2)}
        </Field>
        <Field label="About / Brand Story" hint="Longer text shown below the hero.">
          {textarea('about', 5)}
        </Field>
      </Section>

      <Section title="Media">
        <Field label="Logo" hint="Transparent PNG recommended.">
          <div className="flex gap-2 items-start">
            <div className="flex-1">{input('logo')}</div>
            <ImageUploadButton onUploaded={(url) => set('logo', url)} />
            {form.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.logo} alt="logo" className="w-12 h-12 object-contain border border-gray-200 rounded shrink-0" />
            )}
          </div>
        </Field>
        <Field label="Banner / Hero Image" hint="Wide landscape image (1400×600 recommended).">
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">{input('bannerImage')}</div>
              <ImageUploadButton onUploaded={(url) => set('bannerImage', url)} />
            </div>
            {form.bannerImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.bannerImage} alt="banner" className="w-full h-24 object-cover rounded-lg border border-gray-200" />
            )}
          </div>
        </Field>
      </Section>

      <Section title="Design">
        <Field label="Font Family">
          <select
            value={form.fontFamily}
            onChange={(e) => set('fontFamily', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-3 gap-4">
          {[
            { key: 'primaryColor' as const, label: 'Primary', hint: 'Navbar, hero bg, buttons' },
            { key: 'secondaryColor' as const, label: 'Secondary', hint: 'Page bg, text on primary' },
            { key: 'accentColor' as const, label: 'Accent', hint: 'Labels, highlights' },
          ].map(({ key, label, hint }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-0.5">{label}</label>
              <p className="text-[10px] text-gray-400 mb-2">{hint}</p>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-2 py-1.5">
                <input
                  type="color"
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
                <span className="text-xs font-mono text-gray-600">{form[key]}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">Live preview</p>
          <div className="rounded-lg p-4 flex items-center gap-3" style={{ backgroundColor: form.primaryColor }}>
            <div
              className="w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm shrink-0"
              style={{ backgroundColor: form.accentColor, color: form.secondaryColor }}
            >
              {form.name[0]?.toUpperCase() ?? 'S'}
            </div>
            <div>
              <p className="font-semibold text-sm leading-none" style={{ color: form.secondaryColor, fontFamily: form.fontFamily }}>
                {form.name || 'Store Name'}
              </p>
              {form.tagline && (
                <p className="text-[10px] mt-1 opacity-60" style={{ color: form.secondaryColor }}>
                  {form.tagline}
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Contact & Social">
        <Field label="Instagram URL">
          {input('instagram')}
        </Field>
        <Field label="Website URL">
          {input('websiteUrl')}
        </Field>
        <Field label="Address">
          {input('address')}
        </Field>
      </Section>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-60"
      >
        {saved ? <><Check size={18} /> Saved!</> : saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}
