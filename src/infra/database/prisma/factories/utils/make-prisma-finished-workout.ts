import { makeFinishedWorkout } from 'test/factories/make-finished-workout'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FinishedWorkoutProps } from '@/entities/finished-workout'
import { PrismaFinishedWorkoutMapper } from '@/infra/database/prisma/mappers/prisma-finished-workout-mapper'
import { prisma } from '@/infra/libs/prisma'

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
