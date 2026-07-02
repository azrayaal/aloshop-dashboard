import { UserIconTile } from '@/components/atoms/UserIconTile'

interface UserBadgeProps {
  name: string
  role: string
}

/** Signed-in user summary shown at the foot of the sidebar. */
export function UserBadge({ name, role }: UserBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-2 py-2">
      <UserIconTile />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink">{name}</p>
        <p className="truncate text-xs text-ink-muted">{role}</p>
      </div>
    </div>
  )
}
