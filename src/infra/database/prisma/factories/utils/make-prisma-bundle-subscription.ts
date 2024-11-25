import { makeBundleSubscription } from 'test/factories/make-bundle-subscription'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { BundleSubscriptionProps } from '@/entities/bundle-subscription'
import { PrismaBundleSubscriptionMapper } from '@/infra/database/prisma/mappers/prisma-bundle-subscription-mapper'
import { prisma } from '@/infra/libs/prisma'

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
