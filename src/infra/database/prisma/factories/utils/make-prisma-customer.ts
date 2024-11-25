import { makeCustomer } from 'test/factories/make-customer'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerProps } from '@/entities/customer'
import { PrismaCustomerMapper } from '@/infra/database/prisma/mappers/prisma-customer-mapper'
import { prisma } from '@/infra/libs/prisma'

export async function makePrismaCustomer(
  data: Partial<CustomerProps> = {},
  id?: UniqueEntityId,
) {
  const customer = makeCustomer(data, id)

  const prismaCustomer = await prisma.user.create({
    data: PrismaCustomerMapper.toPrisma(customer),
  })

  return prismaCustomer
}
