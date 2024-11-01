import { BundlesRepository } from '@/adapters/repositories/bundles-repository'
import { BundlesSubscriptionRepository } from '@/adapters/repositories/bundles-subscription-repository'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { ActiveSubscriptionError } from '@/core/errors/active-subscription-error'
import { BundleSubscription } from '@/entities/bundle-subscription'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'

interface SubscribeBundleUseCaseRequest {
  customerId: string
  bundleId: string
}

export class SubscribeBundleUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private bundlesRepository: BundlesRepository,
    private bundlesSubscriptionRepository: BundlesSubscriptionRepository,
  ) {}

  async execute({
    customerId,
    bundleId,
  }: SubscribeBundleUseCaseRequest): Promise<void> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new ResourceNotFoundError(customerId)
    }

    const bundle = await this.bundlesRepository.findById(bundleId)

    if (!bundle) {
      throw new ResourceNotFoundError(bundleId)
    }

    const customerSubscriptions =
      await this.bundlesSubscriptionRepository.findAllByCustomerId(customerId)

    const hasActiveSubscription = customerSubscriptions.some(
      (subscription) =>
        subscription.isActive && subscription.finishedAt === null,
    )

    if (hasActiveSubscription) {
      throw new ActiveSubscriptionError()
    }

    const subscription = BundleSubscription.create({
      customerId: customer.id,
      bundleId: bundle.id,
      isActive: true,
    })

    await this.bundlesSubscriptionRepository.create(subscription)
  }
}
