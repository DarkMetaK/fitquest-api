import { makeStreak } from 'test/factories/make-streak'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { StreakProps } from '@/entities/streak'
import { PrismaStreakMapper } from '@/infra/database/prisma/mappers/prisma-streak-mapper'
import { prisma } from '@/infra/libs/prisma'

export async function makePrismaStreak(
  data: Partial<StreakProps> = {},
  id?: UniqueEntityId,
) {
  const streak = makeStreak(data, id)

  const prismaStreak = await prisma.streak.create({
    data: PrismaStreakMapper.toPrisma(streak),
  })

  return prismaStreak
}
