import { Card } from '@/components/atoms/Card'
import { IconTile } from '@/components/atoms/IconTile'
import { StatDelta } from '@/components/atoms/StatDelta'
import type { Kpi } from '@/types'

interface KpiCardProps {
  kpi: Kpi
}

/** Single KPI tile: icon, label, big value and a delta or caption footer. */
export function KpiCard({ kpi }: KpiCardProps) {
  const { Icon } = kpi
  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2.5">
        <IconTile>
          <Icon className="h-5 w-5" />
        </IconTile>
        <span className="text-sm font-medium leading-tight text-ink-soft">{kpi.label}</span>
      </div>

      <p className="text-3xl font-extrabold tracking-tight text-ink">{kpi.value}</p>

      <div className="text-xs text-ink-muted">
        {kpi.delta != null ? (
          <span className="flex items-center gap-1.5">
            <StatDelta value={kpi.delta} />
            <span>dari periode lalu</span>
          </span>
        ) : (
          <span>{kpi.caption}</span>
        )}
      </div>
    </Card>
  )
}
