import { GetCustomerWithDetailsUseCase } from '@/use-cases/get-customer-with-details'

import { PrismaCustomersRepository } from '../../repositories/prisma-customers-repository'

export class makeGetCustomerWithDetailsUseCase {
  static create(): GetCustomerWithDetailsUseCase {
    const customersRepository = new PrismaCustomersRepository()

    const getCustomerWithDetailsUseCase = new GetCustomerWithDetailsUseCase(
      customersRepository,
    )

    return getCustomerWithDetailsUseCase
  }
}
