import { BcryptHasher } from '@/infra/gateways/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'
import { AuthenticateWithPasswordUseCase } from '@/use-cases/authenticate-with-password'

import { PrismaCustomersMetadataRepository } from '../../repositories/prisma-customers-metadata-repository'
import { PrismaCustomersRepository } from '../../repositories/prisma-customers-repository'

export class makeAuthenticateWithPasswordUseCase {
  static create(): AuthenticateWithPasswordUseCase {
    const customersRepository = new PrismaCustomersRepository()
    const customersMetadataRepository = new PrismaCustomersMetadataRepository()
    const hashComparer = new BcryptHasher()
    const tokenGenerator = new JwtEncrypter()

    const authenticateWithPasswordUseCase = new AuthenticateWithPasswordUseCase(
      customersRepository,
      customersMetadataRepository,
      hashComparer,
      tokenGenerator,
    )

    return authenticateWithPasswordUseCase
  }
}
