import { Prisma, Streak as PrismaStreak } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Streak } from '@/entities/streak'

export class PrismaStreakMapper {
  static toDomain(raw: PrismaStreak): Streak {
    const streak = Streak.create(
      {
        customerId: new UniqueEntityId(raw.userId),
        currentStreak: raw.currentStreak,
        maximumStreak: raw.maximumStreak,
        streakGoal: raw.streakGoal,
        weekStartDate: raw.weekStartDate,
        remainingRestDays: raw.remainingRestDays,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )

    return streak
  }

  static toPrisma(streak: Streak): Prisma.StreakUncheckedCreateInput {
    return {
      id: streak.id.toString(),
      userId: streak.customerId.toString(),
      currentStreak: streak.currentStreak,
      maximumStreak: streak.maximumStreak,
      streakGoal: streak.streakGoal,
      weekStartDate: streak.weekStartDate,
      remainingRestDays: streak.remainingRestDays,
      createdAt: streak.createdAt,
    }
  }
}
