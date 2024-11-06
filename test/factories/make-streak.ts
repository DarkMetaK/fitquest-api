import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Streak, StreakProps } from '@/entities/streak'
import { PrismaStreakMapper } from '@/infra/database/prisma/mappers/prisma-streak-mapper'
import { prisma } from '@/infra/libs/prisma'

export function makeStreak(
  override: Partial<StreakProps> = {},
  id?: UniqueEntityId,
) {
  const streak = Streak.create(
    {
      customerId: new UniqueEntityId(faker.string.uuid()),
      currentStreak: 0,
      maximumStreak: 0,
      remainingRestDays: 0,
      streakGoal: 7,
      weekStartDate: new Date(),
      ...override,
    },
    id,
  )

  return streak
}

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
