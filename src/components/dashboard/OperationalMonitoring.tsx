import { Card, CardHeader } from '@/components/atoms/Card'
import { IconTile } from '@/components/atoms/IconTile'
import { StatDelta } from '@/components/atoms/StatDelta'
import { opsMetrics } from '@/data/dashboard'

/** Fulfilment and delivery operational metrics. */
export function OperationalMonitoring() {
  return (
    <Card>
      <CardHeader title="Operational Monitoring" actionLabel="Lihat Detail" />
      <ul className="space-y-5">
        {opsMetrics.map(({ id, label, value, delta, Icon }) => (
          <li key={id} className="flex items-center gap-3">
            <IconTile tone="neutral">
              <Icon className="h-5 w-5" />
            </IconTile>
            <span className="text-sm text-ink-soft">{label}</span>
            <span className="ml-auto text-sm font-bold text-ink">{value}</span>
            <StatDelta value={delta} chip />
          </li>
        ))}
      </ul>
    </Card>
  )
}
