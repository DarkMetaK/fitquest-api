import { GetCustomerActiveBundleUseCase } from '@/use-cases/get-customer-active-bundle'

import { PrismaBundlesRepository } from '../../repositories/prisma-bundles-repository'
import { PrismaBundlesSubscriptionRepository } from '../../repositories/prisma-bundles-subscription-repository'
import { PrismaCustomersRepository } from '../../repositories/prisma-customers-repository'
import { PrismaFinishedWorkoutsRepository } from '../../repositories/prisma-finished-workouts-repository'

export class makeGetCustomerActiveBundleUseCase {
  static create(): GetCustomerActiveBundleUseCase {
    const customersRepository = new PrismaCustomersRepository()
    const finishedWorkoutsRepository = new PrismaFinishedWorkoutsRepository()
    const bundleSubscriptionRepository =
      new PrismaBundlesSubscriptionRepository()
    const bundlesRepository = new PrismaBundlesRepository()

    const subscription = new GetCustomerActiveBundleUseCase(
      customersRepository,
      finishedWorkoutsRepository,
      bundleSubscriptionRepository,
      bundlesRepository,
    )

    return subscription
  }
}
