import { GetCustomerActivityHistoryUseCase } from '@/use-cases/get-customer-activity-history'

import { PrismaCustomerActivitiesRepository } from '../repositories/prisma-customer-activities-repository'
import { PrismaCustomersRepository } from '../repositories/prisma-customers-repository'

export class makeGetCustomerActivityHistory {
  static create(): GetCustomerActivityHistoryUseCase {
    const customersRepository = new PrismaCustomersRepository()
    const customerActivitiesRepository =
      new PrismaCustomerActivitiesRepository()

    const getCustomerActivityHistoryUseCase =
      new GetCustomerActivityHistoryUseCase(
        customersRepository,
        customerActivitiesRepository,
      )

    return getCustomerActivityHistoryUseCase
  }
}
