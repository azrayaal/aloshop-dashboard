import { cn } from '@/lib/cn'

export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand'

const toneStyles: Record<StatusTone, string> = {
  success: 'bg-brand-50 text-brand-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-600',
  info: 'bg-blue-50 text-blue-600',
  neutral: 'bg-slate-100 text-ink-soft',
  brand: 'bg-brand-600 text-white',
}

/** Maps a domain status label to a colour tone. Falls back to neutral. */
const statusToneMap: Record<string, StatusTone> = {
  // orders / fulfilment
  completed: 'success',
  delivered: 'success',
  paid: 'success',
  active: 'success',
  shipped: 'info',
  processing: 'info',
  'in transit': 'info',
  pending: 'warning',
  'awaiting payment': 'warning',
  draft: 'neutral',
  'low stock': 'warning',
  'out of stock': 'danger',
  'in stock': 'success',
  cancelled: 'danger',
  refunded: 'danger',
  failed: 'danger',
  churned: 'danger',
  // generic health
  healthy: 'success',
  passed: 'success',
  excellent: 'success',
  warning: 'warning',
  critical: 'danger',
  online: 'success',
  offline: 'neutral',
}

interface StatusPillProps {
  status: string
  /** Force a tone instead of inferring from the label. */
  tone?: StatusTone
  className?: string
  dot?: boolean
}

export function StatusPill({ status, tone, className, dot = true }: StatusPillProps) {
  const resolved = tone ?? statusToneMap[status.toLowerCase()] ?? 'neutral'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize',
        toneStyles[resolved],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {status}
    </span>
  )
}
