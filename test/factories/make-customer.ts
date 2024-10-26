import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Customer, CustomerProps } from '@/entities/customer'
import { PrismaCustomerMapper } from '@/infra/database/prisma/mappers/prisma-customer-mapper'
import { prisma } from '@/infra/libs/prisma'

export function makeCustomer(
  override: Partial<CustomerProps> = {},
  id?: UniqueEntityId,
) {
  const customer = Customer.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
      ...override,
    },
    id,
  )

  return customer
}

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
