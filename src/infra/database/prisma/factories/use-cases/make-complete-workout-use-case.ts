import { CompleteWorkoutUseCase } from '@/use-cases/complete-workout'

import { PrismaBundlesSubscriptionRepository } from '../../repositories/prisma-bundles-subscription-repository'
import { PrismaCustomersRepository } from '../../repositories/prisma-customers-repository'
import { PrismaFinishedWorkoutsRepository } from '../../repositories/prisma-finished-workouts-repository'
import { PrismaWorkoutsRepository } from '../../repositories/prisma-workouts-repository'

export class makeCompleteWorkoutUseCase {
  static create(): CompleteWorkoutUseCase {
    const customersRepository = new PrismaCustomersRepository()
    const workoutsRepository = new PrismaWorkoutsRepository()
    const finishedWorkoutsRepository = new PrismaFinishedWorkoutsRepository()
    const bundlesSubscriptionRepository =
      new PrismaBundlesSubscriptionRepository()

    const completeWorkoutUseCase = new CompleteWorkoutUseCase(
      customersRepository,
      workoutsRepository,
      finishedWorkoutsRepository,
      bundlesSubscriptionRepository,
    )

    return completeWorkoutUseCase
  }
}
