import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  FinishedWorkout,
  FinishedWorkoutProps,
} from '@/entities/finished-workout'

export function makeFinishedWorkout(
  override: Partial<FinishedWorkoutProps> = {},
  id?: UniqueEntityId,
) {
  const workout = FinishedWorkout.create(
    {
      userId: new UniqueEntityId(faker.string.uuid()),
      workoutId: new UniqueEntityId(faker.string.uuid()),
      obtainedCurrency: faker.number.int(),
      obtainedExperience: faker.number.int(),
      ...override,
    },
    id,
  )

  return workout
}
