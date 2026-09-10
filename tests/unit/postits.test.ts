import {
  POSTIT_COUNT,
  START_INDEX,
  START_LABEL,
  postitLabel,
  postits,
  postitTilt,
} from '@/lib/postits'

describe('postits', () => {
  it('fills the 9 by 9 grid', () => {
    expect(POSTIT_COUNT).toBe(81)
    expect(postits()).toHaveLength(81)
  })

  it('puts the start tile dead centre', () => {
    const tiles = postits()
    expect(START_INDEX).toBe(40)
    expect(tiles[START_INDEX]).toEqual({ label: START_LABEL, isStart: true })
    expect(tiles.filter((tile) => tile.isStart)).toHaveLength(1)
  })

  it('runs alphabetically from AA to DB, stepping over the start tile', () => {
    const tiles = postits()
    expect(tiles[0]?.label).toBe('AA')
    expect(tiles[25]?.label).toBe('AZ')
    expect(tiles[26]?.label).toBe('BA')
    expect(tiles[39]?.label).toBe('BN')
    expect(tiles[41]?.label).toBe('BO')
    expect(tiles.at(-1)?.label).toBe('DB')
  })

  it('never repeats a label', () => {
    expect(new Set(postits().map((tile) => tile.label)).size).toBe(POSTIT_COUNT)
  })
})

describe('postitTilt', () => {
  it('stays within a discreet range', () => {
    for (let index = 0; index < POSTIT_COUNT; index += 1) {
      expect(Math.abs(postitTilt(index))).toBeLessThanOrEqual(2)
    }
  })

  it('is stable across calls so the grid does not dance on re-render', () => {
    expect(postitTilt(7)).toBe(postitTilt(7))
    expect(postitLabel(7)).toBe('AH')
  })
})
