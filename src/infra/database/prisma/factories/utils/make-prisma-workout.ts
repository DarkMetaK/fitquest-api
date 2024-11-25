import { makeWorkout } from 'test/factories/make-workout'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { WorkoutProps } from '@/entities/workout'
import { PrismaWorkoutMapper } from '@/infra/database/prisma/mappers/prisma-workout-mapper'
import { prisma } from '@/infra/libs/prisma'

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
