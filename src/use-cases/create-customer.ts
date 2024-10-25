import { hash } from 'bcryptjs'

import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { Customer } from '@/entities/customer'

import { UserAlreadyExistsError } from '../core/errors/user-already-exists-error'

interface CreateCustomerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateCustomerUseCaseResponse {
  customer: Customer
}

export class CreateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const emailAlreadyInUse = await this.customersRepository.findByEmail(email)

    if (emailAlreadyInUse) {
      throw new UserAlreadyExistsError('email')
    }

    const customer = Customer.create({
      name,
      email,
      passwordHash: await hash(password, 6),
    })

    await this.customersRepository.create(customer)

    return { customer }
  }
}
