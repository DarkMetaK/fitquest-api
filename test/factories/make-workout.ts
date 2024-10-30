import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Workout, WorkoutProps } from '@/entities/workout'
import { PrismaWorkoutMapper } from '@/infra/database/prisma/mappers/prisma-workout-mapper'
import { prisma } from '@/infra/libs/prisma'

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

export async function makePrismaWorkout(
  data: Partial<WorkoutProps> = {},
  id?: UniqueEntityId,
) {
  const workout = makeWorkout(data, id)

  const prismaWorkout = await prisma.workout.create({
    data: PrismaWorkoutMapper.toPrisma(workout),
  })

  return prismaWorkout
}
