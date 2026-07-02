import { PageHeader } from '@/components/ui/PageHeader'
import { StatTiles, type StatTile } from '@/components/ui/StatTiles'
import { Card, CardHeader } from '@/components/atoms/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { StatusPill } from '@/components/ui/StatusPill'
import { ClockIcon, DeliveryIcon, OperationsIcon, TargetIcon } from '@/components/icons'

const stats: StatTile[] = [
  { id: 'fulfillment', label: 'Fulfillment Rate', value: '96%', delta: 2.1, icon: <DeliveryIcon className="h-4 w-4" /> },
  { id: 'sla', label: 'SLA Compliance', value: '94.2%', delta: 1.3, icon: <TargetIcon className="h-4 w-4" /> },
  { id: 'pick', label: 'Avg Pick Time', value: '4.2 min', delta: -8.1, icon: <ClockIcon className="h-4 w-4" /> },
  { id: 'queue', label: 'Open Tasks', value: '38', caption: 'Perlu ditindak', valueClassName: 'text-amber-600' },
]

const capacity = [
  { label: 'Gudang Pusat', pct: 82, tone: 'bg-brand-500' },
  { label: 'Gudang BSD', pct: 64, tone: 'bg-brand-500' },
  { label: 'Gudang Bandung', pct: 91, tone: 'bg-amber-500' },
  { label: 'Gudang Surabaya', pct: 48, tone: 'bg-brand-500' },
]

interface Task {
  id: string
  type: string
  store: string
  assignee: string
  priority: string
  status: string
}

const tasks: Task[] = [
  { id: 'TSK-501', type: 'Restock', store: 'Gudang Pusat', assignee: 'Tim A', priority: 'High', status: 'Processing' },
  { id: 'TSK-502', type: 'Pick & Pack', store: 'Aloshop Kemang', assignee: 'Tim B', priority: 'Medium', status: 'Pending' },
  { id: 'TSK-503', type: 'Quality Check', store: 'Gudang BSD', assignee: 'Tim C', priority: 'Low', status: 'Completed' },
  { id: 'TSK-504', type: 'Cycle Count', store: 'Gudang Bandung', assignee: 'Tim A', priority: 'High', status: 'Pending' },
  { id: 'TSK-505', type: 'Restock', store: 'Aloshop Surabaya', assignee: 'Tim D', priority: 'Medium', status: 'Processing' },
]

const priorityTone: Record<string, 'danger' | 'warning' | 'neutral'> = {
  High: 'danger',
  Medium: 'warning',
  Low: 'neutral',
}

const columns: Column<Task>[] = [
  { header: 'Task ID', cell: (t) => <span className="font-semibold text-ink">{t.id}</span> },
  { header: 'Type', cell: (t) => t.type },
  { header: 'Location', cell: (t) => <span className="text-ink-soft">{t.store}</span> },
  { header: 'Assignee', cell: (t) => <span className="text-ink-soft">{t.assignee}</span> },
  { header: 'Priority', cell: (t) => <StatusPill status={t.priority} tone={priorityTone[t.priority]} /> },
  { header: 'Status', cell: (t) => <StatusPill status={t.status} /> },
]

export function OperationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Operations" subtitle="Monitoring fulfillment, SLA, dan kapasitas gudang" />

      <StatTiles tiles={stats} />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.5fr]">
        <Card>
          <CardHeader title="Warehouse Capacity" />
          <ul className="space-y-4">
            {capacity.map((c) => (
              <li key={c.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{c.label}</span>
                  <span className="text-ink-soft">{c.pct}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-sunken">
                  <div className={`h-full rounded-full ${c.tone}`} style={{ width: `${c.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
            <OperationsIcon className="h-5 w-5 shrink-0" />
            Gudang Bandung mendekati kapasitas maksimum (91%).
          </div>
        </Card>

        <Card className="p-0">
          <div className="p-5 pb-0">
            <CardHeader title="Task Queue" actionLabel="Lihat Semua" />
          </div>
          <div className="px-5 pb-5">
            <DataTable columns={columns} rows={tasks} rowKey={(t) => t.id} />
          </div>
        </Card>
      </div>
    </div>
  )
}
