import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Raffle, RaffleProps } from '@/entities/raffle'
import { PrismaRaffleMapper } from '@/infra/database/prisma/mappers/prisma-raffle-mapper'
import { prisma } from '@/infra/libs/prisma'

export function makeRaffle(
  override: Partial<RaffleProps> = {},
  id?: UniqueEntityId,
) {
  const raffle = Raffle.create(
    {
      name: faker.person.fullName(),
      bannerUrl: faker.image.url(),
      isPremium: false,
      price: faker.number.int({ min: 1, max: 1000 }),
      expiresAt: faker.date.future(),
      ...override,
    },
    id,
  )

  return raffle
}

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
