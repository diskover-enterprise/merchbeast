import Link from 'next/link'
import { GorillaIllustration } from '@/components/storefront/GorillaIllustration'
import { Printer, Layers, Zap, HardHat, ShoppingBag, Scissors } from 'lucide-react'

const services = [
  {
    icon: Printer,
    name: 'Screen Printing',
    desc: 'High-volume, vibrant prints on any garment. Perfect for bold graphics, large runs, and lasting color.',
  },
  {
    icon: Layers,
    name: 'Embroidery',
    desc: 'Precision-stitched logos for caps, polos, and uniforms. The mark of a premium brand.',
  },
  {
    icon: Zap,
    name: 'DTG Printing',
    desc: 'Photo-quality direct-to-garment printing. Full color, no minimums, every detail captured.',
  },
  {
    icon: HardHat,
    name: 'Headwear',
    desc: 'Structured hats, snapbacks, beanies, and caps — customized to your exact brand.',
  },
  {
    icon: ShoppingBag,
    name: 'Bags & Accessories',
    desc: 'Totes, backpacks, aprons, and pouches. Every touchpoint of your brand, covered.',
  },
  {
    icon: Scissors,
    name: 'Cut & Sew',
    desc: 'Fully custom garments built from scratch. Your vision, zero compromises.',
  },
]

const industries = [
  'Restaurants & Food Service',
  'Fitness & Gyms',
  'Sports Teams & Clubs',
  'Schools & Universities',
  'Corporate & Events',
  'Hospitality & Hotels',
  'Healthcare',
  'Retail & E-commerce',
]

const steps = [
  {
    num: '01',
    title: 'Submit Your Vision',
    desc: 'Share your design, quantity, garment type, and any special requests through our simple order form.',
  },
  {
    num: '02',
    title: 'We Produce',
    desc: 'Our team brings your brand to life using premium materials and state-of-the-art equipment.',
  },
  {
    num: '03',
    title: 'Beast Your Brand',
    desc: 'Receive your order. Wear your identity with pride and let your merch do the talking.',
  },
]

