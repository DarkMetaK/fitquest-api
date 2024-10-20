import { randomUUID } from 'node:crypto'

import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash ?? null,
      birthDate: new Date(data.birthDate),
      weight: data.weight,
      height: data.height,
      avatarUrl: data.avatarUrl ?? '',
      role: 'MEMBER',
      currencyAmount: 0,
      experienceAmount: 0,
      createdAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}
