import Link from 'next/link'

const navLinks = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/restaurants', label: 'Restaurants' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col bg-[#0A0A0A] h-full">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-[9px] tracking-[0.4em] uppercase text-white/30 mb-1">Platform</p>
          <span className="text-sm font-medium tracking-wider text-white">AFTER DESSERT</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white hover:bg-white/5 transition-colors rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-[9px] tracking-wider uppercase text-white/20">Admin Portal</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  )
}
