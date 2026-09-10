import { parseEmphasis } from '@/lib/richText'

describe('parseEmphasis', () => {
  it('leaves plain text in one piece', () => {
    expect(parseEmphasis('Regardez sous le banc.')).toEqual([
      { text: 'Regardez sous le banc.', strong: false },
    ])
  })

  it('lifts a marked run out of its surroundings', () => {
    expect(parseEmphasis('Regardez sous le **banc du parc**.')).toEqual([
      { text: 'Regardez sous le ', strong: false },
      { text: 'banc du parc', strong: true },
      { text: '.', strong: false },
    ])
  })

  it('handles a run at each end and several runs', () => {
    expect(parseEmphasis('**Ici**, puis **la**')).toEqual([
      { text: 'Ici', strong: true },
      { text: ', puis ', strong: false },
      { text: 'la', strong: true },
    ])
  })

  it('leaves a lone marker alone', () => {
    expect(parseEmphasis('deux **etoiles sans fin')).toEqual([
      { text: 'deux **etoiles sans fin', strong: false },
    ])
  })

  it('returns nothing for an empty message', () => {
    expect(parseEmphasis('')).toEqual([])
  })
})
