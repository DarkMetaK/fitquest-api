import { Goal, User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  age: number
  weight: number
  height: number
  goal: Goal
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
    phone,
    age,
    weight,
    height,
    goal,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email)
    const phoneAlreadyInUse = await this.usersRepository.findByPhone(phone)

    if (emailAlreadyInUse) {
      throw new UserAlreadyExistsError('email')
    }

    if (phoneAlreadyInUse) {
      throw new UserAlreadyExistsError('phone')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash: await hash(password, 6),
      phone,
      age,
      weight,
      height,
      goal,
    })

    return { user }
  }
}
