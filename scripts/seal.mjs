#!/usr/bin/env node
// Scelle le message de recompense avec le code comme cle. Le texte en clair
// n'est jamais ecrit sur le disque : seul le bloc chiffre l'est.
import { webcrypto } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

const CODE_LENGTH = 8
const DEFAULT_ITERATIONS = 600000
const DEFAULT_OUTPUT = 'src/sealed.ts'

const readFlag = (name, fallback) => {
  const flag = `--${name}=`
  const found = process.argv.find((argument) => argument.startsWith(flag))
  return found === undefined ? fallback : found.slice(flag.length)
}

const iterations = Number(readFlag('iterations', DEFAULT_ITERATIONS))
const output = readFlag('out', DEFAULT_OUTPUT)
const printOnly = process.argv.includes('--print')

const toBase64 = (buffer) => Buffer.from(buffer).toString('base64')

async function seal(code, message) {
  const salt = webcrypto.getRandomValues(new Uint8Array(16))
  const iv = webcrypto.getRandomValues(new Uint8Array(12))
  const material = await webcrypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(code),
    'PBKDF2',
    false,
    ['deriveKey'],
  )
  const key = await webcrypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  )
  const ciphertext = await webcrypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(message),
  )

  return {
    iterations,
    salt: toBase64(salt),
    iv: toBase64(iv),
    ciphertext: toBase64(ciphertext),
  }
}

async function ask() {
  if (process.env.SEAL_CODE !== undefined && process.env.SEAL_MESSAGE !== undefined) {
    return { code: process.env.SEAL_CODE, message: process.env.SEAL_MESSAGE }
  }

  const rl = createInterface({ input: stdin, output: stdout })
  const code = (await rl.question(`Code a ${CODE_LENGTH} chiffres : `)).trim()
  const message = (await rl.question('Message de recompense (**gras** possible) : ')).trim()
  rl.close()
  return { code, message }
}

const { code, message } = await ask()

if (!new RegExp(`^[0-9]{${CODE_LENGTH}}$`).test(code)) {
  console.error(`Le code doit faire exactement ${CODE_LENGTH} chiffres.`)
  process.exit(1)
}

if (message.length === 0) {
  console.error('Le message ne peut pas etre vide.')
  process.exit(1)
}

const sealed = await seal(code, message)

if (printOnly) {
  console.log(JSON.stringify(sealed, null, 2))
} else {
  const contents = `import type { SealedMessage } from '@/lib/secret'

export const SEALED_MESSAGE: SealedMessage = {
  iterations: ${sealed.iterations},
  salt: '${sealed.salt}',
  iv: '${sealed.iv}',
  ciphertext: '${sealed.ciphertext}',
}
`
  writeFileSync(output, contents)
  console.log(`Message scelle dans ${output} (${iterations} iterations).`)
  console.log('Relis le fichier : il ne doit contenir que du base64.')
}
