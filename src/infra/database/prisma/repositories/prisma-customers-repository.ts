import { Goal } from '@prisma/client'

import {
  CustomersRepository,
  UpdateCustomerDTO,
} from '@/adapters/repositories/customers-repository'
import { Customer } from '@/entities/customer'
import { CustomerWithMetadata } from '@/entities/value-objects/customer-with-metadata'
import { PrismaCustomerMapper } from '@/infra/database/prisma/mappers/prisma-customer-mapper'
import { PrismaCustomerWithMetadataMapper } from '@/infra/database/prisma/mappers/prisma-customer-with-metadata-mapper'
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

  async findByIdWithMetadata(id: string): Promise<CustomerWithMetadata | null> {
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

    return PrismaCustomerWithMetadataMapper.toDomain({
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
  ): Promise<CustomerWithMetadata | null> {
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

    return PrismaCustomerWithMetadataMapper.toDomain({
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
    const { name, email, passwordHash, ...metadata } = customer

    await prisma.user.update({
      data: {
        name,
        email,
        passwordHash,
        metadata: {
          update: {
            where: {
              userId: customer.customerId,
            },
            data: {
              age: metadata.age,
              weight: metadata.weight,
              height: metadata.height,
              goal: metadata.goal
                ? (Goal[metadata.goal as keyof typeof Goal] as Goal)
                : undefined,
              phone: metadata.phone,
              currencyAmount: metadata.currencyAmount,
              experienceAmount: metadata.experienceAmount,
              premiumExpiresAt: metadata.premiumExpiresAt,
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
