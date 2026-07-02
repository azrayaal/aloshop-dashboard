import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
  withWordmark?: boolean
}

/** Aloshop brand mark for the admin console. */
export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      {/* <img src="/iconaloshop.png" alt="Aloshop" className="h-9 w-auto shrink-0 object-contain" /> */}
      {withWordmark && (
        <span className="text-2xl font-extrabold tracking-tight text-ink">
          alo<span className="text-brand-600">shop</span>
        </span>
      )}
    </span>
  )
}
