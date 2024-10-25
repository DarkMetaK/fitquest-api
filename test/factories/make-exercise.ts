import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Exercise, ExerciseProps } from '@/entities/exercise'

export function makeExercise(
  override: Partial<ExerciseProps> = {},
  id?: UniqueEntityId,
) {
  const exercise = Exercise.create(
    {
      name: faker.person.fullName(),
      demonstrationUrl: faker.internet.url(),
      estimatedCalories: faker.number.int(),
      targetedRegions: [faker.lorem.word()],
      ...override,
    },
    id,
  )

  return exercise
}
