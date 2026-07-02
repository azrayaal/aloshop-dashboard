import { useMemo } from 'react'
import { smoothPath, type Point } from '@/lib/chart'
import type { SalesPoint, SalesSeriesMeta } from '@/types'

interface SalesChartProps {
  data: SalesPoint[]
  series: SalesSeriesMeta[]
  /** Index of the point marked with a crosshair + tooltip. */
  highlightIndex: number
  /** Chart y-axis maximum, in the same unit as the data (billions of Rp). */
  yMax?: number
}

const WIDTH = 720
const HEIGHT = 320
const PAD = { top: 20, right: 24, bottom: 32, left: 56 }

const plotW = WIDTH - PAD.left - PAD.right
const plotH = HEIGHT - PAD.top - PAD.bottom

function formatAxis(value: number): string {
  if (value === 0) return 'Rp 0'
  if (value >= 1) return `Rp ${value.toFixed(1)}B`
  return `Rp ${Math.round(value * 1000)}M`
}

function formatTooltip(value: number): string {
  return value >= 1 ? `Rp ${value.toFixed(2)}B` : `Rp ${Math.round(value * 1000)}M`
}

/**
 * Multi-series smoothed line chart rendered as inline SVG (no chart lib).
 * Includes gridlines, y/x axes, a crosshair and a floating tooltip.
 */
export function SalesChart({ data, series, highlightIndex, yMax = 2 }: SalesChartProps) {
  const ticks = useMemo(() => {
    const steps = 4
    return Array.from({ length: steps + 1 }, (_, i) => (yMax / steps) * i)
  }, [yMax])

  const xFor = (i: number) => PAD.left + (plotW * i) / (data.length - 1)
  const yFor = (v: number) => PAD.top + plotH * (1 - v / yMax)

  const pathFor = (key: SalesSeriesMeta['key']): string => {
    const pts: Point[] = data.map((d, i) => ({ x: xFor(i), y: yFor(d[key]) }))
    return smoothPath(pts)
  }

  const hx = xFor(highlightIndex)
  const highlight = data[highlightIndex]

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Grafik performa penjualan">
        {/* Horizontal gridlines + y labels */}
        {ticks.map((t) => {
          const y = yFor(t)
          return (
            <g key={t}>
              <line x1={PAD.left} y1={y} x2={WIDTH - PAD.right} y2={y} stroke="#f1f5f9" strokeWidth={1} />
              <text x={PAD.left - 12} y={y + 4} textAnchor="end" className="fill-ink-muted text-[11px]">
                {formatAxis(t)}
              </text>
            </g>
          )
        })}

        {/* X labels */}
        {data.map((d, i) => (
          <text
            key={d.label}
            x={xFor(i)}
            y={HEIGHT - 8}
            textAnchor="middle"
            className="fill-ink-muted text-[11px]"
          >
            {d.label}
          </text>
        ))}

        {/* Crosshair */}
        <line
          x1={hx}
          y1={PAD.top}
          x2={hx}
          y2={PAD.top + plotH}
          stroke="#94a3b8"
          strokeWidth={1}
          strokeDasharray="4 4"
        />

        {/* Series lines */}
        {series.map((s) => (
          <path
            key={s.key}
            d={pathFor(s.key)}
            fill="none"
            stroke={s.color}
            strokeWidth={s.key === 'revenue' ? 3 : 2.5}
            strokeLinecap="round"
          />
        ))}

        {/* Highlight markers */}
        {series.map((s) => (
          <circle key={s.key} cx={hx} cy={yFor(highlight[s.key])} r={4} fill="#fff" stroke={s.color} strokeWidth={2.5} />
        ))}
      </svg>

      {/* Tooltip rendered in HTML for crisp text, positioned over the crosshair */}
      <div className="relative">
        <div
          className="absolute -top-24 w-max -translate-x-1/2 rounded-xl border border-slate-100 bg-surface p-3 shadow-card"
          style={{ left: `${(hx / WIDTH) * 100}%` }}
        >
          <p className="mb-1.5 text-xs font-bold text-ink">{highlight.label} 2026</p>
          <ul className="space-y-1">
            {series.map((s) => (
              <li key={s.key} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-ink-soft">{s.label}</span>
                <span className="ml-auto pl-4 font-semibold text-ink">{formatTooltip(highlight[s.key])}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
