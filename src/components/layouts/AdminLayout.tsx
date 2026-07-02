import type { ReactNode } from 'react'
import { Sidebar } from '@/components/layouts/Sidebar'
import { Topbar } from '@/components/layouts/Topbar'

interface AdminLayoutProps {
  active: string
  onNavigate: (id: string) => void
  storeName: string
  dateRange: string
  notificationCount?: number
  children: ReactNode
}

/** App shell: fixed sidebar + top bar with a scrollable content area. */
export function AdminLayout({
  active,
  onNavigate,
  storeName,
  dateRange,
  notificationCount,
  children,
}: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-subtle">
      <Sidebar active={active} onNavigate={onNavigate} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar storeName={storeName} dateRange={dateRange} notificationCount={notificationCount} />
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  )
}
