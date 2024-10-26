import { BcryptHasher } from '@/infra/gateways/cryptography/bcrypt-hasher'
import { CreateCustomerUseCase } from '@/use-cases/create-customer'

import { PrismaCustomersRepository } from '../repositories/prisma-customers-repository'

export class makeCreateCustomerUseCase {
  static create(): CreateCustomerUseCase {
    const customerRepository = new PrismaCustomersRepository()
    const hashGenerator = new BcryptHasher()

    const createCustomerUseCase = new CreateCustomerUseCase(
      customerRepository,
      hashGenerator,
    )

    return createCustomerUseCase
  }
}
