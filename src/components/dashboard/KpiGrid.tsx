import { KpiCard } from '@/components/dashboard/KpiCard'
import type { Kpi } from '@/types'

interface KpiGridProps {
  kpis: Kpi[]
}

/** Responsive row of KPI cards (6-up on wide screens). */
export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  )
}
