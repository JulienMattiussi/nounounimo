import type { SealedMessage } from '@/lib/secret'

export const TEST_CODE = '13579246'
export const TEST_REWARD = 'Regardez sous le **banc du parc**.'
export const TEST_REWARD_SHOWN = 'Regardez sous le banc du parc.'
export const TEST_REWARD_STRONG = 'banc du parc'

export const TEST_SEALED: SealedMessage = {
  iterations: 1000,
  salt: 'N6XOJ0ZZQswzJ0x1vUjyAg==',
  iv: 'xDQAn8IjpE24PLEJ',
  ciphertext: 'x3Vq19FJCrSiTp1DMo+/JOH8TdAUVJ7fmDhRKf38p9sbOPSBZmFR3TPY1COBFcLmGIA=',
}
