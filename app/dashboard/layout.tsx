import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import './dashboard.css'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const auth = cookieStore.get('mb-dashboard-auth')
  if (!auth) redirect('/dashboard-login')

  return (
    <div className="db-shell">
      <div className="db-bg-grid" />
      <div className="db-bg-scan" />
      <DashboardSidebar />
      <main className="db-main">
        {children}
      </main>
    </div>
  )
}
