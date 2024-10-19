import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

import { ConflictError } from './errors/conflict-error'

interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
  birthDate: Date
  weight: number
  height: number
  avatarUrl?: string
}

interface CreateAccountUseCaseResponse {
  user: User
}

export class CreateAccountUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    birthDate,
    weight,
    height,
    avatarUrl,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email)

    if (emailAlreadyInUse) {
      throw new ConflictError('Email already exists.')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash: await hash(password, 6),
      birthDate,
      weight,
      height,
      avatarUrl,
    })

    return { user }
  }
}
