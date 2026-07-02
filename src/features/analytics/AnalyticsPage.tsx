import { PageHeader } from '@/components/ui/PageHeader'
import { StatTiles, type StatTile } from '@/components/ui/StatTiles'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader } from '@/components/atoms/Card'
import { SalesPerformance } from '@/components/dashboard/SalesPerformance'
import { DownloadIcon, PieIcon, RevenueIcon, TargetIcon } from '@/components/icons'

const stats: StatTile[] = [
  { id: 'gmv', label: 'GMV', value: 'Rp 18.4B', delta: 9.8, icon: <RevenueIcon className="h-4 w-4" /> },
  { id: 'aov', label: 'Avg Order Value', value: 'Rp 284K', delta: 3.1 },
  { id: 'conv', label: 'Conversion Rate', value: '8.6%', delta: 1.2, icon: <TargetIcon className="h-4 w-4" /> },
  { id: 'sessions', label: 'Sessions', value: '1.2M', delta: 6.4, icon: <PieIcon className="h-4 w-4" /> },
]

const topProducts = [
  { name: 'Telur Ayam Negeri 1kg', value: 5400, revenue: 'Rp 90.7M' },
  { name: 'Hydrating Facial Serum', value: 2100, revenue: 'Rp 30.4M' },
  { name: 'Roti Tawar Gandum', value: 3200, revenue: 'Rp 52.8M' },
  { name: 'Premium ANC Headphones', value: 1240, revenue: 'Rp 80.0M' },
  { name: 'Artisan Ceramic Mug', value: 980, revenue: 'Rp 18.1M' },
]

const trafficSources = [
  { label: 'Aloshop App', pct: 46, color: 'bg-brand-500' },
  { label: 'Organic Search', pct: 24, color: 'bg-blue-400' },
  { label: 'Social Ads', pct: 18, color: 'bg-amber-400' },
  { label: 'Referral', pct: 12, color: 'bg-purple-400' },
]

const funnel = [
  { label: 'Kunjungan', value: 100 },
  { label: 'Lihat Produk', value: 62 },
  { label: 'Tambah Keranjang', value: 28 },
  { label: 'Checkout', value: 14 },
  { label: 'Pembelian', value: 8.6 },
]

export function AnalyticsPage() {
  const maxProduct = Math.max(...topProducts.map((p) => p.value))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Analisis performa penjualan, traffic, dan konversi"
        actions={
          <Button variant="secondary" icon={<DownloadIcon className="h-4 w-4" />}>
            Export Report
          </Button>
        }
      />

      <StatTiles tiles={stats} />

      <SalesPerformance />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader title="Top Products" actionLabel="Lihat Semua" />
          <ul className="space-y-4">
            {topProducts.map((p) => (
              <li key={p.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{p.name}</span>
                  <span className="text-ink-soft">
                    {p.value.toLocaleString('id-ID')} terjual · <span className="font-semibold text-ink">{p.revenue}</span>
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-sunken">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${(p.value / maxProduct) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader title="Traffic Sources" />
            <div className="mb-4 flex h-3 w-full overflow-hidden rounded-full">
              {trafficSources.map((s) => (
                <div key={s.label} className={s.color} style={{ width: `${s.pct}%` }} />
              ))}
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {trafficSources.map((s) => (
                <li key={s.label} className="flex items-center gap-2 text-sm">
                  <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                  <span className="text-ink-soft">{s.label}</span>
                  <span className="ml-auto font-semibold text-ink">{s.pct}%</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Conversion Funnel" />
            <ul className="space-y-2">
              {funnel.map((f) => (
                <li key={f.label} className="flex items-center gap-3">
                  <span className="w-32 shrink-0 text-sm text-ink-soft">{f.label}</span>
                  <div className="h-6 flex-1 overflow-hidden rounded-lg bg-surface-sunken">
                    <div
                      className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-brand-400 to-brand-600 px-2 text-xs font-semibold text-white"
                      style={{ width: `${f.value}%` }}
                    >
                      {f.value}%
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
