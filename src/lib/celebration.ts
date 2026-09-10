export const CONFETTI_COUNT = 36
export const BALLOON_COUNT = 7
export const TONE_COUNT = 5

export type ConfettiPiece = {
  left: number
  drift: number
  delay: number
  duration: number
  scale: number
  tone: number
}

export type Balloon = {
  left: number
  top: number
  size: number
  delay: number
  duration: number
  tone: number
}

const noise = (seed: number): number => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}

const round = (value: number): number => Math.round(value * 100) / 100

export function confettiPieces(): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, index) => ({
    left: round((index / CONFETTI_COUNT) * 100 + noise(index) * 2),
    drift: round(noise(index + 40) * 80 - 40),
    delay: round(noise(index + 80) * 6),
    duration: round(4.5 + noise(index + 120) * 4),
    scale: round(0.7 + noise(index + 160) * 0.7),
    tone: index % TONE_COUNT,
  }))
}

export function balloons(): Balloon[] {
  return Array.from({ length: BALLOON_COUNT }, (_, index) => ({
    left: round((index / BALLOON_COUNT) * 100 + noise(index + 200) * 6),
    top: round(6 + noise(index + 240) * 68),
    size: round(46 + noise(index + 280) * 44),
    delay: round(noise(index + 320) * 4),
    duration: round(6 + noise(index + 360) * 4),
    tone: index % TONE_COUNT,
  }))
}
