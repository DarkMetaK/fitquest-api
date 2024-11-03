import { WorkoutDetails } from '@/entities/value-objects/workout-details'

export class WorkoutDetailsPresenter {
  static toHTTP(workout: WorkoutDetails) {
    const steps = workout.steps.map((step) => {
      return {
        ...step,
        exerciseId: step.exerciseId.toString(),
        createdAt: undefined,
      }
    })

    return {
      name: workout.name,
      availableExperience: workout.availableExperience,
      availableCurrency: workout.availableCurrency,
      bannerUrl: workout.bannerUrl,
      type: workout.type,
      steps,
      estimatedTime: steps.reduce((acc, step) => acc + (step.duration ?? 0), 0),
      estimatedCalories: workout.estimatedCalories,
      expiresAt: workout.expiresAt,
    }
  }
}
