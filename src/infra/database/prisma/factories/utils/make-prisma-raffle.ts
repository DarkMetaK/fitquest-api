import { makeRaffle } from 'test/factories/make-raffle'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { RaffleProps } from '@/entities/raffle'
import { PrismaRaffleMapper } from '@/infra/database/prisma/mappers/prisma-raffle-mapper'
import { prisma } from '@/infra/libs/prisma'

export async function makePrismaRaffle(
  data: Partial<RaffleProps> = {},
  id?: UniqueEntityId,
) {
  const raffle = makeRaffle(data, id)

  const prismaRaffle = await prisma.raffle.create({
    data: PrismaRaffleMapper.toPrisma(raffle),
  })

  return prismaRaffle
}
