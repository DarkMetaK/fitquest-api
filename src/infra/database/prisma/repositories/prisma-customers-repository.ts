import { CustomersRepository } from '@/adapters/repositories/customers-repository'
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

    return PrismaCustomerWithMetadataMapper.toDomain({
      ...customer,
      metadata: customer.metadata ?? undefined,
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

    return PrismaCustomerWithMetadataMapper.toDomain({
      ...customer,
      metadata: customer.metadata ?? undefined,
    })
  }

  async findByPhone(phone: string): Promise<CustomerWithMetadata | null> {
    const metadata = await prisma.customerMetadata.findUnique({
      where: { phone },
      include: {
        user: true,
      },
    })

    if (!metadata) {
      return null
    }

    const { user, ...rest } = metadata

    return PrismaCustomerWithMetadataMapper.toDomain({
      ...user,
      metadata: rest,
    })
  }

  async create(customer: Customer): Promise<void> {
    const data = PrismaCustomerMapper.toPrisma(customer)

    await prisma.user.create({
      data,
    })
  }

  async update(customer: CustomerWithMetadata): Promise<void> {
    const { metadata, ...rest } =
      PrismaCustomerWithMetadataMapper.toPrisma(customer)

    await prisma.user.update({
      data: {
        ...rest,
        metadata: metadata && {
          connectOrCreate: {
            where: {
              id: metadata.id,
            },
            create: metadata,
          },
        },
      },
      where: {
        id: rest.id,
      },
    })
  }
}
