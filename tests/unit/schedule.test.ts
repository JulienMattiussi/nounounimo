import { OPENS_AT, isOpen, waitBefore } from '@/lib/schedule'

const at = (offset: number) => new Date(OPENS_AT.getTime() + offset)

describe('isOpen', () => {
  it('keeps the door shut before the opening', () => {
    expect(isOpen(at(-1))).toBe(false)
    expect(isOpen(at(-86_400_000))).toBe(false)
  })

  it('opens on the dot and stays open', () => {
    expect(isOpen(at(0))).toBe(true)
    expect(isOpen(at(1))).toBe(true)
    expect(isOpen(at(86_400_000))).toBe(true)
  })
})

describe('waitBefore', () => {
  it('counts the milliseconds left', () => {
    expect(waitBefore(at(-5_000))).toBe(5_000)
  })

  it('never goes negative once the door is open', () => {
    expect(waitBefore(at(0))).toBe(0)
    expect(waitBefore(at(10_000))).toBe(0)
  })
})
