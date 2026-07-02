import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
  withWordmark?: boolean
}

/** Aloshop brand mark for the admin console. */
export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden className="shrink-0">
        <path d="M16 5 L28 27 H4 Z" className="fill-brand-600" />
        <path d="M16 14 L22 26 H10 Z" className="fill-brand-300" />
      </svg>
      {withWordmark && (
        <span className="text-2xl font-extrabold tracking-tight text-ink">
          alo<span className="text-brand-600">shop</span>
        </span>
      )}
    </span>
  )
}
