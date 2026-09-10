const POSTIT_ROWS = 8
const POSTIT_COLUMNS = 8

export const POSTIT_COUNT = POSTIT_ROWS * POSTIT_COLUMNS

const ALPHABET_SIZE = 26
const FIRST_LETTER_CODE = 'A'.charCodeAt(0)

export function postitLabel(index: number): string {
  const first = String.fromCharCode(FIRST_LETTER_CODE + Math.floor(index / ALPHABET_SIZE))
  const second = String.fromCharCode(FIRST_LETTER_CODE + (index % ALPHABET_SIZE))
  return `${first}${second}`
}

export function postitLabels(): string[] {
  return Array.from({ length: POSTIT_COUNT }, (_, index) => postitLabel(index))
}

export function postitTilt(index: number): number {
  const noise = Math.sin((index + 1) * 12.9898) * 43758.5453
  const fraction = noise - Math.floor(noise)
  return Math.round((fraction * 4 - 2) * 100) / 100
}
