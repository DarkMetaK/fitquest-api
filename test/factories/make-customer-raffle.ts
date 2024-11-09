import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerRaffle, CustomerRaffleProps } from '@/entities/customer-raffle'
import { PrismaCustomerRaffleMapper } from '@/infra/database/prisma/mappers/prisma-customer-raffle-mapper'
import { prisma } from '@/infra/libs/prisma'

export function makeCustomerRaffle(
  override: Partial<CustomerRaffleProps> = {},
  id?: UniqueEntityId,
) {
  const ticket = CustomerRaffle.create(
    {
      customerId: new UniqueEntityId(faker.string.uuid()),
      raffleId: new UniqueEntityId(faker.string.uuid()),
      hasWon: null,
      ...override,
    },
    id,
  )

  return ticket
}

export async function makePrismaCustomerRaffle(
  data: Partial<CustomerRaffleProps> = {},
  id?: UniqueEntityId,
) {
  const ticket = makeCustomerRaffle(data, id)

  const prismaTicket = await prisma.customerRaffle.create({
    data: PrismaCustomerRaffleMapper.toPrisma(ticket),
  })

  return prismaTicket
}
