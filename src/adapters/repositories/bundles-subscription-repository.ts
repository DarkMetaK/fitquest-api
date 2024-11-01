import { BundleSubscription } from '@/entities/bundle-subscription'

export interface BundlesSubscriptionRepository {
  findAllByCustomerId(customerId: string): Promise<BundleSubscription[]>

  create(bundle: BundleSubscription): Promise<void>
}
