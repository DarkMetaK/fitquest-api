import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  BundleSubscription,
  BundleSubscriptionProps,
} from '@/entities/bundle-subscription'

export function makeBundleSubscription(
  override: Partial<BundleSubscriptionProps> = {},
  id?: UniqueEntityId,
) {
  const subscription = BundleSubscription.create(
    {
      bundleId: new UniqueEntityId(faker.string.uuid()),
      customerId: new UniqueEntityId(faker.string.uuid()),
      isActive: true,
      ...override,
    },
    id,
  )

  return subscription
}
