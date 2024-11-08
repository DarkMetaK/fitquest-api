import { Exercise, Workout, WorkoutStep } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { WorkoutDetails } from '@/entities/value-objects/workout-details'

type PrismaStepWithExercise = WorkoutStep & {
  exercise: Exercise
}

type PrismaWorkoutWithSteps = Workout & {
  steps: PrismaStepWithExercise[]
}

export class PrismaWorkoutWithDetailsMapper {
  static toDomain(raw: PrismaWorkoutWithSteps): WorkoutDetails {
    const workout = WorkoutDetails.create({
      workoutId: new UniqueEntityId(raw.id),
      bundleId: raw.bundleId ? new UniqueEntityId(raw.bundleId) : null,
      name: raw.name,
      bannerUrl: raw.bannerUrl,
      type: raw.type,
      availableCurrency: raw.availableCurrency,
      availableExperience: raw.availableExperience,
      steps: raw.steps.map((step) => {
        return {
          order: step.order,
          exerciseId: new UniqueEntityId(step.exerciseId),
          name: step.exercise.name,
          targetedRegions: step.exercise.targetedRegions,
          estimatedCalories: step.exercise.estimatedCalories,
          demonstrationUrl: step.exercise.demonstrationUrl,
          instructions: step.exercise.instructions,
          previewUrl: step.exercise.previewUrl,
          videoUrl: step.exercise.videoUrl,
          audioUrl: step.exercise.audioUrl,
          repetitions: step.exercise.repetitions,
          duration: step.exercise.duration,
          createdAt: step.exercise.createdAt,
        }
      }),
      expiresAt: raw.expiresAt,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
    })

    return workout
  }
}
