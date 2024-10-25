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
      availableCurrency: faker.number.int(),
      availableExperience: faker.number.int(),
      bannerUrl: faker.image.url(),
      type: faker.helpers.arrayElement(['CHALLENGE', 'STANDARD']),
      ...override,
    },
    id,
  )

  return workout
}
