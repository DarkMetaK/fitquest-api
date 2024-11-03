import {
  FinishedWorkout as PrismaFinishedWorkout,
  Prisma,
} from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FinishedWorkout } from '@/entities/finished-workout'

export class PrismaFinishedWorkoutMapper {
  static toDomain(raw: PrismaFinishedWorkout): FinishedWorkout {
    const finishedWorkout = FinishedWorkout.create(
      {
        userId: new UniqueEntityId(raw.userId),
        workoutId: new UniqueEntityId(raw.workoutId),
        finishedAt: raw.finishedAt,
        obtainedCurrency: raw.obtainedCurrency,
        obtainedExperience: raw.obtainedExperience,
      },
      new UniqueEntityId(raw.id),
    )

    return finishedWorkout
  }

  static toPrisma(
    finishedWorkout: FinishedWorkout,
  ): Prisma.FinishedWorkoutUncheckedCreateInput {
    return {
      id: finishedWorkout.id.toString(),
      userId: finishedWorkout.userId.toString(),
      workoutId: finishedWorkout.workoutId.toString(),
      finishedAt: finishedWorkout.finishedAt,
      obtainedCurrency: finishedWorkout.obtainedCurrency,
      obtainedExperience: finishedWorkout.obtainedExperience,
    }
  }
}