export default function HomePage() {
  return (
    <div className="bg-[#0D0D0D]">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-14 py-5 flex items-center justify-between bg-[#0D0D0D]/85 backdrop-blur-sm border-b border-white/[0.06]">
        <span className="font-[family-name:var(--font-beast)] text-xl sm:text-2xl tracking-[0.1em] text-white select-none">
          MERCH BEAST
        </span>
        <nav className="hidden md:flex items-center gap-8">
          {(['Services', 'Industries', 'Process'] as const).map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-[10px] tracking-[0.22em] uppercase text-white/35 hover:text-white/80 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#quote"
          className="border border-white/30 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase text-white/60 hover:border-white hover:text-white transition-colors"
        >
          Get a Quote
        </a>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        {/* Radial depth glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(255,255,255,0.035) 0%, transparent 68%)',
          }}
        />

        {/* Gorilla */}
        <div className="relative z-10 mb-4">
          <GorillaIllustration />
        </div>

        {/* Wordmark */}
        <div className="relative z-10">
          <h1
            className="font-[family-name:var(--font-beast)] text-white leading-none tracking-[0.05em]"
            style={{ fontSize: 'clamp(3.2rem, 10.5vw, 8.5rem)' }}
          >
            MERCH BEAST
          </h1>
          <p className="mt-4 text-[11px] tracking-[0.38em] uppercase text-white/28">
            Custom Print &amp; Embroidery for Every Industry
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quote"
              className="bg-white text-[#0D0D0D] px-10 py-4 text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-white/92 transition-colors"
            >
              Get a Quote →
            </a>
            <a
              href="#services"
              className="border border-white/22 px-10 py-4 text-[11px] tracking-[0.22em] uppercase text-white/45 hover:border-white/50 hover:text-white/70 transition-colors"
            >
              See Services
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white">Scroll</span>
          <div className="w-px h-10 bg-white/50" />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6 sm:px-14 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#8A8680] mb-3">What We Make</p>
          <h2
            className="font-[family-name:var(--font-beast)] text-[#0D0D0D] leading-none tracking-[0.04em] mb-16"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
          >
            PREMIUM MERCH,
            <br />
            EVERY FORMAT.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E2DC]">
            {services.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="bg-[#F8F7F4] p-8 hover:bg-white transition-colors group">
                <Icon size={20} className="text-[#0D0D0D] mb-5 opacity-50 group-hover:opacity-80 transition-opacity" strokeWidth={1.5} />
                <p className="text-sm font-semibold tracking-[0.04em] text-[#0D0D0D] mb-2">{name}</p>
                <p className="text-xs text-[#6B6965] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="py-24 px-6 sm:px-14 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/28 mb-3">Who We Outfit</p>
          <h2
            className="font-[family-name:var(--font-beast)] text-white leading-none tracking-[0.04em] mb-16"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
          >
            EVERY INDUSTRY,
            <br />
            ONE BEAST.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/8">
            {industries.map((industry) => (
              <div
                key={industry}
                className="bg-[#0D0D0D] px-6 py-8 group hover:bg-white/[0.04] transition-colors"
              >
                <p className="text-sm font-medium text-white/55 group-hover:text-white/85 transition-colors leading-snug">
                  {industry}
                </p>
                <div className="mt-3 w-5 h-px bg-white/15 group-hover:w-8 group-hover:bg-white/40 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 px-6 sm:px-14 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#8A8680] mb-3">How It Works</p>
          <h2
            className="font-[family-name:var(--font-beast)] text-[#0D0D0D] leading-none tracking-[0.04em] mb-16"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
          >
            THREE STEPS
            <br />
            TO BEAST.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
            {steps.map(({ num, title, desc }) => (
              <div key={num}>
                <p
                  className="font-[family-name:var(--font-beast)] text-[#EAE6DE] leading-none mb-5"
                  style={{ fontSize: 'clamp(4rem, 7vw, 5.5rem)' }}
                >
                  {num}
                </p>
                <p className="text-sm font-semibold text-[#0D0D0D] mb-2 tracking-[0.04em]">{title}</p>
                <p className="text-xs text-[#6B6965] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE CTA ── */}
      <section id="quote" className="py-32 px-6 sm:px-14 bg-[#0D0D0D] text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/22 mb-6">Get Started</p>
          <h2
            className="font-[family-name:var(--font-beast)] text-white leading-none tracking-[0.04em] mb-8"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
          >
            READY TO BEAST
            <br />
            YOUR BRAND?
          </h2>
          <p className="text-sm text-white/38 leading-relaxed max-w-md mx-auto mb-12">
            From restaurants to gyms, teams to schools — we produce custom merch that represents who you are. No compromises, no shortcuts.
          </p>
          <a
            href="mailto:hello@merchbeast.com"
            className="inline-block bg-white text-[#0D0D0D] px-12 py-5 text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-white/90 transition-colors"
          >
            Request a Quote →
          </a>
          <p className="mt-5 text-[10px] text-white/18 tracking-[0.15em] uppercase">
            hello@merchbeast.com
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A0A0A] border-t border-white/[0.06] py-10 px-6 sm:px-14">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-[family-name:var(--font-beast)] text-xl tracking-[0.1em] text-white">
              MERCH BEAST
            </span>
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/18 mt-1">
              Custom Print &amp; Embroidery
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {(['Services', 'Industries', 'Process'] as const).map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-[10px] tracking-[0.15em] uppercase text-white/28 hover:text-white/55 transition-colors"
              >
                {label}
              </a>
            ))}
            <Link
              href="/dashboard/login"
              className="text-[10px] tracking-[0.15em] uppercase text-white/28 hover:text-white/55 transition-colors"
            >
              Owner Login
            </Link>
          </div>
          <p className="text-[10px] text-white/18">&copy; 2026 Merch Beast. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
