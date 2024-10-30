import { CustomersMetadataRepository } from '@/adapters/repositories/customers-metadata-repository'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerAlreadyHasMetadataError } from '@/core/errors/customer-already-has-metadata-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { CustomerMetadata } from '@/entities/customer-metadata'

interface CreateCustomerMetadataUseCaseRequest {
  customerId: string
  phone: string
  age: number
  weight: number
  height: number
  goal: string
  weeklyStreakGoal: number
  currencyAmount?: number
  experienceAmount?: number
}

interface CreateCustomerMetadataUseCaseResponse {
  customerMetadata: CustomerMetadata
}

export class CreateCustomerMetadataUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private customersMetadataRepository: CustomersMetadataRepository,
  ) {}

  async execute({
    customerId,
    phone,
    age,
    weight,
    height,
    goal,
    weeklyStreakGoal,
    currencyAmount = 0,
    experienceAmount = 0,
  }: CreateCustomerMetadataUseCaseRequest): Promise<CreateCustomerMetadataUseCaseResponse> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new ResourceNotFoundError()
    }

    const customerAlreadyHasMetadata =
      await this.customersMetadataRepository.findByCustomerId(customerId)

    if (customerAlreadyHasMetadata) {
      throw new CustomerAlreadyHasMetadataError()
    }

    const customerMetadata = CustomerMetadata.create({
      customerId: new UniqueEntityId(customerId),
      phone,
      age,
      weight,
      height,
      goal,
      weeklyStreakGoal,
      currencyAmount, // In case user has some special voucher it won't be 0
      experienceAmount,
    })

    await this.customersMetadataRepository.create(customerMetadata)

    return { customerMetadata }
  }
}
