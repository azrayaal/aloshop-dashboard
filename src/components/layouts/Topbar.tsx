import {
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  HelpIcon,
  SearchIcon,
  StoreIcon,
} from '@/components/icons'

interface TopbarProps {
  storeName: string
  dateRange: string
  notificationCount?: number
}

function PillButton({
  icon,
  label,
  trailingChevron,
}: {
  icon: React.ReactNode
  label: string
  trailingChevron?: boolean
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm font-medium text-ink transition hover:bg-surface-subtle"
    >
      <span className="text-ink-soft">{icon}</span>
      {label}
      {trailingChevron && <ChevronDownIcon className="h-4 w-4 text-ink-muted" />}
    </button>
  )
}

/** Dashboard top bar: global search, store & date filters, notifications. */
export function Topbar({ storeName, dateRange, notificationCount = 0 }: TopbarProps) {
  return (
    <header className="flex items-center gap-4 border-b border-slate-100 bg-surface px-6 py-4">
      <div className="relative w-full max-w-md">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
        <input
          type="search"
          placeholder="Search anything..."
          aria-label="Cari"
          className="w-full rounded-xl border border-slate-200 bg-surface py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-muted focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <PillButton icon={<StoreIcon className="h-5 w-5" />} label={storeName} trailingChevron />
        <PillButton icon={<CalendarIcon className="h-5 w-5" />} label={dateRange} />

        <button
          type="button"
          aria-label="Notifikasi"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-surface-sunken"
        >
          <BellIcon className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute right-1 top-1 flex min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-4 text-white">
              {notificationCount}
            </span>
          )}
        </button>
        <button
          type="button"
          aria-label="Bantuan"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-surface-sunken"
        >
          <HelpIcon className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
