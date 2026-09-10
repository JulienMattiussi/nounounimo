import { POSTIT_COUNT, postitLabel, postitLabels, postitTilt } from '@/lib/postits'

describe('postitLabels', () => {
  it('produces one label per post-it of the 8 by 8 grid', () => {
    expect(postitLabels()).toHaveLength(64)
    expect(POSTIT_COUNT).toBe(64)
  })

  it('runs alphabetically from AA to CL', () => {
    const labels = postitLabels()
    expect(labels[0]).toBe('AA')
    expect(labels[25]).toBe('AZ')
    expect(labels[26]).toBe('BA')
    expect(labels[51]).toBe('BZ')
    expect(labels.at(-1)).toBe('CL')
  })

  it('never repeats a label', () => {
    expect(new Set(postitLabels()).size).toBe(POSTIT_COUNT)
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
