import { Card, CardHeader } from '@/components/atoms/Card'
import { formatNumber } from '@/lib/format'
import { inventoryHealth, inventorySegments } from '@/data/dashboard'

const SIZE = 120
const STROKE = 12
const R = (SIZE - STROKE) / 2
const C = 2 * Math.PI * R

function HealthDonut({ percent }: { percent: number }) {
  const filled = (percent / 100) * C
  return (
    <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="#e2e8f0" strokeWidth={STROKE} />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="#059669"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${C - filled}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-extrabold text-ink">{percent}%</span>
        <span className="text-[11px] text-ink-muted">Health</span>
      </div>
    </div>
  )
}

/** Inventory health donut with a segmented stock breakdown legend. */
export function InventoryOverview() {
  const max = Math.max(...inventorySegments.map((s) => s.count))
  return (
    <Card>
      <CardHeader title="Inventory Overview" actionLabel="Lihat Detail" />
      <div className="flex items-center gap-5">
        <HealthDonut percent={inventoryHealth} />
        <ul className="flex-1 space-y-3">
          {inventorySegments.map((seg) => (
            <li key={seg.id} className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: seg.color }} />
                <span className="text-ink-soft">{seg.label}</span>
                <span className="ml-auto font-bold text-ink">{formatNumber(seg.count)}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(seg.count / max) * 100}%`, background: seg.color }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
