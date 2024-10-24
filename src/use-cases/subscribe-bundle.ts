import { UserBundle } from '@prisma/client'
import dayjs from 'dayjs'

import { BundlesRepository } from '@/repositories/bundles-repository'
import { UserBundlesRepository } from '@/repositories/user-bundles-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { PremiumActionError } from './errors/premium-action-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SubscribeBundleUseCaseRequest {
  userId: string
  bundleId: string
}

interface SubscribeBundleUseCaseResponse {
  subscription: UserBundle
}

export class SubscribeBundleUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private bundlesRepository: BundlesRepository,
    private userBundlesRepository: UserBundlesRepository,
  ) {}

  async execute({
    userId,
    bundleId,
  }: SubscribeBundleUseCaseRequest): Promise<SubscribeBundleUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError(userId)
    }

    const bundle = await this.bundlesRepository.findById(bundleId)

    if (!bundle) {
      throw new ResourceNotFoundError(bundleId)
    }

    const userPremiumship = user.premiumExpiresAt

    if (
      bundle.isPremium &&
      (!userPremiumship || dayjs(userPremiumship).isAfter(new Date()))
    ) {
      throw new PremiumActionError()
    }

    const subscription = await this.userBundlesRepository.create(
      userId,
      bundleId,
    )

    return { subscription }
  }
}
