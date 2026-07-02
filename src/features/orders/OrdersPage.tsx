import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatTiles, type StatTile } from '@/components/ui/StatTiles'
import { SearchInput } from '@/components/ui/SearchInput'
import { FilterTabs, type FilterTab } from '@/components/ui/FilterTabs'
import { Button } from '@/components/ui/Button'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { StatusPill } from '@/components/ui/StatusPill'
import { Avatar } from '@/components/ui/Avatar'
import { DownloadIcon, MoreIcon, OrdersIcon } from '@/components/icons'

interface Order {
  id: string
  customer: string
  store: string
  items: number
  total: string
  payment: string
  status: string
  date: string
}

const orders: Order[] = [
  { id: 'ORD-90312', customer: 'Sari Dewi', store: 'Aloshop Kemang', items: 3, total: 'Rp 284.500', payment: 'AloPay', status: 'Completed', date: '21 Jun, 09:24' },
  { id: 'ORD-90311', customer: 'Andi Wijaya', store: 'Aloshop Pusat', items: 1, total: 'Rp 64.500', payment: 'QRIS', status: 'Shipped', date: '21 Jun, 08:57' },
  { id: 'ORD-90310', customer: 'Rina Kartika', store: 'Aloshop BSD', items: 5, total: 'Rp 512.000', payment: 'Transfer', status: 'Processing', date: '21 Jun, 08:40' },
  { id: 'ORD-90309', customer: 'Budi Hartono', store: 'Aloshop Kemang', items: 2, total: 'Rp 128.900', payment: 'AloPay', status: 'Pending', date: '21 Jun, 08:12' },
  { id: 'ORD-90308', customer: 'Maya Putri', store: 'Aloshop Pusat', items: 4, total: 'Rp 341.200', payment: 'COD', status: 'Cancelled', date: '20 Jun, 21:03' },
  { id: 'ORD-90307', customer: 'Dimas Prakoso', store: 'Aloshop BSD', items: 1, total: 'Rp 18.500', payment: 'QRIS', status: 'Completed', date: '20 Jun, 19:48' },
  { id: 'ORD-90306', customer: 'Lestari Ayu', store: 'Aloshop Kemang', items: 6, total: 'Rp 678.000', payment: 'AloPay', status: 'Shipped', date: '20 Jun, 17:22' },
  { id: 'ORD-90305', customer: 'Fajar Nugroho', store: 'Aloshop Pusat', items: 2, total: 'Rp 96.400', payment: 'Transfer', status: 'Refunded', date: '20 Jun, 15:10' },
]

const stats: StatTile[] = [
  { id: 'total', label: 'Orders Today', value: '6,742', delta: 8.1, icon: <OrdersIcon className="h-4 w-4" /> },
  { id: 'pending', label: 'Pending', value: '128', caption: 'Menunggu diproses' },
  { id: 'shipped', label: 'Shipped', value: '2,310', caption: 'Dalam pengiriman' },
  { id: 'revenue', label: 'Revenue Today', value: 'Rp 1.9B', delta: 12.4 },
]

const tabs: FilterTab[] = [
  { id: 'all', label: 'Semua', count: orders.length },
  { id: 'Pending', label: 'Pending', count: orders.filter((o) => o.status === 'Pending').length },
  { id: 'Processing', label: 'Processing', count: orders.filter((o) => o.status === 'Processing').length },
  { id: 'Shipped', label: 'Shipped', count: orders.filter((o) => o.status === 'Shipped').length },
  { id: 'Completed', label: 'Completed', count: orders.filter((o) => o.status === 'Completed').length },
]

export function OrdersPage() {
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      orders.filter((o) => {
        const matchesTab = tab === 'all' || o.status === tab
        const matchesQuery =
          !query ||
          o.id.toLowerCase().includes(query.toLowerCase()) ||
          o.customer.toLowerCase().includes(query.toLowerCase())
        return matchesTab && matchesQuery
      }),
    [tab, query],
  )

  const columns: Column<Order>[] = [
    { header: 'Order ID', cell: (o) => <span className="font-semibold text-ink">{o.id}</span> },
    {
      header: 'Customer',
      cell: (o) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={o.customer} />
          <span className="font-medium">{o.customer}</span>
        </div>
      ),
    },
    { header: 'Store', cell: (o) => <span className="text-ink-soft">{o.store}</span> },
    { header: 'Items', align: 'center', cell: (o) => o.items },
    { header: 'Total', align: 'right', cell: (o) => <span className="font-semibold">{o.total}</span> },
    { header: 'Payment', cell: (o) => <span className="text-ink-soft">{o.payment}</span> },
    { header: 'Status', cell: (o) => <StatusPill status={o.status} /> },
    { header: 'Date', cell: (o) => <span className="text-ink-soft">{o.date}</span> },
    {
      header: '',
      align: 'right',
      cell: () => (
        <button type="button" className="text-ink-muted hover:text-ink" aria-label="Aksi">
          <MoreIcon className="h-5 w-5" />
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        subtitle="Kelola dan pantau seluruh pesanan di semua toko"
        actions={
          <Button variant="secondary" icon={<DownloadIcon className="h-4 w-4" />}>
            Export
          </Button>
        }
      />

      <StatTiles tiles={stats} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterTabs tabs={tabs} active={tab} onChange={setTab} />
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Cari order / pelanggan…"
          className="w-full sm:w-72"
        />
      </div>

      <DataTable columns={columns} rows={filtered} rowKey={(o) => o.id} />
    </div>
  )
}
