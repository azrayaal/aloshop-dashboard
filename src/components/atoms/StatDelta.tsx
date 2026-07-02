import { TrendDownIcon, TrendUpIcon } from '@/components/icons'
import { cn } from '@/lib/cn'
import { formatPct } from '@/lib/format'

interface StatDeltaProps {
  /** Signed delta value; sign determines direction and colour. */
  value: number
  className?: string
  /** Render a compact chip (used inside the small monitoring cards). */
  chip?: boolean
}

/** Directional percentage delta with an up/down trend arrow. */
export function StatDelta({ value, className, chip = false }: StatDeltaProps) {
  const positive = value >= 0
  const Icon = positive ? TrendUpIcon : TrendDownIcon
  const color = positive ? 'text-brand-600' : 'text-red-500'
  const chipBg = positive ? 'bg-brand-50' : 'bg-red-50'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 text-xs font-semibold',
        color,
        chip && cn('rounded-md px-1.5 py-0.5', chipBg),
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {formatPct(Math.abs(value))}
    </span>
  )
}
