import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layouts/Sidebar'
import { Topbar } from '@/components/layouts/Topbar'
import { dateRange, storeName } from '@/data/dashboard'

/** App shell: fixed sidebar + top bar with a scrollable, routed content area. */
export function AdminLayout() {
  return (
 <div className="flex h-screen overflow-hidden bg-[radial-gradient(circle,_#BBCABF_0%,_#E2F6EF_25%,_white_50%,_#E2F6EF_75%,_#BBCABF_100%)]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar storeName={storeName} dateRange={dateRange} notificationCount={8} />
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
