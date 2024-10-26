import { compare, hash } from 'bcryptjs'

import { HashComparer } from '@/adapters/gateways/cryptography/hash-comparer'
import { HashGenerator } from '@/adapters/gateways/cryptography/hash-generator'

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  hash(plain: string) {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string) {
    return compare(plain, hash)
  }
}
