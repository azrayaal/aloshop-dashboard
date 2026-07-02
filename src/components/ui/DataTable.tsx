import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface Column<T> {
  /** Column header text. */
  header: string
  /** Cell renderer for a row. */
  cell: (row: T) => ReactNode
  align?: 'left' | 'right' | 'center'
  /** Extra classes applied to the cell + header. */
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  /** Stable key extractor. */
  rowKey: (row: T) => string
  /** Optional row click handler. */
  onRowClick?: (row: T) => void
  emptyLabel?: string
}

const alignClass = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
} as const

/** Reusable, generic data table with a sticky-styled header and hover rows. */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  emptyLabel = 'Tidak ada data',
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-card border border-slate-100 bg-surface shadow-soft">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-surface-subtle">
            {columns.map((col, i) => (
              <th
                key={i}
                className={cn(
                  'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted',
                  alignClass[col.align ?? 'left'],
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-ink-muted">
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  'border-b border-slate-50 last:border-0 transition',
                  onRowClick && 'cursor-pointer hover:bg-surface-subtle',
                )}
              >
                {columns.map((col, i) => (
                  <td
                    key={i}
                    className={cn(
                      'px-4 py-3.5 text-ink',
                      alignClass[col.align ?? 'left'],
                      col.className,
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
