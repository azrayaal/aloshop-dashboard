import { NavLink } from 'react-router-dom'
import { UserBadge } from '@/components/layouts/UserBadge'
import { navItems } from '@/config/navigation'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/cn'

/** Fixed left navigation rail with brand, links and the signed-in user. */
export function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-100 bg-surface">
      {/* <div className="px-6 py-6">
        <Logo />
      </div> */}
      <div className="px-6">
        <img src="/iconaloshop.png" alt="Aloshop" className="shrink-0 object-contain" />
        </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map(({ id, label, path, Icon }) => (
          <NavLink
            key={id}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                isActive
                  ? 'bg-brand-100 text-brand-800'
                  : 'text-ink-soft hover:bg-surface-sunken hover:text-ink',
              )
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <UserBadge
          name={user?.name ?? 'Budi Santoso'}
          role={user?.role ?? 'Seller Admin'}
          onLogout={logout}
        />
      </div>
    </aside>
  )
}
