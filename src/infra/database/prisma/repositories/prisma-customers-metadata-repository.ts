import { CustomersMetadataRepository } from '@/adapters/repositories/customers-metadata-repository'
import { CustomerMetadata } from '@/entities/customer-metadata'
import { prisma } from '@/infra/libs/prisma'

import { PrismaCustomerMetadataMapper } from '../mappers/prisma-customer-metadata-mapper'

export class PrismaCustomersMetadataRepository
  implements CustomersMetadataRepository
{
  async findByCustomerId(customerId: string): Promise<CustomerMetadata | null> {
    const customerMetadata = await prisma.customerMetadata.findUnique({
      where: {
        userId: customerId,
      },
    })

    if (!customerMetadata) {
      return null
    }

    return PrismaCustomerMetadataMapper.toDomain(customerMetadata)
  }

  async findByPhone(phone: string): Promise<CustomerMetadata | null> {
    const customerMetadata = await prisma.customerMetadata.findUnique({
      where: {
        phone,
      },
    })

    if (!customerMetadata) {
      return null
    }

    return PrismaCustomerMetadataMapper.toDomain(customerMetadata)
  }

  async create(metadata: CustomerMetadata): Promise<void> {
    const data = PrismaCustomerMetadataMapper.toPrisma(metadata)

    await prisma.customerMetadata.create({
      data,
    })
  }
}
