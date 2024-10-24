import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { LoginMethodError } from './errors/login-method-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const userWithEmail = await this.usersRepository.findByEmail(email)

    if (!userWithEmail) {
      throw new InvalidCredentialsError()
    }

    if (!userWithEmail.passwordHash) {
      throw new LoginMethodError(
        'User does not have a password, use social login.',
      )
    }

    const isPasswordValid = await compare(password, userWithEmail.passwordHash)

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    return { user: userWithEmail }
  }
}
