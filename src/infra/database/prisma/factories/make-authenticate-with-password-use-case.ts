import { BcryptHasher } from '@/infra/gateways/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'
import { AuthenticateWithPasswordUseCase } from '@/use-cases/authenticate-with-password'

import { PrismaCustomersRepository } from '../repositories/prisma-customers-repository'

export class makeAuthenticateWithPasswordUseCase {
  static create(): AuthenticateWithPasswordUseCase {
    const customerRepository = new PrismaCustomersRepository()
    const hashComparer = new BcryptHasher()
    const tokenGenerator = new JwtEncrypter()

    const authenticateWithPasswordUseCase = new AuthenticateWithPasswordUseCase(
      customerRepository,
      hashComparer,
      tokenGenerator,
    )

    return authenticateWithPasswordUseCase
  }
}
