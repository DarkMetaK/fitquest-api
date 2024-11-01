import { BundleSubscription } from '@/entities/bundle-subscription'

export interface BundlesSubscriptionRepository {
  findByActiveAndCustomerId(
    customerId: string,
  ): Promise<BundleSubscription | null>

  create(bundle: BundleSubscription): Promise<void>
}
