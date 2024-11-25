import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Streak, StreakProps } from '@/entities/streak'

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
