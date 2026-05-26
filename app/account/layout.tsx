import { MarketplaceNavbar } from '@/components/storefront/MarketplaceNavbar'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketplaceNavbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
