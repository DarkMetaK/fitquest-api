import { Prisma, WorkoutStep as PrismaStep } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { WorkoutStep } from '@/entities/workout-step'

export class PrismaWorkoutStepsMapper {
  static toDomain(raw: PrismaStep): WorkoutStep {
    const step = WorkoutStep.create(
      {
        workoutId: new UniqueEntityId(raw.workoutId),
        exerciseId: new UniqueEntityId(raw.exerciseId),
        order: raw.order,
      },
      new UniqueEntityId(raw.id),
    )

    return step
  }

  static toPrisma(step: WorkoutStep): Prisma.WorkoutStepUncheckedCreateInput {
    return {
      id: step.id.toString(),
      workoutId: step.workoutId.toString(),
      exerciseId: step.exerciseId.toString(),
      order: step.order,
    }
  }
}
