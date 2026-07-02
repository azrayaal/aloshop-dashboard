import { smoothPath, type Point } from '@/lib/chart'

interface SparklineProps {
  /** Normalised values 0–1. */
  values: number[]
  color?: string
  className?: string
}

const W = 240
const H = 56

/** Compact area sparkline used inside the AI Conversion Lift card. */
export function Sparkline({ values, color = '#059669', className }: SparklineProps) {
  const pts: Point[] = values.map((v, i) => ({
    x: (W * i) / (values.length - 1),
    y: H - 6 - v * (H - 12),
  }))
  const line = smoothPath(pts)
  const area = `${line} L ${W},${H} L 0,${H} Z`
  const gradId = 'spark-fill'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  )
}
