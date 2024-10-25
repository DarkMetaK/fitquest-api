import { compare } from 'bcryptjs'

import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { Customer } from '@/entities/customer'

import { InvalidCredentialsError } from '../core/errors/invalid-credentials-error'
import { LoginMethodError } from '../core/errors/login-method-error'

interface AuthenticateWithPasswordUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateWithPasswordUseCaseResponse {
  customer: Customer
}

export class AuthenticateWithPasswordUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateWithPasswordUseCaseRequest): Promise<AuthenticateWithPasswordUseCaseResponse> {
    const customerWithEmail = await this.customersRepository.findByEmail(email)

    if (!customerWithEmail) {
      throw new InvalidCredentialsError()
    }

    if (!customerWithEmail.passwordHash) {
      throw new LoginMethodError(
        'User does not have a password, use social login.',
      )
    }

    const isPasswordValid = await compare(
      password,
      customerWithEmail.passwordHash,
    )

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    return { customer: customerWithEmail }
  }
}
