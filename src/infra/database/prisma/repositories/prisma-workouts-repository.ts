import { WorkoutsRepository } from '@/adapters/repositories/workouts-repository'
import { WorkoutDetails } from '@/entities/value-objects/workout-details'
import { Workout } from '@/entities/workout'
import { prisma } from '@/infra/libs/prisma'

import { PrismaWorkoutMapper } from '../mappers/prisma-workout-mapper'
import { PrismaWorkoutWithDetailsMapper } from '../mappers/prisma-workout-with-details-mapper'

export class PrismaWorkoutsRepository implements WorkoutsRepository {
  async findById(id: string): Promise<Workout | null> {
    const workout = await prisma.workout.findUnique({
      where: {
        id,
      },
      include: {
        steps: true,
      },
    })

    if (!workout) {
      return null
    }

    return PrismaWorkoutMapper.toDomain(workout)
  }

  async findByIdWithDetails(id: string): Promise<WorkoutDetails | null> {
    const workout = await prisma.workout.findUnique({
      where: { id },
      include: {
        steps: {
          include: {
            exercise: true,
          },
        },
      },
    })

    if (!workout) {
      return null
    }

    return PrismaWorkoutWithDetailsMapper.toDomain(workout)
  }

  async findActiveChallenges(): Promise<Workout[]> {
    const challenges = await prisma.workout.findMany({
      where: {
        type: 'CHALLENGE',
        expiresAt: {
          gte: new Date(),
        },
      },
      include: {
        steps: true,
      },
    })

    return challenges.map(PrismaWorkoutMapper.toDomain)
  }

  async create(workout: Workout): Promise<void> {
    const data = PrismaWorkoutMapper.toPrisma(workout)

    await prisma.workout.create({
      data,
    })
  }
}
