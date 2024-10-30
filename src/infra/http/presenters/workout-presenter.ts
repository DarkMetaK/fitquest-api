import { Workout } from '@/entities/workout'

export class WorkoutPresenter {
  static toHTTP(workout: Workout) {
    return {
      id: workout.id.toString(),
      name: workout.name,
      availableExperience: workout.availableExperience,
      availableCurrency: workout.availableCurrency,
      bannerUrl: workout.bannerUrl,
      type: workout.type,
      stepsAmount: workout.steps.length,
      expiresAt: workout.expiresAt,
    }
  }
}
