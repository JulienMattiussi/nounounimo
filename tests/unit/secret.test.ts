import { isWellFormedCode, unseal, CODE_LENGTH } from '@/lib/secret'
import { TEST_CODE, TEST_REWARD, TEST_SEALED } from '../fixtures/sealed'

describe('isWellFormedCode', () => {
  it('accepts a code of exactly the expected length', () => {
    expect(isWellFormedCode('1'.repeat(CODE_LENGTH))).toBe(true)
  })

  it('rejects wrong lengths, letters and empty input', () => {
    expect(isWellFormedCode('1'.repeat(CODE_LENGTH - 1))).toBe(false)
    expect(isWellFormedCode('1'.repeat(CODE_LENGTH + 1))).toBe(false)
    expect(isWellFormedCode('abcdefgh')).toBe(false)
    expect(isWellFormedCode('')).toBe(false)
  })
})

describe('unseal', () => {
  it('reveals the message with the right code', async () => {
    await expect(unseal(TEST_SEALED, TEST_CODE)).resolves.toBe(TEST_REWARD)
  })

  it('returns null for a wrong code of the right shape', async () => {
    await expect(unseal(TEST_SEALED, '00000000')).resolves.toBeNull()
  })

  it('returns null for a malformed code without touching the ciphertext', async () => {
    await expect(unseal(TEST_SEALED, 'bonjour')).resolves.toBeNull()
  })

  it('returns null when the ciphertext has been tampered with', async () => {
    const tampered = { ...TEST_SEALED, ciphertext: `A${TEST_SEALED.ciphertext.slice(1)}` }
    await expect(unseal(tampered, TEST_CODE)).resolves.toBeNull()
  })
})
