import type { ReactNode } from 'react'
import { Card } from '@/components/atoms/Card'
import { StatDelta } from '@/components/atoms/StatDelta'
import { cn } from '@/lib/cn'

export interface StatTile {
  id: string
  label: string
  value: string
  icon?: ReactNode
  delta?: number
  caption?: string
  /** Accent colour for the value, e.g. text-red-500 for warnings. */
  valueClassName?: string
}

interface StatTilesProps {
  tiles: StatTile[]
  /** Column count on wide screens. Defaults to the number of tiles (max 5). */
  className?: string
}

/** Compact row of summary stat cards shown above module tables. */
export function StatTiles({ tiles, className }: StatTilesProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-4 md:grid-cols-4', className)}>
      {tiles.map((t) => (
        <Card key={t.id} className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-soft">{t.label}</span>
            {t.icon && (
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-sunken text-ink-soft">
                {t.icon}
              </span>
            )}
          </div>
          <p className={cn('text-2xl font-extrabold tracking-tight text-ink', t.valueClassName)}>
            {t.value}
          </p>
          {t.delta != null ? (
            <StatDelta value={t.delta} />
          ) : (
            t.caption && <span className="text-xs text-ink-muted">{t.caption}</span>
          )}
        </Card>
      ))}
    </div>
  )
}
