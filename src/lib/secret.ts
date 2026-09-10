export type SealedMessage = {
  iterations: number
  salt: string
  iv: string
  ciphertext: string
}

export const CODE_LENGTH = 8

const CODE_PATTERN = new RegExp(`^[0-9]{${CODE_LENGTH}}$`)

export const isWellFormedCode = (code: string): boolean => CODE_PATTERN.test(code)

const fromBase64 = (value: string): ArrayBuffer => {
  const binary = atob(value)
  const buffer = new ArrayBuffer(binary.length)
  const bytes = new Uint8Array(buffer)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }
  return buffer
}

const fromUtf8 = (value: string): ArrayBuffer => {
  const encoded = new TextEncoder().encode(value)
  const buffer = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(buffer).set(encoded)
  return buffer
}

export async function unseal(sealed: SealedMessage, code: string): Promise<string | null> {
  if (!isWellFormedCode(code)) {
    return null
  }

  try {
    const material = await crypto.subtle.importKey('raw', fromUtf8(code), 'PBKDF2', false, [
      'deriveKey',
    ])
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: fromBase64(sealed.salt),
        iterations: sealed.iterations,
        hash: 'SHA-256',
      },
      material,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt'],
    )
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromBase64(sealed.iv) },
      key,
      fromBase64(sealed.ciphertext),
    )
    return new TextDecoder().decode(plain)
  } catch {
    return null
  }
}
