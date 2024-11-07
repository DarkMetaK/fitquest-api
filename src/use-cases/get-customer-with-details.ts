import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { CustomerDetails } from '@/entities/value-objects/customer-details'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'

interface GetCustomerWithDetailsUseCaseRequest {
  customerId: string
}

interface GetCustomerWithDetailsUseCaseResponse {
  customer: CustomerDetails
}

export class GetCustomerWithDetailsUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    customerId,
  }: GetCustomerWithDetailsUseCaseRequest): Promise<GetCustomerWithDetailsUseCaseResponse> {
    const customer =
      await this.customersRepository.findByIdWithMetadata(customerId)

    if (!customer) {
      throw new ResourceNotFoundError(customerId)
    }

    return { customer }
  }
}
