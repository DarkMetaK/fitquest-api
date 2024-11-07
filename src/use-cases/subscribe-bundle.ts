import dayjs from 'dayjs'

import { BundlesRepository } from '@/adapters/repositories/bundles-repository'
import { BundlesSubscriptionRepository } from '@/adapters/repositories/bundles-subscription-repository'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ActiveSubscriptionError } from '@/core/errors/active-subscription-error'
import { PremiumRequiredError } from '@/core/errors/premium-required-error'
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
    const customer =
      await this.customersRepository.findByIdWithMetadata(customerId)

    if (!customer) {
      throw new ResourceNotFoundError(customerId)
    }

    const bundle = await this.bundlesRepository.findById(bundleId)

    if (!bundle) {
      throw new ResourceNotFoundError(bundleId)
    }

    if (
      bundle.isPremium &&
      (!customer.premiumExpiresAt ||
        dayjs(customer.premiumExpiresAt).isBefore(dayjs()))
    ) {
      throw new PremiumRequiredError()
    }

    const hasActiveSubscription =
      await this.bundlesSubscriptionRepository.findByActiveAndCustomerId(
        customerId,
      )

    if (hasActiveSubscription) {
      throw new ActiveSubscriptionError()
    }

    const subscription = BundleSubscription.create({
      customerId: new UniqueEntityId(customer.customerId),
      bundleId: bundle.id,
      isActive: true,
    })

    await this.bundlesSubscriptionRepository.create(subscription)
  }
}
