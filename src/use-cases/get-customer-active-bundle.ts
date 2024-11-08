import { BundlesRepository } from '@/adapters/repositories/bundles-repository'
import { BundlesSubscriptionRepository } from '@/adapters/repositories/bundles-subscription-repository'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { FinishedWorkoutsRepository } from '@/adapters/repositories/finished-workouts-repository'
import { CustomerBundle } from '@/entities/value-objects/customer-bundle'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'

interface GetCustomerActiveBundleUseCaseRequest {
  customerId: string
}

interface GetCustomerActiveBundleUseCaseResponse {
  activeBundle: CustomerBundle | null
}

export class GetCustomerActiveBundleUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private finishedWorkoutsRepository: FinishedWorkoutsRepository,
    private bundlesSubscriptionRepository: BundlesSubscriptionRepository,
    private bundlesRepository: BundlesRepository,
  ) {}

  async execute({
    customerId,
  }: GetCustomerActiveBundleUseCaseRequest): Promise<GetCustomerActiveBundleUseCaseResponse> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new ResourceNotFoundError(customerId)
    }

    const bundleSubscription =
      await this.bundlesSubscriptionRepository.findByActiveAndCustomerId(
        customerId,
      )

    if (!bundleSubscription) {
      return { activeBundle: null }
    }

    const bundle = await this.bundlesRepository.findById(
      bundleSubscription.bundleId.toString(),
    )

    if (!bundle) {
      throw new ResourceNotFoundError(bundleSubscription.bundleId.toString())
    }

    const finishedWorkouts =
      await this.finishedWorkoutsRepository.findByUserIdAndBundleId(
        customerId,
        bundle.id.toString(),
      )

    const activeBundle = CustomerBundle.create({
      bundleId: bundle.id,
      customerId: customer.id,
      name: bundle.name,
      description: bundle.description,
      bannerUrl: bundle.bannerUrl,
      workouts: bundle.workouts,
      isPremium: bundle.isPremium,
      finishedWorkouts,
      createdAt: bundleSubscription.createdAt,
    })

    return {
      activeBundle,
    }
  }
}
