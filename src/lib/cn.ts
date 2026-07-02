/**
 * Tiny className combiner — filters falsy values and joins with spaces.
 */
export type ClassValue = string | false | null | undefined

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
