import {
  BALLOON_COUNT,
  CONFETTI_COUNT,
  TONE_COUNT,
  balloons,
  confettiPieces,
} from '@/lib/celebration'

describe('confettiPieces', () => {
  it('spreads the pieces across the width and over the whole palette', () => {
    const pieces = confettiPieces()
    expect(pieces).toHaveLength(CONFETTI_COUNT)
    expect(new Set(pieces.map((piece) => piece.tone)).size).toBe(TONE_COUNT)
    for (const piece of pieces) {
      expect(piece.left).toBeGreaterThanOrEqual(0)
      expect(piece.left).toBeLessThanOrEqual(102)
      expect(piece.duration).toBeGreaterThan(0)
      expect(piece.scale).toBeGreaterThan(0)
    }
  })

  it('is stable, so the fall does not restart on every render', () => {
    expect(confettiPieces()).toEqual(confettiPieces())
  })
})

describe('balloons', () => {
  it('keeps every balloon inside the viewport', () => {
    const floaters = balloons()
    expect(floaters).toHaveLength(BALLOON_COUNT)
    for (const balloon of floaters) {
      expect(balloon.left).toBeGreaterThanOrEqual(0)
      expect(balloon.left).toBeLessThanOrEqual(100)
      expect(balloon.top).toBeGreaterThanOrEqual(0)
      expect(balloon.top).toBeLessThanOrEqual(80)
      expect(balloon.size).toBeGreaterThan(40)
    }
  })

  it('is stable across calls', () => {
    expect(balloons()).toEqual(balloons())
  })
})
