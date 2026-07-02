import { Card, CardHeader } from '@/components/atoms/Card'
import { IconTile } from '@/components/atoms/IconTile'
import { crmStats } from '@/data/dashboard'

/** Customer relationship snapshot: totals, retention and basket size. */
export function CrmSnapshot() {
  return (
    <Card>
      <CardHeader title="CRM Snapshot" actionLabel="Lihat Detail" />
      <ul className="space-y-4">
        {crmStats.map(({ id, label, value, Icon }) => (
          <li key={id} className="flex items-center gap-3">
            <IconTile tone="neutral">
              <Icon className="h-5 w-5" />
            </IconTile>
            <span className="text-sm text-ink-soft">{label}</span>
            <span className="ml-auto text-sm font-bold text-ink">{value}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
