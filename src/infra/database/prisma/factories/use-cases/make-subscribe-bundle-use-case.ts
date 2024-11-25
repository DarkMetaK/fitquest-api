import { SubscribeBundleUseCase } from '@/use-cases/subscribe-bundle'

import { PrismaBundlesRepository } from '../../repositories/prisma-bundles-repository'
import { PrismaBundlesSubscriptionRepository } from '../../repositories/prisma-bundles-subscription-repository'
import { PrismaCustomersRepository } from '../../repositories/prisma-customers-repository'

export class makeSubscribeBundleUseCase {
  static create(): SubscribeBundleUseCase {
    const customersRepository = new PrismaCustomersRepository()
    const bundlesRepository = new PrismaBundlesRepository()

    const bundleSubscriptionRepository =
      new PrismaBundlesSubscriptionRepository()

    const subscribeBundleUseCase = new SubscribeBundleUseCase(
      customersRepository,
      bundlesRepository,
      bundleSubscriptionRepository,
    )

    return subscribeBundleUseCase
  }
}
