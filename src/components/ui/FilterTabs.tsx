import { cn } from '@/lib/cn'

export interface FilterTab {
  id: string
  label: string
  count?: number
}

interface FilterTabsProps {
  tabs: FilterTab[]
  active: string
  onChange: (id: string) => void
}

/** Segmented filter tabs (e.g. order status). Client-side only. */
export function FilterTabs({ tabs, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-xl bg-surface-sunken p-1">
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition',
              isActive ? 'bg-surface text-ink shadow-soft' : 'text-ink-soft hover:text-ink',
            )}
          >
            {tab.label}
            {tab.count != null && (
              <span
                className={cn(
                  'rounded-full px-1.5 text-xs font-semibold',
                  isActive ? 'bg-brand-100 text-brand-700' : 'bg-slate-200 text-ink-soft',
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
