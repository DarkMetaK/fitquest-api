import { Encrypter } from '@/adapters/gateways/cryptography/encrypter'
import { HashComparer } from '@/adapters/gateways/cryptography/hash-comparer'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'

import { InvalidCredentialsError } from '../core/errors/invalid-credentials-error'
import { LoginMethodError } from '../core/errors/login-method-error'

interface AuthenticateWithPasswordUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateWithPasswordUseCaseResponse {
  accessToken: string
}

export class AuthenticateWithPasswordUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateWithPasswordUseCaseRequest): Promise<AuthenticateWithPasswordUseCaseResponse> {
    const customerWithEmail =
      await this.customersRepository.findByEmailWithMetadata(email)

    if (!customerWithEmail) {
      throw new InvalidCredentialsError()
    }

    if (!customerWithEmail.passwordHash) {
      throw new LoginMethodError(
        'User does not have a password, use social login.',
      )
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      customerWithEmail.passwordHash,
    )

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt({
      sub: customerWithEmail.customerId,
      hasFinishedRegistration: !!customerWithEmail.metadata,
    })

    return { accessToken }
  }
}
