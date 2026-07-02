import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatTiles, type StatTile } from '@/components/ui/StatTiles'
import { SearchInput } from '@/components/ui/SearchInput'
import { FilterTabs, type FilterTab } from '@/components/ui/FilterTabs'
import { Button } from '@/components/ui/Button'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { StatusPill } from '@/components/ui/StatusPill'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/atoms/Card'
import { CrmIcon, DownloadIcon, RefreshIcon, UsersPlusIcon } from '@/components/icons'

interface Customer {
  id: string
  name: string
  email: string
  tier: string
  orders: number
  spent: string
  lastOrder: string
  status: string
}

const customers: Customer[] = [
  { id: 'C-1', name: 'Sari Dewi', email: 'sari.dewi@mail.com', tier: 'Platinum', orders: 142, spent: 'Rp 24.8M', lastOrder: '2 jam lalu', status: 'Active' },
  { id: 'C-2', name: 'Andi Wijaya', email: 'andi.w@mail.com', tier: 'Gold', orders: 88, spent: 'Rp 14.2M', lastOrder: 'Kemarin', status: 'Active' },
  { id: 'C-3', name: 'Rina Kartika', email: 'rina.k@mail.com', tier: 'Gold', orders: 76, spent: 'Rp 11.9M', lastOrder: '3 hari lalu', status: 'Active' },
  { id: 'C-4', name: 'Budi Hartono', email: 'budi.h@mail.com', tier: 'Silver', orders: 34, spent: 'Rp 5.1M', lastOrder: '2 minggu lalu', status: 'Active' },
  { id: 'C-5', name: 'Maya Putri', email: 'maya.p@mail.com', tier: 'Silver', orders: 21, spent: 'Rp 3.4M', lastOrder: '1 bulan lalu', status: 'Churned' },
  { id: 'C-6', name: 'Fajar Nugroho', email: 'fajar.n@mail.com', tier: 'Bronze', orders: 8, spent: 'Rp 0.9M', lastOrder: '2 bulan lalu', status: 'Churned' },
]

const stats: StatTile[] = [
  { id: 'total', label: 'Total Customers', value: '152,480', delta: 4.2, icon: <CrmIcon className="h-4 w-4" /> },
  { id: 'new', label: 'New This Month', value: '3,210', delta: 6.8, icon: <UsersPlusIcon className="h-4 w-4" /> },
  { id: 'returning', label: 'Returning Rate', value: '68%', delta: 1.9, icon: <RefreshIcon className="h-4 w-4" /> },
  { id: 'basket', label: 'Avg Basket Size', value: 'Rp 284K', delta: 3.1 },
]

const segments = [
  { id: 'plat', label: 'Platinum', value: '4,820', pct: 3, color: 'bg-purple-500' },
  { id: 'gold', label: 'Gold', value: '18,640', pct: 12, color: 'bg-amber-400' },
  { id: 'silver', label: 'Silver', value: '52,300', pct: 34, color: 'bg-slate-400' },
  { id: 'bronze', label: 'Bronze', value: '76,720', pct: 51, color: 'bg-orange-300' },
]

const tabs: FilterTab[] = [
  { id: 'all', label: 'Semua' },
  { id: 'Platinum', label: 'Platinum' },
  { id: 'Gold', label: 'Gold' },
  { id: 'Silver', label: 'Silver' },
  { id: 'Bronze', label: 'Bronze' },
]

export function CrmPage() {
  const [tier, setTier] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      customers.filter((c) => {
        const matchesTier = tier === 'all' || c.tier === tier
        const matchesQuery =
          !query ||
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase())
        return matchesTier && matchesQuery
      }),
    [tier, query],
  )

  const columns: Column<Customer>[] = [
    {
      header: 'Customer',
      cell: (c) => (
        <div className="flex items-center gap-3">
          <Avatar name={c.name} />
          <div>
            <p className="font-semibold text-ink">{c.name}</p>
            <p className="text-xs text-ink-muted">{c.email}</p>
          </div>
        </div>
      ),
    },
    { header: 'Tier', cell: (c) => <StatusPill status={c.tier} tone="brand" dot={false} /> },
    { header: 'Orders', align: 'right', cell: (c) => c.orders },
    { header: 'Total Spent', align: 'right', cell: (c) => <span className="font-semibold">{c.spent}</span> },
    { header: 'Last Order', cell: (c) => <span className="text-ink-soft">{c.lastOrder}</span> },
    { header: 'Status', cell: (c) => <StatusPill status={c.status} /> },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM"
        subtitle="Kelola pelanggan, segmentasi, dan loyalitas"
        actions={
          <Button variant="secondary" icon={<DownloadIcon className="h-4 w-4" />}>
            Export
          </Button>
        }
      />

      <StatTiles tiles={stats} />

      <Card>
        <h3 className="mb-4 text-base font-bold text-ink">Segmentasi Loyalitas</h3>
        <div className="mb-4 flex h-3 w-full overflow-hidden rounded-full">
          {segments.map((s) => (
            <div key={s.id} className={s.color} style={{ width: `${s.pct}%` }} title={`${s.label} ${s.pct}%`} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {segments.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
              <div>
                <p className="text-sm font-semibold text-ink">{s.value}</p>
                <p className="text-xs text-ink-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterTabs tabs={tabs} active={tier} onChange={setTier} />
        <SearchInput value={query} onChange={setQuery} placeholder="Cari pelanggan…" className="w-full sm:w-72" />
      </div>

      <DataTable columns={columns} rows={filtered} rowKey={(c) => c.id} />
    </div>
  )
}
