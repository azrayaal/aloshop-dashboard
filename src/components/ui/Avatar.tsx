import { cn } from '@/lib/cn'

interface AvatarProps {
  name: string
  className?: string
}

const palette = [
  'bg-brand-100 text-brand-700',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-rose-100 text-rose-700',
]

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

/** Circular initials avatar with a deterministic colour from the name. */
export function Avatar({ name, className }: AvatarProps) {
  const tone = palette[name.charCodeAt(0) % palette.length]
  return (
    <span
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold',
        tone,
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
