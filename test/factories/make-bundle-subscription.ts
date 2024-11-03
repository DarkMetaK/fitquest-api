import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  BundleSubscription,
  BundleSubscriptionProps,
} from '@/entities/bundle-subscription'
import { PrismaBundleSubscriptionMapper } from '@/infra/database/prisma/mappers/prisma-bundle-subscription-mapper'
import { prisma } from '@/infra/libs/prisma'

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

export async function makePrismaBundleSubscription(
  data: Partial<BundleSubscriptionProps> = {},
  id?: UniqueEntityId,
) {
  const subscription = makeBundleSubscription(data, id)

  const prismaBundleSubscription = await prisma.bundleSubscription.create({
    data: PrismaBundleSubscriptionMapper.toPrisma(subscription),
  })

  return prismaBundleSubscription
}
