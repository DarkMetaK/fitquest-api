import { WorkoutDetails } from '@/entities/value-objects/workout-details'

// order: number
// exerciseId: UniqueEntityId
// name: string
// targetedRegions: string[]
// estimatedCalories: number
// demonstrationUrl: string
// instructions?: string | null
// previewUrl?: string | null
// videoUrl?: string | null
// audioUrl?: string | null
// repetitions?: number | null
// duration?: number | null
// createdAt: Date | null

export class WorkoutDetailsPresenter {
  static toHTTP(workout: WorkoutDetails) {
    return {
      name: workout.name,
      availableExperience: workout.availableExperience,
      availableCurrency: workout.availableCurrency,
      bannerUrl: workout.bannerUrl,
      type: workout.type,
      steps: workout.steps.map((step) => {
        return {
          ...step,
          exerciseId: step.exerciseId.toString(),
          createdAt: undefined,
        }
      }),
      expiresAt: workout.expiresAt,
    }
  }
}
