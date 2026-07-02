import { PageHeader } from '@/components/ui/PageHeader'
import { StatTiles, type StatTile } from '@/components/ui/StatTiles'
import { Card, CardHeader } from '@/components/atoms/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { StatusPill } from '@/components/ui/StatusPill'
import { AiInsightsPanel } from '@/components/dashboard/AiInsightsPanel'
import { AiIcon, SwapIcon, TargetIcon, WarningIcon } from '@/components/icons'

const stats: StatTile[] = [
  { id: 'lift', label: 'AI Conversion Lift', value: '+14%', delta: 2.3, icon: <AiIcon className="h-4 w-4" /> },
  { id: 'revenue', label: 'Revenue from AI', value: 'Rp 2.4B', delta: 18.6 },
  { id: 'accuracy', label: 'Model Accuracy', value: '92.4%', delta: 0.8, icon: <TargetIcon className="h-4 w-4" /> },
  { id: 'ctr', label: 'Recommendation CTR', value: '11.8%', delta: 1.4 },
]

interface Reco {
  product: string
  segment: string
  uplift: string
  confidence: string
  status: string
}

const recommendations: Reco[] = [
  { product: 'Hydrating Facial Serum', segment: 'Beauty shoppers', uplift: '+22%', confidence: 'Tinggi', status: 'Active' },
  { product: 'Premium ANC Headphones', segment: 'Tech enthusiasts', uplift: '+17%', confidence: 'Tinggi', status: 'Active' },
  { product: 'Artisan Ceramic Mug', segment: 'Home & Living', uplift: '+9%', confidence: 'Sedang', status: 'Active' },
  { product: 'Spring Tote Bag 2026', segment: 'Fashion', uplift: '+6%', confidence: 'Rendah', status: 'Draft' },
]

const crossSell = [
  { pair: 'Roti Tawar + Susu UHT', rate: '38%' },
  { pair: 'Serum + Facial Cleanser', rate: '31%' },
  { pair: 'Headphones + Case', rate: '27%' },
  { pair: 'Beras + Minyak Goreng', rate: '24%' },
]

const anomalies = [
  { label: 'Lonjakan permintaan Telur Ayam (+180%)', tone: 'warning' as const, note: 'Rekomendasi: tambah stok gudang pusat' },
  { label: 'Konversi turun di Aloshop Bali (-6.8%)', tone: 'danger' as const, note: 'Cek performa toko & delivery' },
  { label: 'Serum wajah trending di segmen 18-24', tone: 'info' as const, note: 'Peluang kampanye bertarget' },
]

const columns: Column<Reco>[] = [
  { header: 'Product', cell: (r) => <span className="font-semibold text-ink">{r.product}</span> },
  { header: 'Target Segment', cell: (r) => <span className="text-ink-soft">{r.segment}</span> },
  { header: 'Est. Uplift', align: 'right', cell: (r) => <span className="font-semibold text-brand-600">{r.uplift}</span> },
  { header: 'Confidence', cell: (r) => <span className="text-ink-soft">{r.confidence}</span> },
  { header: 'Status', cell: (r) => <StatusPill status={r.status} /> },
]

export function AiInsightsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="AI Insights" subtitle="Rekomendasi cerdas dan prediksi berbasis AI" />

      <StatTiles tiles={stats} />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader title="Top Recommended Products" actionLabel="Kelola Model" />
            <DataTable columns={columns} rows={recommendations} rowKey={(r) => r.product} />
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader title="Cross-selling Opportunities" />
              <ul className="space-y-3">
                {crossSell.map((c) => (
                  <li key={c.pair} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <SwapIcon className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-ink">{c.pair}</span>
                    <span className="ml-auto text-sm font-bold text-brand-600">{c.rate}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <CardHeader title="Anomaly Detection" />
              <ul className="space-y-3">
                {anomalies.map((a) => (
                  <li key={a.label} className="flex gap-3">
                    <span className="mt-0.5 text-ink-muted">
                      <WarningIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">{a.label}</p>
                      <p className="text-xs text-ink-muted">{a.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <AiInsightsPanel />
      </div>
    </div>
  )
}
