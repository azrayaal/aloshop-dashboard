/** Geometry helpers for the dependency-free SVG line chart. */

export interface Point {
  x: number
  y: number
}

/**
 * Build a smooth SVG path (cubic Béziers via Catmull-Rom) through the points.
 * Produces the flowing curves seen in the dashboard's sales chart.
 */
export function smoothPath(points: Point[], tension = 0.2): string {
  if (points.length < 2) return ''
  let d = `M ${points[0].x},${points[0].y}`

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * (1 + tension)
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * (1 + tension)
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * (1 + tension)
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * (1 + tension)

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
  }
  return d
}
