import { CreateCustomerUseCase } from '@/use-cases/create-customer'

import { PrismaCustomersRepository } from '../repositories/prisma-customers-repository'

export class makeCreateCustomerUseCase {
  static create(): CreateCustomerUseCase {
    const customerRepository = new PrismaCustomersRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    return createCustomerUseCase
  }
}
