import { Card, CardHeader } from '@/components/atoms/Card'
import { Badge } from '@/components/atoms/Badge'
import { securityRows } from '@/data/dashboard'

/** Security & system health summary with status badges. */
export function SecuritySystem() {
  return (
    <Card>
      <CardHeader title="Security & System" actionLabel="Lihat Detail" />
      <ul className="space-y-5">
        {securityRows.map(({ id, label, value, status, statusTone, Icon }) => (
          <li key={id} className="flex items-center gap-3">
            <span className="text-ink-soft">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm text-ink-soft">{label}</span>
            <div className="ml-auto flex items-center gap-2">
              {value && <span className="text-sm font-bold text-ink">{value}</span>}
              <Badge tone={statusTone}>{status}</Badge>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
