import type { IconProps } from '@/components/icons'

export interface Kpi {
  id: string
  label: string
  value: string
  Icon: (p: IconProps) => JSX.Element
  /** Percentage delta vs the previous period. */
  delta?: number
  /** Free-text caption shown instead of a delta. */
  caption?: string
}

export interface SalesPoint {
  label: string
  revenue: number
  orders: number
  gmv: number
}

export interface SalesSeriesMeta {
  key: 'revenue' | 'orders' | 'gmv'
  label: string
  color: string
}

export interface AiInsight {
  id: string
  title: string
  value: string
  actionLabel: string
  Icon: (p: IconProps) => JSX.Element
}

export interface CrmStat {
  id: string
  label: string
  value: string
  Icon: (p: IconProps) => JSX.Element
}

export interface InventorySegment {
  id: string
  label: string
  count: number
  color: string
}

export interface OpsMetric {
  id: string
  label: string
  value: string
  delta: number
  Icon: (p: IconProps) => JSX.Element
}

export interface SecurityRow {
  id: string
  label: string
  value: string
  status: string
  statusTone: 'success' | 'neutral'
  Icon: (p: IconProps) => JSX.Element
}
