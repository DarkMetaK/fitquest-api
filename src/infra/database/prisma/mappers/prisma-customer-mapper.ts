import { Prisma, User as PrismaUser } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Customer } from '@/entities/customer'

export class PrismaCustomerMapper {
  static toDomain(raw: PrismaUser): Customer {
    const customer = Customer.create(
      {
        name: raw.name,
        email: raw.email,
        passwordHash: raw.passwordHash,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )

    return customer
  }

  static toPrisma(customer: Customer): Prisma.UserUncheckedCreateInput {
    return {
      id: customer.id.toString(),
      name: customer.name,
      email: customer.email,
      passwordHash: customer.passwordHash,
      createdAt: customer.createdAt,
    }
  }
}
