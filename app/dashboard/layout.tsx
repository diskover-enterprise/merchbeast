import './dashboard.css'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
