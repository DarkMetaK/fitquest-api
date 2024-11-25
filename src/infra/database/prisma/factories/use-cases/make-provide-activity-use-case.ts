import { ProvideActivityUseCase } from '@/use-cases/provide-activity'

import { PrismaCustomerActivitiesRepository } from '../../repositories/prisma-customer-activities-repository'
import { PrismaCustomersMetadataRepository } from '../../repositories/prisma-customers-metadata-repository'
import { PrismaStreaksRepository } from '../../repositories/prisma-streaks-repository'

export class makeProvideActivityUseCase {
  static create(): ProvideActivityUseCase {
    const customersMetadataRepository = new PrismaCustomersMetadataRepository()
    const streaksRepository = new PrismaStreaksRepository()
    const customerActivitiesRepository =
      new PrismaCustomerActivitiesRepository()

    const provideActivityUseCase = new ProvideActivityUseCase(
      customersMetadataRepository,
      customerActivitiesRepository,
      streaksRepository,
    )

    return provideActivityUseCase
  }
}
