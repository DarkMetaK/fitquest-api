import { BundlesRepository } from '@/adapters/repositories/bundles-repository'
import { BundlesSubscriptionRepository } from '@/adapters/repositories/bundles-subscription-repository'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { Bundle } from '@/entities/bundle'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'

interface GetCustomerActiveBundleUseCaseRequest {
  customerId: string
}

interface GetCustomerActiveBundleUseCaseResponse {
  activeBundle: Bundle | null
}

export class GetCustomerActiveBundleUseCase {
  constructor(
    private customersRepository: CustomersRepository,
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

    return { activeBundle: bundle }
  }
}
