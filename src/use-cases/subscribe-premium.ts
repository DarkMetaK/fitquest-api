import dayjs from 'dayjs'

import { CustomersRepository } from '@/adapters/repositories/customers-repository'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'

interface SubscribePremiumUseCaseRequest {
  customerId: string
  months: number
}

export class SubscribePremiumUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    customerId,
    months,
  }: SubscribePremiumUseCaseRequest): Promise<void> {
    const customer =
      await this.customersRepository.findByIdWithMetadata(customerId)

    if (!customer) {
      throw new ResourceNotFoundError(customerId)
    }

    if (customer.premiumExpiresAt) {
      customer.premiumExpiresAt = dayjs(customer.premiumExpiresAt)
        .add(months, 'month')
        .toDate()
    } else {
      customer.premiumExpiresAt = dayjs().add(months, 'month').toDate()
    }

    await this.customersRepository.update(customer)
  }
}
