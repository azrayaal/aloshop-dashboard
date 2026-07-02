import { UserIconTile } from '@/components/atoms/UserIconTile'

interface UserBadgeProps {
  name: string
  role: string
  onLogout?: () => void
}

/** Signed-in user summary with a logout action at the foot of the sidebar. */
export function UserBadge({ name, role, onLogout }: UserBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-2 py-2">
      <UserIconTile />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{name}</p>
        <p className="truncate text-xs text-ink-muted">{role}</p>
      </div>
      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          aria-label="Keluar"
          title="Keluar"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition hover:bg-surface-sunken hover:text-red-500"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="m16 17 5-5-5-5M21 12H9" />
          </svg>
        </button>
      )}
    </div>
  )
}
