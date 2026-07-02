import { Card } from '@/components/atoms/Card'
import { SalesChart } from '@/components/dashboard/SalesChart'
import { salesData, salesSeries, highlightedIndex } from '@/data/dashboard'

/** "Sales Performance" panel: legend, range selector and the trend chart. */
export function SalesPerformance() {
  return (
    <Card className="flex flex-col p-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-ink">Sales Performance</h3>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {salesSeries.map((s) => (
              <li key={s.key} className="flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                {s.label}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-ink-soft transition hover:bg-surface-subtle"
          >
            Last 30 Days
          </button>
        </div>
      </div>

      <SalesChart data={salesData} series={salesSeries} highlightIndex={highlightedIndex} />
    </Card>
  )
}
