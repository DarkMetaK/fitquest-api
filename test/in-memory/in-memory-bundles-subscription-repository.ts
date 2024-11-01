import { BundlesSubscriptionRepository } from '@/adapters/repositories/bundles-subscription-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { BundleSubscription } from '@/entities/bundle-subscription'

export class InMemoryBundlesSubscriptionRepository
  implements BundlesSubscriptionRepository
{
  public items: BundleSubscription[] = []

  async findByActiveAndCustomerId(
    customerId: string,
  ): Promise<BundleSubscription | null> {
    const subscription = this.items.find(
      (item) =>
        item.isActive && item.customerId.equals(new UniqueEntityId(customerId)),
    )

    if (!subscription) {
      return null
    }

    return subscription
  }

  async create(bundle: BundleSubscription): Promise<void> {
    this.items.push(bundle)
  }
}
