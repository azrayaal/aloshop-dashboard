import { PageHeader } from '@/components/ui/PageHeader'
import { StatTiles, type StatTile } from '@/components/ui/StatTiles'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/atoms/Card'
import { StatusPill } from '@/components/ui/StatusPill'
import { StatDelta } from '@/components/atoms/StatDelta'
import { MapPinIcon, PlusIcon, StoresIcon } from '@/components/icons'

interface Store {
  id: string
  name: string
  location: string
  manager: string
  status: string
  revenue: string
  orders: number
  delta: number
}

const stores: Store[] = [
  { id: 'S-01', name: 'Aloshop Store Pusat', location: 'Jakarta Selatan', manager: 'Budi Santoso', status: 'Online', revenue: 'Rp 3.2B', orders: 1820, delta: 12.4 },
  { id: 'S-02', name: 'Aloshop Kemang', location: 'Jakarta Selatan', manager: 'Sari Dewi', status: 'Online', revenue: 'Rp 2.1B', orders: 1240, delta: 8.7 },
  { id: 'S-03', name: 'Aloshop BSD', location: 'Tangerang Selatan', manager: 'Andi Wijaya', status: 'Online', revenue: 'Rp 1.8B', orders: 990, delta: 5.1 },
  { id: 'S-04', name: 'Aloshop Bandung', location: 'Bandung', manager: 'Rina Kartika', status: 'Online', revenue: 'Rp 1.4B', orders: 760, delta: -2.3 },
  { id: 'S-05', name: 'Aloshop Surabaya', location: 'Surabaya', manager: 'Dimas Prakoso', status: 'Maintenance', revenue: 'Rp 1.1B', orders: 540, delta: 3.4 },
  { id: 'S-06', name: 'Aloshop Bali', location: 'Denpasar', manager: 'Maya Putri', status: 'Offline', revenue: 'Rp 0.9B', orders: 410, delta: -6.8 },
]

const stats: StatTile[] = [
  { id: 'total', label: 'Total Stores', value: '48', icon: <StoresIcon className="h-4 w-4" /> },
  { id: 'online', label: 'Online', value: '45', valueClassName: 'text-brand-600', caption: 'Terhubung & aktif' },
  { id: 'revenue', label: 'Total Revenue', value: 'Rp 12.8B', delta: 12.4 },
  { id: 'aov', label: 'Avg Orders / Store', value: '140', caption: 'Per hari' },
]

export function StoresPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Stores (Tenant)"
        subtitle="Manajemen multi-tenant seluruh toko Aloshop"
        actions={<Button icon={<PlusIcon className="h-4 w-4" />}>Tambah Toko</Button>}
      />

      <StatTiles tiles={stats} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stores.map((s) => (
          <Card key={s.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <StoresIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-bold text-ink">{s.name}</p>
                  <p className="flex items-center gap-1 text-xs text-ink-muted">
                    <MapPinIcon className="h-3.5 w-3.5" />
                    {s.location}
                  </p>
                </div>
              </div>
              <StatusPill status={s.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <div>
                <p className="text-xs text-ink-muted">Revenue</p>
                <p className="mt-0.5 flex items-center gap-2 font-bold text-ink">
                  {s.revenue}
                  <StatDelta value={s.delta} />
                </p>
              </div>
              <div>
                <p className="text-xs text-ink-muted">Orders</p>
                <p className="mt-0.5 font-bold text-ink">{s.orders.toLocaleString('id-ID')}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
              <span className="text-ink-soft">
                Manager: <span className="font-medium text-ink">{s.manager}</span>
              </span>
              <button type="button" className="font-semibold text-brand-600 hover:text-brand-700">
                Kelola →
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
