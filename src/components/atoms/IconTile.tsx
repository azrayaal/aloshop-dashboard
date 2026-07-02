import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface IconTileProps {
  children: ReactNode
  className?: string
  tone?: 'brand' | 'neutral'
}

/** Rounded square icon container used on KPI and summary cards. */
export function IconTile({ children, className, tone = 'brand' }: IconTileProps) {
  return (
    <span
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-xl',
        tone === 'brand' ? 'bg-brand-50 text-brand-600' : 'bg-surface-sunken text-ink-soft',
        className,
      )}
    >
      {children}
    </span>
  )
}
