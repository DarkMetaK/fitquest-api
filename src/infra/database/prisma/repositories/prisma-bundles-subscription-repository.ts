import { BundlesSubscriptionRepository } from '@/adapters/repositories/bundles-subscription-repository'
import { BundleSubscription } from '@/entities/bundle-subscription'
import { prisma } from '@/infra/libs/prisma'

import { PrismaBundleSubscriptionMapper } from '../mappers/prisma-bundle-subscription-mapper'

export class PrismaBundlesSubscriptionRepository
  implements BundlesSubscriptionRepository
{
  async findByActiveAndCustomerId(
    customerId: string,
  ): Promise<BundleSubscription | null> {
    const subscription = await prisma.bundleSubscription.findFirst({
      where: {
        userId: customerId,
        isActive: true,
      },
    })

    if (!subscription) {
      return null
    }

    return PrismaBundleSubscriptionMapper.toDomain(subscription)
  }

  async create(bundle: BundleSubscription): Promise<void> {
    const data = PrismaBundleSubscriptionMapper.toPrisma(bundle)

    await prisma.bundleSubscription.create({
      data,
    })
  }
}
