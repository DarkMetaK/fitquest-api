import { BundlesSubscriptionRepository } from '@/adapters/repositories/bundles-subscription-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { BundleSubscription } from '@/entities/bundle-subscription'

export class InMemoryBundlesSubscriptionRepository
  implements BundlesSubscriptionRepository
{
  public items: BundleSubscription[] = []

  async findAllByCustomerId(customerId: string): Promise<BundleSubscription[]> {
    const bundles = this.items.filter((item) =>
      item.customerId.equals(new UniqueEntityId(customerId)),
    )

    return bundles
  }

  async create(bundle: BundleSubscription): Promise<void> {
    this.items.push(bundle)
  }
}
