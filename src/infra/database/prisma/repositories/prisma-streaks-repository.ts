import { StreaksRepository } from '@/adapters/repositories/streaks-repository'
import { Streak } from '@/entities/streak'
import { prisma } from '@/infra/libs/prisma'

import { PrismaStreakMapper } from '../mappers/prisma-streak-mapper'

export class PrismaStreaksRepository implements StreaksRepository {
  async findByCustomerId(customerId: string): Promise<Streak | null> {
    const streak = await prisma.streak.findUnique({
      where: { userId: customerId },
    })

    if (!streak) {
      return null
    }

    return PrismaStreakMapper.toDomain(streak)
  }

  async create(streak: Streak): Promise<void> {
    const data = PrismaStreakMapper.toPrisma(streak)

    await prisma.streak.create({
      data,
    })
  }

  async update(streak: Streak): Promise<void> {
    const prismaStreak = PrismaStreakMapper.toPrisma(streak)

    await prisma.streak.update({
      where: { id: prismaStreak.id },
      data: {
        currentStreak: prismaStreak.currentStreak,
        maximumStreak: prismaStreak.maximumStreak,
        streakGoal: prismaStreak.streakGoal,
        weekStartDate: prismaStreak.weekStartDate,
        remainingRestDays: prismaStreak.remainingRestDays,
      },
    })
  }
}
