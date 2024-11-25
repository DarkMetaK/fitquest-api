import { makeCustomerMetadata } from 'test/factories/make-customer-metadata'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerMetadataProps } from '@/entities/customer-metadata'
import { PrismaCustomerMetadataMapper } from '@/infra/database/prisma/mappers/prisma-customer-metadata-mapper'
import { prisma } from '@/infra/libs/prisma'

export async function makePrismaCustomerMetadata(
  data: Partial<CustomerMetadataProps> = {},
  id?: UniqueEntityId,
) {
  const metadata = makeCustomerMetadata(data, id)

  const prismaMetadata = await prisma.customerMetadata.create({
    data: PrismaCustomerMetadataMapper.toPrisma(metadata),
  })

  return prismaMetadata
}
