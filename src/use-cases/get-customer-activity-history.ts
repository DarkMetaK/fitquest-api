import dayjs from 'dayjs'

import { CustomerActivitiesRepository } from '@/adapters/repositories/customer-activities-repository'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { CustomerActivity } from '@/entities/customer-activity'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'

interface GetCustomerActivityHistoryUseCaseRequest {
  customerId: string
  from?: Date
  until?: Date
}

interface GetCustomerActivityHistoryUseCaseResponse {
  activities: CustomerActivity[]
}

export class GetCustomerActivityHistoryUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private customerActivitiesRepository: CustomerActivitiesRepository,
  ) {}

  async execute({
    customerId,
    from = dayjs().subtract(30, 'days').toDate(),
    until = dayjs().toDate(),
  }: GetCustomerActivityHistoryUseCaseRequest): Promise<GetCustomerActivityHistoryUseCaseResponse> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new ResourceNotFoundError(customerId)
    }

    const activities =
      await this.customerActivitiesRepository.findManyByCustomerIdAndDatePeriod(
        customerId,
        from,
        until,
      )

    return { activities }
  }
}
