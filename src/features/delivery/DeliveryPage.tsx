import { PageHeader } from '@/components/ui/PageHeader'
import { StatTiles, type StatTile } from '@/components/ui/StatTiles'
import { Card, CardHeader } from '@/components/atoms/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { StatusPill } from '@/components/ui/StatusPill'
import { StatDelta } from '@/components/atoms/StatDelta'
import { ClockIcon, TargetIcon, TruckFastIcon } from '@/components/icons'

const stats: StatTile[] = [
  { id: 'ontime', label: 'On-time Rate', value: '97.4%', delta: 1.8, icon: <TargetIcon className="h-4 w-4" /> },
  { id: 'time', label: 'Avg Delivery Time', value: '32 min', delta: -5.4, icon: <ClockIcon className="h-4 w-4" /> },
  { id: 'active', label: 'Active Shipments', value: '2,310', icon: <TruckFastIcon className="h-4 w-4" /> },
  { id: 'failed', label: 'Failed / Returned', value: '18', valueClassName: 'text-red-500', caption: '0.8% dari total' },
]

const couriers = [
  { name: 'Gojek', share: '38%', onTime: 98.2, delta: 1.2 },
  { name: 'Grab', share: '31%', onTime: 97.1, delta: 0.6 },
  { name: 'JNE', share: '19%', onTime: 94.5, delta: -1.1 },
  { name: 'Internal Fleet', share: '12%', onTime: 99.0, delta: 2.4 },
]

interface Shipment {
  id: string
  order: string
  courier: string
  destination: string
  eta: string
  status: string
}

const shipments: Shipment[] = [
  { id: 'SHP-7781', order: 'ORD-90312', courier: 'Gojek', destination: 'Jakarta Selatan', eta: '12 min', status: 'In Transit' },
  { id: 'SHP-7780', order: 'ORD-90311', courier: 'Grab', destination: 'Jakarta Pusat', eta: '25 min', status: 'In Transit' },
  { id: 'SHP-7779', order: 'ORD-90307', courier: 'Internal Fleet', destination: 'Tangerang Selatan', eta: '—', status: 'Delivered' },
  { id: 'SHP-7778', order: 'ORD-90306', courier: 'JNE', destination: 'Bandung', eta: '1 hari', status: 'Processing' },
  { id: 'SHP-7777', order: 'ORD-90305', courier: 'Gojek', destination: 'Jakarta Barat', eta: '—', status: 'Failed' },
]

const columns: Column<Shipment>[] = [
  { header: 'Shipment', cell: (s) => <span className="font-semibold text-ink">{s.id}</span> },
  { header: 'Order', cell: (s) => <span className="text-ink-soft">{s.order}</span> },
  { header: 'Courier', cell: (s) => s.courier },
  { header: 'Destination', cell: (s) => <span className="text-ink-soft">{s.destination}</span> },
  { header: 'ETA', align: 'right', cell: (s) => <span className="font-medium">{s.eta}</span> },
  { header: 'Status', cell: (s) => <StatusPill status={s.status} /> },
]

export function DeliveryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Delivery" subtitle="Pantau pengiriman dan performa kurir secara real-time" />

      <StatTiles tiles={stats} />

      <Card>
        <CardHeader title="Courier Performance" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {couriers.map((c) => (
            <div key={c.name} className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">{c.name}</span>
                <span className="text-xs text-ink-muted">{c.share} share</span>
              </div>
              <p className="mt-2 text-2xl font-extrabold text-ink">{c.onTime}%</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-ink-muted">
                <StatDelta value={c.delta} />
                on-time rate
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-0">
        <div className="p-5 pb-0">
          <CardHeader title="Active Shipments" actionLabel="Lihat Semua" />
        </div>
        <div className="px-5 pb-5">
          <DataTable columns={columns} rows={shipments} rowKey={(s) => s.id} />
        </div>
      </Card>
    </div>
  )
}
