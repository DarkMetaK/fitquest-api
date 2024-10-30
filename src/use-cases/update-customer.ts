import { HashGenerator } from '@/adapters/gateways/cryptography/hash-generator'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface UpdateCustomerUseCaseRequest {
  customerId: string
  name?: string
  password?: string
  phone?: string
  age?: number
  weight?: number
  height?: number
  goal?: string
  weeklyStreakGoal?: number
}

export class UpdateCustomerUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    customerId,
    name,
    password,
    phone,
    age,
    weight,
    height,
    goal,
    weeklyStreakGoal,
  }: UpdateCustomerUseCaseRequest): Promise<void> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new ResourceNotFoundError()
    }

    // TODO: Validate new phone

    await this.customersRepository.update({
      customerId,
      name,
      passwordHash: password
        ? await this.hashGenerator.hash(password)
        : undefined,
      phone,
      age,
      weight,
      height,
      goal,
      weeklyStreakGoal,
    })
  }
}
