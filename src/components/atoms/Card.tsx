import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/** Base white panel used throughout the dashboard. */
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('rounded-card border border-slate-100 bg-surface p-5 shadow-soft', className)} {...props}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  actionLabel?: string
  onAction?: () => void
}

/** Panel header with a title and an optional right-aligned link. */
export function CardHeader({ title, actionLabel, onAction }: CardHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="text-sm font-semibold text-brand-600 transition hover:text-brand-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
