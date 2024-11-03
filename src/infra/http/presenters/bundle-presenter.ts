import { Bundle } from '@/entities/bundle'

export class BundlePresenter {
  static toHTTP(bundle: Bundle) {
    return {
      id: bundle.id.toString(),
      name: bundle.name,
      description: bundle.description,
      bannerUrl: bundle.description,
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
    }
  }
}
