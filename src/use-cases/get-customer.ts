import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { Customer } from '@/entities/customer'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'

interface GetCustomerUseCaseRequest {
  customerId: string
}

interface GetCustomerUseCaseResponse {
  customer: Customer
}

export class GetCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    customerId,
  }: GetCustomerUseCaseRequest): Promise<GetCustomerUseCaseResponse> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new ResourceNotFoundError(customerId)
    }

    return { customer }
  }
}
