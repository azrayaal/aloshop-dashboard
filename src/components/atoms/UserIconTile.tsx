import { CrmIcon } from '@/components/icons'

/** Circular avatar placeholder for the signed-in user. */
export function UserIconTile() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-ink-soft">
      <CrmIcon className="h-5 w-5" />
    </span>
  )
}
