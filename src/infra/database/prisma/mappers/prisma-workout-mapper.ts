import {
  Prisma,
  Workout as PrismaWorkout,
  WorkoutStep,
  WorkoutType,
} from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Workout } from '@/entities/workout'

import { PrismaWorkoutStepsMapper } from './prisma-workout-steps.mapper'

type PrismaWorkoutWithSteps = PrismaWorkout & {
  steps: WorkoutStep[]
}

export class PrismaWorkoutMapper {
  static toDomain(raw: PrismaWorkoutWithSteps): Workout {
    const workout = Workout.create(
      {
        name: raw.name,
        bannerUrl: raw.bannerUrl,
        availableCurrency: raw.availableCurrency,
        availableExperience: raw.availableExperience,
        type: raw.type,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        expiresAt: raw.expiresAt,
        steps: raw.steps.map(PrismaWorkoutStepsMapper.toDomain),
      },
      new UniqueEntityId(raw.id),
    )

    return workout
  }

  static toPrisma(workout: Workout): Prisma.WorkoutUncheckedCreateInput {
    return {
      id: workout.id.toString(),
      name: workout.name,
      bannerUrl: workout.bannerUrl,
      availableCurrency: workout.availableCurrency,
      availableExperience: workout.availableExperience,
      type: WorkoutType[workout.type as keyof typeof WorkoutType],
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
      expiresAt: workout.expiresAt,
      steps: {
        create: workout.steps.map(PrismaWorkoutStepsMapper.toPrisma),
      },
    }
  }
}
