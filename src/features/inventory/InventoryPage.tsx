import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatTiles, type StatTile } from '@/components/ui/StatTiles'
import { SearchInput } from '@/components/ui/SearchInput'
import { FilterTabs, type FilterTab } from '@/components/ui/FilterTabs'
import { Button } from '@/components/ui/Button'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { StatusPill } from '@/components/ui/StatusPill'
import { BoxIcon, InventoryIcon, PlusIcon, RefreshIcon, WarningIcon } from '@/components/icons'

interface StockItem {
  sku: string
  product: string
  store: string
  onHand: number
  reserved: number
  reorder: number
}

const items: StockItem[] = [
  { sku: 'SKU-1001', product: 'Telur Ayam Negeri 1kg', store: 'Gudang Pusat', onHand: 5, reserved: 2, reorder: 20 },
  { sku: 'SKU-1002', product: 'Roti Tawar Gandum', store: 'Aloshop Kemang', onHand: 240, reserved: 18, reorder: 50 },
  { sku: 'SKU-1003', product: 'Susu UHT Full Cream 1L', store: 'Aloshop BSD', onHand: 12, reserved: 4, reorder: 30 },
  { sku: 'SKU-1004', product: 'Premium ANC Headphones', store: 'Gudang Pusat', onHand: 0, reserved: 0, reorder: 10 },
  { sku: 'SKU-1005', product: 'Artisan Ceramic Mug', store: 'Aloshop Pusat', onHand: 156, reserved: 12, reorder: 40 },
  { sku: 'SKU-1006', product: 'Hydrating Facial Serum 30ml', store: 'Aloshop Kemang', onHand: 88, reserved: 9, reorder: 25 },
  { sku: 'SKU-1007', product: 'Beras Premium 5kg', store: 'Gudang Pusat', onHand: 18, reserved: 6, reorder: 30 },
  { sku: 'SKU-1008', product: 'Minyak Goreng 2L', store: 'Aloshop BSD', onHand: 410, reserved: 22, reorder: 60 },
]

function statusOf(it: StockItem): string {
  const available = it.onHand - it.reserved
  if (it.onHand === 0) return 'Out of Stock'
  if (available <= it.reorder) return 'Low Stock'
  return 'In Stock'
}

const stats: StatTile[] = [
  { id: 'skus', label: 'Total SKUs', value: '4,601', icon: <BoxIcon className="h-4 w-4" /> },
  { id: 'low', label: 'Low Stock', value: '12', valueClassName: 'text-amber-600', caption: 'Perlu reorder' },
  { id: 'out', label: 'Out of Stock', value: '3', valueClassName: 'text-red-500', caption: 'Segera restock' },
  { id: 'accuracy', label: 'Stock Accuracy', value: '98.7%', delta: 2.1, icon: <InventoryIcon className="h-4 w-4" /> },
]

const tabs: FilterTab[] = [
  { id: 'all', label: 'Semua' },
  { id: 'In Stock', label: 'In Stock' },
  { id: 'Low Stock', label: 'Low Stock' },
  { id: 'Out of Stock', label: 'Out of Stock' },
]

export function InventoryPage() {
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      items.filter((it) => {
        const matchesTab = tab === 'all' || statusOf(it) === tab
        const matchesQuery =
          !query ||
          it.product.toLowerCase().includes(query.toLowerCase()) ||
          it.sku.toLowerCase().includes(query.toLowerCase())
        return matchesTab && matchesQuery
      }),
    [tab, query],
  )

  const columns: Column<StockItem>[] = [
    { header: 'SKU', cell: (it) => <span className="font-mono text-xs font-semibold text-ink-soft">{it.sku}</span> },
    { header: 'Product', cell: (it) => <span className="font-medium text-ink">{it.product}</span> },
    { header: 'Location', cell: (it) => <span className="text-ink-soft">{it.store}</span> },
    { header: 'On Hand', align: 'right', cell: (it) => it.onHand },
    { header: 'Reserved', align: 'right', cell: (it) => <span className="text-ink-soft">{it.reserved}</span> },
    {
      header: 'Available',
      align: 'right',
      cell: (it) => <span className="font-semibold">{it.onHand - it.reserved}</span>,
    },
    { header: 'Reorder', align: 'right', cell: (it) => <span className="text-ink-muted">{it.reorder}</span> },
    { header: 'Status', cell: (it) => <StatusPill status={statusOf(it)} /> },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        subtitle="Stok real-time di seluruh gudang dan toko"
        actions={
          <>
            <Button variant="secondary" icon={<RefreshIcon className="h-4 w-4" />}>
              Sync Stock
            </Button>
            <Button icon={<PlusIcon className="h-4 w-4" />}>Stock Adjustment</Button>
          </>
        }
      />

      <StatTiles tiles={stats} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterTabs tabs={tabs} active={tab} onChange={setTab} />
        <SearchInput value={query} onChange={setQuery} placeholder="Cari SKU / produk…" className="w-full sm:w-72" />
      </div>

      {(items.some((it) => statusOf(it) === 'Out of Stock')) && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          <WarningIcon className="h-5 w-5 shrink-0" />
          Beberapa item kehabisan stok. Prioritaskan restock untuk menghindari lost sales.
        </div>
      )}

      <DataTable columns={columns} rows={filtered} rowKey={(it) => it.sku} />
    </div>
  )
}
