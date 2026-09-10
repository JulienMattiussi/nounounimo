import '@testing-library/jest-dom'
import { webcrypto } from 'node:crypto'

if (globalThis.crypto?.subtle === undefined) {
  Object.defineProperty(globalThis, 'crypto', { value: webcrypto, configurable: true })
}
