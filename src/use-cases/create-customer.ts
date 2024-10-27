import { HashGenerator } from '@/adapters/gateways/cryptography/hash-generator'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { EmailAlreadyTakenError } from '@/core/errors/email-already-taken-error'
import { Customer } from '@/entities/customer'

interface CreateCustomerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateCustomerUseCaseResponse {
  customer: Customer
}

export class CreateCustomerUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const emailAlreadyInUse = await this.customersRepository.findByEmail(email)

    if (emailAlreadyInUse) {
      throw new EmailAlreadyTakenError()
    }

    const customer = Customer.create({
      name,
      email,
      passwordHash: await this.hashGenerator.hash(password),
    })

    await this.customersRepository.create(customer)

    return { customer }
  }
}
