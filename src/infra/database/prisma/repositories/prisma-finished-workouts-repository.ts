import { FinishedWorkoutsRepository } from '@/adapters/repositories/finished-workouts-repository'
import { FinishedWorkout } from '@/entities/finished-workout'
import { prisma } from '@/infra/libs/prisma'

import { PrismaFinishedWorkoutMapper } from '../mappers/prisma-finished-workout-mapper'

export class PrismaFinishedWorkoutsRepository
  implements FinishedWorkoutsRepository
{
  async findByUserIdAndWorkoutId(
    userId: string,
    workoutId: string,
  ): Promise<FinishedWorkout[]> {
    const finishedWorkouts = await prisma.finishedWorkout.findMany({
      where: {
        userId,
        workoutId,
      },
    })

    return finishedWorkouts.map(PrismaFinishedWorkoutMapper.toDomain)
  }

  async create(finishedWorkout: FinishedWorkout): Promise<void> {
    const data = PrismaFinishedWorkoutMapper.toPrisma(finishedWorkout)

    await prisma.finishedWorkout.create({
      data,
    })
  }
}
