/** Formatting helpers for the admin dashboard. */

/** Format a number with an Indonesian thousands separator. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value)
}

/** Format a signed percentage delta, e.g. 12.4 -> "12.4%". */
export function formatPct(value: number, fractionDigits = 1): string {
  return `${value.toFixed(fractionDigits)}%`
}
