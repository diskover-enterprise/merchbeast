'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Package, Settings, LogOut, DollarSign } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/dashboard',          label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/orders',   label: 'Orders',   icon: ShoppingBag },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/commissions', label: 'Commissions', icon: DollarSign },
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
            /* Beast face mascot */
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
              {/* Ear spikes */}
              <path d="M9 13 L6 7 L12 11 Z" fill="rgba(91,108,255,0.25)" stroke="#5b6cff" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M23 13 L26 7 L20 11 Z" fill="rgba(91,108,255,0.25)" stroke="#5b6cff" strokeWidth="1.2" strokeLinejoin="round"/>
              {/* Head */}
              <path d="M8 14 Q7 8 16 7 Q25 8 24 14 L24 21 Q23 27 16 28 Q9 27 8 21 Z"
                fill="rgba(91,108,255,0.12)" stroke="#5b6cff" strokeWidth="1.4"/>
              {/* Brow ridge */}
              <path d="M10 15 Q13 12 16 13 Q19 12 22 15" stroke="#5b6cff" strokeWidth="1.3" fill="none"/>
              {/* Eyes */}
              <ellipse cx="13" cy="17" rx="2.2" ry="2.2" fill="#5b6cff" style={{filter:'drop-shadow(0 0 3px #5b6cff)'}}/>
              <ellipse cx="19" cy="17" rx="2.2" ry="2.2" fill="#5b6cff" style={{filter:'drop-shadow(0 0 3px #5b6cff)'}}/>
              {/* Slit pupils */}
              <ellipse cx="13" cy="17" rx="0.7" ry="1.8" fill="#020408"/>
              <ellipse cx="19" cy="17" rx="0.7" ry="1.8" fill="#020408"/>
              {/* Teeth */}
              <path d="M12 23 L14 20.5 L16 23 L18 20.5 L20 23" stroke="#eef0fa" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <div className="db-user-info">
          <p className="db-user-name">{session?.user?.name ?? 'Shop'}</p>
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
