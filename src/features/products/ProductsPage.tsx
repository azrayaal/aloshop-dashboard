import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatTiles, type StatTile } from '@/components/ui/StatTiles'
import { SearchInput } from '@/components/ui/SearchInput'
import { FilterTabs, type FilterTab } from '@/components/ui/FilterTabs'
import { Button } from '@/components/ui/Button'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { StatusPill } from '@/components/ui/StatusPill'
import { PlusIcon, ProductsIcon, StarIcon } from '@/components/icons'

interface Product {
  id: string
  name: string
  glyph: string
  category: string
  price: string
  stock: number
  sold: number
  rating: number
  status: string
}

const products: Product[] = [
  { id: 'P-1', name: 'Premium ANC Headphones', glyph: '🎧', category: 'Electronics', price: 'Rp 64.500', stock: 0, sold: 1240, rating: 4.8, status: 'Active' },
  { id: 'P-2', name: 'Artisan Ceramic Mug', glyph: '☕', category: 'Home & Living', price: 'Rp 18.500', stock: 156, sold: 980, rating: 4.5, status: 'Active' },
  { id: 'P-3', name: 'Hydrating Facial Serum', glyph: '🧴', category: 'Beauty', price: 'Rp 14.500', stock: 88, sold: 2100, rating: 4.9, status: 'Active' },
  { id: 'P-4', name: 'Telur Ayam Negeri 1kg', glyph: '🥚', category: 'Grocery', price: 'Rp 16.800', stock: 5, sold: 5400, rating: 4.7, status: 'Active' },
  { id: 'P-5', name: 'Roti Tawar Gandum', glyph: '🍞', category: 'Grocery', price: 'Rp 16.500', stock: 240, sold: 3200, rating: 4.6, status: 'Active' },
  { id: 'P-6', name: 'Spring Tote Bag 2026', glyph: '👜', category: 'Fashion', price: 'Rp 129.000', stock: 42, sold: 0, rating: 0, status: 'Draft' },
]

const categories = ['all', 'Grocery', 'Beauty', 'Electronics', 'Fashion', 'Home & Living']

const stats: StatTile[] = [
  { id: 'total', label: 'Total Products', value: '1,284', icon: <ProductsIcon className="h-4 w-4" /> },
  { id: 'active', label: 'Active', value: '1,201', caption: 'Tayang di storefront' },
  { id: 'draft', label: 'Draft', value: '83', caption: 'Belum dipublikasi' },
  { id: 'categories', label: 'Categories', value: '32', caption: 'Kategori aktif' },
]

export function ProductsPage() {
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')

  const tabs: FilterTab[] = categories.map((c) => ({
    id: c,
    label: c === 'all' ? 'Semua' : c,
    count: c === 'all' ? products.length : products.filter((p) => p.category === c).length,
  }))

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchesCat = cat === 'all' || p.category === cat
        const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase())
        return matchesCat && matchesQuery
      }),
    [cat, query],
  )

  const columns: Column<Product>[] = [
    {
      header: 'Product',
      cell: (p) => (
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-sunken text-xl">
            {p.glyph}
          </span>
          <div>
            <p className="font-semibold text-ink">{p.name}</p>
            <p className="text-xs text-ink-muted">{p.id}</p>
          </div>
        </div>
      ),
    },
    { header: 'Category', cell: (p) => <span className="text-ink-soft">{p.category}</span> },
    { header: 'Price', align: 'right', cell: (p) => <span className="font-semibold">{p.price}</span> },
    {
      header: 'Stock',
      align: 'right',
      cell: (p) => <span className={p.stock === 0 ? 'font-semibold text-red-500' : ''}>{p.stock}</span>,
    },
    { header: 'Sold', align: 'right', cell: (p) => <span className="text-ink-soft">{p.sold.toLocaleString('id-ID')}</span> },
    {
      header: 'Rating',
      align: 'right',
      cell: (p) =>
        p.rating > 0 ? (
          <span className="inline-flex items-center gap-1 font-medium">
            <StarIcon className="h-3.5 w-3.5 text-amber-400" />
            {p.rating.toFixed(1)}
          </span>
        ) : (
          <span className="text-ink-muted">—</span>
        ),
    },
    { header: 'Status', cell: (p) => <StatusPill status={p.status} /> },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        subtitle="Katalog produk di seluruh toko Aloshop"
        actions={<Button icon={<PlusIcon className="h-4 w-4" />}>Tambah Produk</Button>}
      />

      <StatTiles tiles={stats} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterTabs tabs={tabs} active={cat} onChange={setCat} />
        <SearchInput value={query} onChange={setQuery} placeholder="Cari produk…" className="w-full sm:w-72" />
      </div>

      <DataTable columns={columns} rows={filtered} rowKey={(p) => p.id} />
    </div>
  )
}
