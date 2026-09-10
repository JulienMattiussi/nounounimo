const POSTIT_ROWS = 9
const POSTIT_COLUMNS = 9

export const POSTIT_COUNT = POSTIT_ROWS * POSTIT_COLUMNS
export const START_INDEX = (POSTIT_COUNT - 1) / 2
export const START_LABEL = 'DEPART'

const ALPHABET_SIZE = 26
const FIRST_LETTER_CODE = 'A'.charCodeAt(0)

export type Postit = {
  label: string
  isStart: boolean
}

export function postitLabel(index: number): string {
  const first = String.fromCharCode(FIRST_LETTER_CODE + Math.floor(index / ALPHABET_SIZE))
  const second = String.fromCharCode(FIRST_LETTER_CODE + (index % ALPHABET_SIZE))
  return `${first}${second}`
}

export function postits(): Postit[] {
  return Array.from({ length: POSTIT_COUNT }, (_, index) => {
    if (index === START_INDEX) {
      return { label: START_LABEL, isStart: true }
    }
    return { label: postitLabel(index < START_INDEX ? index : index - 1), isStart: false }
  })
}

export function postitTilt(index: number): number {
  const noise = Math.sin((index + 1) * 12.9898) * 43758.5453
  const fraction = noise - Math.floor(noise)
  return Math.round((fraction * 4 - 2) * 100) / 100
}
