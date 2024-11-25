import { makeCustomerRaffle } from 'test/factories/make-customer-raffle'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerRaffleProps } from '@/entities/customer-raffle'
import { PrismaCustomerRaffleMapper } from '@/infra/database/prisma/mappers/prisma-customer-raffle-mapper'
import { prisma } from '@/infra/libs/prisma'

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
