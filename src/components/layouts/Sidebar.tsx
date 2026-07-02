import { Logo } from '@/components/atoms/Logo'
import { UserBadge } from '@/components/layouts/UserBadge'
import { navItems } from '@/config/navigation'
import { cn } from '@/lib/cn'

interface SidebarProps {
  active: string
  onNavigate: (id: string) => void
}

/** Fixed left navigation rail with brand, links and the signed-in user. */
export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-100 bg-surface">
      <div className="px-6 py-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = id === active
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                isActive
                  ? 'bg-brand-100 text-brand-800'
                  : 'text-ink-soft hover:bg-surface-sunken hover:text-ink',
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <UserBadge name="Budi Santoso" role="Seller Admin" />
      </div>
    </aside>
  )
}
