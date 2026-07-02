import {
  AuthIcon,
  BagIcon,
  ClockIcon,
  DeliveryIcon,
  PieIcon,
  RefreshIcon,
  RevenueIcon,
  CrmIcon,
  InventoryIcon,
  OrdersIcon,
  SecurityCheckIcon,
  SmileIcon,
  StoresIcon,
  SwapIcon,
  VaptIcon,
} from '@/components/icons'
import type {
  AiInsight,
  CrmStat,
  InventorySegment,
  Kpi,
  OpsMetric,
  SalesPoint,
  SalesSeriesMeta,
  SecurityRow,
} from '@/types'

/** Static dashboard content — swap for API responses in a real deployment. */

export const storeName = 'Aloshop Store Pusat'
export const dateRange = '21 Mei 2024 - 21 Jun 2024'
export const adminFirstName = 'Budi'

export const kpis: Kpi[] = [
  { id: 'revenue', label: 'Gross Revenue', value: 'Rp 12.8B', Icon: RevenueIcon, delta: 12.4 },
  { id: 'orders', label: 'Orders Today', value: '6,742', Icon: OrdersIcon, delta: 8.1 },
  {
    id: 'stores',
    label: 'Active Stores',
    value: '48',
    Icon: StoresIcon,
    caption: 'Semua toko terhubung di seluruh area',
  },
  { id: 'conversion', label: 'Conversion Rate', value: '8.6%', Icon: PieIcon, delta: 1.2 },
  { id: 'stock', label: 'Stock Accuracy', value: '98.7%', Icon: InventoryIcon, delta: 2.1 },
  { id: 'csat', label: 'Customer Satisfaction', value: '96%', Icon: SmileIcon, delta: 1.9 },
]

export const salesSeries: SalesSeriesMeta[] = [
  { key: 'revenue', label: 'Revenue', color: '#059669' },
  { key: 'orders', label: 'Orders', color: '#6ee7b7' },
  { key: 'gmv', label: 'GMV', color: '#c7d2fe' },
]

/** 30-day trend (values in billions of Rupiah). Highlighted point: 11 Jun. */
export const salesData: SalesPoint[] = [
  { label: '22 Mei', revenue: 0.35, orders: 0.35, gmv: 0.4 },
  { label: '24 Mei', revenue: 0.42, orders: 0.55, gmv: 0.5 },
  { label: '27 Mei', revenue: 0.55, orders: 0.85, gmv: 0.62 },
  { label: '30 Mei', revenue: 0.6, orders: 0.95, gmv: 0.7 },
  { label: '1 Jun', revenue: 0.58, orders: 0.8, gmv: 0.82 },
  { label: '4 Jun', revenue: 0.72, orders: 0.62, gmv: 0.95 },
  { label: '6 Jun', revenue: 0.95, orders: 0.5, gmv: 1.05 },
  { label: '9 Jun', revenue: 1.3, orders: 0.42, gmv: 1.18 },
  { label: '11 Jun', revenue: 1.45, orders: 0.4, gmv: 1.25 },
  { label: '14 Jun', revenue: 1.32, orders: 0.55, gmv: 1.2 },
  { label: '16 Jun', revenue: 1.1, orders: 0.95, gmv: 1.0 },
  { label: '18 Jun', revenue: 1.2, orders: 1.35, gmv: 0.95 },
  { label: '21 Jun', revenue: 1.55, orders: 1.6, gmv: 1.3 },
]

/** Index into salesData highlighted by the crosshair + tooltip. */
export const highlightedIndex = 8

export const aiConversionLift = {
  value: '+14%',
  caption: 'vs tanpa rekomendasi AI',
  /** Small sparkline (0–1 normalised). */
  spark: [0.4, 0.35, 0.42, 0.5, 0.45, 0.55, 0.62, 0.6, 0.72, 0.8],
}

export const aiInsights: AiInsight[] = [
  {
    id: 'recommended',
    title: 'Top Recommended Products',
    value: '24 Produk',
    actionLabel: 'Lihat rekomendasi',
    Icon: BagIcon,
  },
  {
    id: 'cross-sell',
    title: 'Cross-selling Opportunity',
    value: '35 Produk',
    actionLabel: 'Lihat peluang',
    Icon: SwapIcon,
  },
]

export const crmStats: CrmStat[] = [
  { id: 'total', label: 'Total Customers', value: '152,480', Icon: CrmIcon },
  { id: 'returning', label: 'Returning Customers', value: '68%', Icon: RefreshIcon },
  { id: 'basket', label: 'Avg Basket Size', value: 'Rp284K', Icon: BagIcon },
]

export const inventoryHealth = 98.7
export const inventorySegments: InventorySegment[] = [
  { id: 'available', label: 'Available', count: 4586, color: '#059669' },
  { id: 'low', label: 'Low Stock', count: 12, color: '#3b82f6' },
  { id: 'out', label: 'Out of Stock', count: 3, color: '#ef4444' },
]

export const opsMetrics: OpsMetric[] = [
  { id: 'fulfillment', label: 'Fulfillment Rate', value: '96%', delta: 2.1, Icon: DeliveryIcon },
  { id: 'delivery', label: 'Avg Delivery Time', value: '32 mins', delta: -5.4, Icon: ClockIcon },
]

export const securityScore = { value: '98%', tone: 'Excellent' }
export const securityRows: SecurityRow[] = [
  {
    id: 'score',
    label: 'Security Score',
    value: '98%',
    status: 'Excellent',
    statusTone: 'success',
    Icon: SecurityCheckIcon,
  },
  {
    id: 'auth',
    label: 'Authentication',
    value: '',
    status: 'Healthy',
    statusTone: 'neutral',
    Icon: AuthIcon,
  },
  {
    id: 'vapt',
    label: 'VAPT Status',
    value: '',
    status: 'Passed',
    statusTone: 'success',
    Icon: VaptIcon,
  },
]
