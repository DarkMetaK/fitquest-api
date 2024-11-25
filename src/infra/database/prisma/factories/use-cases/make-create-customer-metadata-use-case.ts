import { CreateCustomerMetadataUseCase } from '@/use-cases/create-customer-metadata'

import { PrismaCustomersMetadataRepository } from '../../repositories/prisma-customers-metadata-repository'
import { PrismaCustomersRepository } from '../../repositories/prisma-customers-repository'

export class makeCreateCustomerMetadataUseCase {
  static create(): CreateCustomerMetadataUseCase {
    const customersRepository = new PrismaCustomersRepository()
    const customersMetadataRepository = new PrismaCustomersMetadataRepository()

    const createCustomerMetadataUseCase = new CreateCustomerMetadataUseCase(
      customersRepository,
      customersMetadataRepository,
    )

    return createCustomerMetadataUseCase
  }
}
