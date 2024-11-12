import { CustomerBundle } from '@/entities/value-objects/customer-bundle'

export class CustomerBundlePresenter {
  static toHTTP(bundle: CustomerBundle) {
    return {
      id: bundle.bundleId,
      name: bundle.name,
      description: bundle.description,
      bannerUrl: bundle.bannerUrl,
      isPremium: bundle.isPremium,
      workouts: bundle.workouts.map((workout) => {
        return {
          id: workout.id.toString(),
          name: workout.name,
          availableExperience: workout.availableExperience,
          availableCurrency: workout.availableCurrency,
          stepsAmount: workout.steps.length,
        }
      }),
      finishedWorkoutsIds: Array.from(
        new Set(
          bundle.finishedWorkouts.map((workout) =>
            workout.workoutId.toString(),
          ),
        ),
      ),
    }
  }
}
