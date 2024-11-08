import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  FinishedWorkout,
  FinishedWorkoutProps,
} from '@/entities/finished-workout'
import { PrismaFinishedWorkoutMapper } from '@/infra/database/prisma/mappers/prisma-finished-workout-mapper'
import { prisma } from '@/infra/libs/prisma'

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

export async function makePrismaFinishedWorkout(
  data: Partial<FinishedWorkoutProps> = {},
  id?: UniqueEntityId,
) {
  const workout = makeFinishedWorkout(data, id)

  const prismaWorkout = await prisma.finishedWorkout.create({
    data: PrismaFinishedWorkoutMapper.toPrisma(workout),
  })

  return prismaWorkout
}
