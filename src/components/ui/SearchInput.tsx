import { SearchIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

/** Controlled search field used in module toolbars. */
export function SearchInput({ value, onChange, placeholder = 'Search…', className }: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-surface py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-muted focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  )
}
