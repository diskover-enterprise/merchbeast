'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Package, Settings, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/dashboard',          label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/orders',   label: 'Orders',   icon: ShoppingBag },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="db-sidebar">
      {/* Brand */}
      <div className="db-brand-row">
        <span className="db-dot" />
        <span className="db-brand-text">Merch&nbsp;Beast</span>
      </div>

      {/* User */}
      <div className="db-user-row">
        <div className="db-avatar">
          {session?.user?.image ? (
            <Image src={session.user.image} alt="avatar" width={32} height={32} />
          ) : (
            session?.user?.name?.[0]?.toUpperCase() ?? '?'
          )}
        </div>
        <div className="db-user-info">
          <p className="db-user-name">{session?.user?.name ?? 'Owner'}</p>
          <p className="db-user-email">{session?.user?.email}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="db-nav">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn('db-nav-link', pathname === href && 'active')}
          >
            <Icon />
            {label}
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className="db-signout">
        <button
          className="db-signout-btn"
          onClick={() => signOut({ callbackUrl: '/dashboard/login' })}
        >
          <LogOut />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
