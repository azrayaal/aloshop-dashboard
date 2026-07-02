import { DownloadIcon } from '@/components/icons'
import { AiInsightsPanel } from '@/components/dashboard/AiInsightsPanel'
import { CrmSnapshot } from '@/components/dashboard/CrmSnapshot'
import { InventoryOverview } from '@/components/dashboard/InventoryOverview'
import { KpiGrid } from '@/components/dashboard/KpiGrid'
import { OperationalMonitoring } from '@/components/dashboard/OperationalMonitoring'
import { SalesPerformance } from '@/components/dashboard/SalesPerformance'
import { SecuritySystem } from '@/components/dashboard/SecuritySystem'
import { adminFirstName, kpis } from '@/data/dashboard'

/** Seller admin "Dashboard Overview" — the default landing view. */
export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Dashboard Overview</h1>
          <p className="mt-1 text-ink-soft">Selamat datang kembali, {adminFirstName}! 👋</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-800"
        >
          <DownloadIcon className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* KPI row */}
      <KpiGrid kpis={kpis} />

      {/* Sales performance + AI insights */}
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <SalesPerformance />
        <AiInsightsPanel />
      </div>

      {/* Bottom summary cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <CrmSnapshot />
        <InventoryOverview />
        <OperationalMonitoring />
        <SecuritySystem />
      </div>
    </div>
  )
}
