export type TextSegment = {
  text: string
  strong: boolean
}

const EMPHASIS = /\*\*([^*]+)\*\*/g

export function parseEmphasis(text: string): TextSegment[] {
  const segments: TextSegment[] = []
  let cursor = 0

  for (const match of text.matchAll(EMPHASIS)) {
    const start = match.index ?? 0
    if (start > cursor) {
      segments.push({ text: text.slice(cursor, start), strong: false })
    }
    segments.push({ text: match[1] ?? '', strong: true })
    cursor = start + match[0].length
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), strong: false })
  }

  return segments
}
