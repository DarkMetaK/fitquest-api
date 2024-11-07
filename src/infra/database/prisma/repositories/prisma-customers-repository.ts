import { Goal } from '@prisma/client'

import {
  CustomersRepository,
  UpdateCustomerDTO,
} from '@/adapters/repositories/customers-repository'
import { Customer } from '@/entities/customer'
import { CustomerDetails } from '@/entities/value-objects/customer-details'
import { PrismaCustomerMapper } from '@/infra/database/prisma/mappers/prisma-customer-mapper'
import { PrismaCustomerDetailsMapper } from '@/infra/database/prisma/mappers/prisma-customer-with-metadata-mapper'
import { prisma } from '@/infra/libs/prisma'

export class PrismaCustomersRepository implements CustomersRepository {
  async findById(id: string): Promise<Customer | null> {
    const customer = await prisma.user.findUnique({
      where: { id },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomerMapper.toDomain(customer)
  }

  async findByIdWithMetadata(id: string): Promise<CustomerDetails | null> {
    const customer = await prisma.user.findUnique({
      where: { id },
      include: {
        metadata: true,
      },
    })

    if (!customer) {
      return null
    }

    if (!customer.metadata) {
      return null
    }

    return PrismaCustomerDetailsMapper.toDomain({
      ...customer,
      metadata: customer.metadata,
    })
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await prisma.user.findUnique({
      where: { email },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomerMapper.toDomain(customer)
  }

  async findByEmailWithMetadata(
    email: string,
  ): Promise<CustomerDetails | null> {
    const customer = await prisma.user.findUnique({
      where: { email },
      include: {
        metadata: true,
      },
    })

    if (!customer) {
      return null
    }

    if (!customer.metadata) {
      return null
    }

    return PrismaCustomerDetailsMapper.toDomain({
      ...customer,
      metadata: customer.metadata,
    })
  }

  async create(customer: Customer): Promise<void> {
    const data = PrismaCustomerMapper.toPrisma(customer)

    await prisma.user.create({
      data,
    })
  }

  async update(customer: UpdateCustomerDTO): Promise<void> {
    await prisma.user.update({
      data: {
        name: customer.name,
        email: customer.email,
        passwordHash: customer.passwordHash,
        metadata: {
          update: {
            where: {
              userId: customer.customerId,
            },
            data: {
              age: customer.age,
              weight: customer.weight,
              height: customer.height,
              goal: customer.goal
                ? (Goal[customer.goal as keyof typeof Goal] as Goal)
                : undefined,
              phone: customer.phone,
              currencyAmount: customer.currencyAmount,
              experienceAmount: customer.experienceAmount,
              premiumExpiresAt: customer.premiumExpiresAt,
            },
          },
        },
      },
      where: {
        id: customer.customerId,
      },
    })
  }
}
