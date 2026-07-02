import { useState } from 'react'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { dateRange, storeName } from '@/data/dashboard'

export default function App() {
  const [active, setActive] = useState('dashboard')

  return (
    <AdminLayout
      active={active}
      onNavigate={setActive}
      storeName={storeName}
      dateRange={dateRange}
      notificationCount={8}
    >
      {/* Only the Dashboard view is implemented in this POC; other nav items
          are wired up and ready for their own feature modules. */}
      <DashboardPage />
    </AdminLayout>
  )
}
