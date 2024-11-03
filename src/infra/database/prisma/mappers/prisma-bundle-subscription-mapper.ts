import {
  BundleSubscription as PrismaBundleSubscription,
  Prisma,
} from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { BundleSubscription } from '@/entities/bundle-subscription'

export class PrismaBundleSubscriptionMapper {
  static toDomain(raw: PrismaBundleSubscription): BundleSubscription {
    const subscription = BundleSubscription.create(
      {
        bundleId: new UniqueEntityId(raw.bundleId),
        customerId: new UniqueEntityId(raw.userId),
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        finishedAt: raw.finishedAt,
      },
      new UniqueEntityId(raw.id),
    )

    return subscription
  }

  static toPrisma(
    subscription: BundleSubscription,
  ): Prisma.BundleSubscriptionUncheckedCreateInput {
    return {
      id: subscription.id.toString(),
      bundleId: subscription.bundleId.toString(),
      userId: subscription.customerId.toString(),
      isActive: subscription.isActive,
      finishedAt: subscription.finishedAt,
      createdAt: subscription.createdAt,
    }
  }
}
