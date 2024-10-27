import { GetCustomerUseCase } from '@/use-cases/get-customer'

import { PrismaCustomersRepository } from '../repositories/prisma-customers-repository'

export class makeGetCustomerUseCase {
  static create(): GetCustomerUseCase {
    const customersRepository = new PrismaCustomersRepository()

    const getCustomerUseCase = new GetCustomerUseCase(customersRepository)

    return getCustomerUseCase
  }
}
