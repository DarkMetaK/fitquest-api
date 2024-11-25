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
      obtainedCurrency: faker.number.int({ min: 1, max: 1000 }),
      obtainedExperience: faker.number.int({ min: 1, max: 1000 }),
      ...override,
    },
    id,
  )

  return workout
}
