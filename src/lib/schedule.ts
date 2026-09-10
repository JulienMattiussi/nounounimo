export const OPENS_AT = new Date('2026-09-12T18:00:00+02:00')

export function isOpen(now: Date): boolean {
  return now.getTime() >= OPENS_AT.getTime()
}

export function waitBefore(now: Date): number {
  return Math.max(OPENS_AT.getTime() - now.getTime(), 0)
}
