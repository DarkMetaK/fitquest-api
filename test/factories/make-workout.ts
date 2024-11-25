import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Workout, WorkoutProps } from '@/entities/workout'

export function makeWorkout(
  override: Partial<WorkoutProps> = {},
  id?: UniqueEntityId,
) {
  const workout = Workout.create(
    {
      name: faker.person.fullName(),
      availableCurrency: faker.number.int({ min: 1, max: 1000 }),
      availableExperience: faker.number.int({ min: 1, max: 1000 }),
      bannerUrl: faker.image.url(),
      type: faker.helpers.arrayElement(['CHALLENGE', 'STANDARD']),
      ...override,
    },
    id,
  )

  return workout
}
