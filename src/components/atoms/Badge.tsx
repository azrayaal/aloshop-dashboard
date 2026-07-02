import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeTone = 'success' | 'brand' | 'neutral' | 'warning' | 'danger'

const toneStyles: Record<BadgeTone, string> = {
  success: 'bg-brand-100 text-brand-700',
  brand: 'bg-brand-600 text-white',
  neutral: 'bg-surface-sunken text-ink-soft',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-600',
}

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}

/** Status pill used for security scores, VAPT status, etc. */
export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
