import { UserBundle } from '@prisma/client'

import { UserBundlesRepository } from '../user-bundles-repository'

export class InMemoryUserBundlesRepository implements UserBundlesRepository {
  public items: UserBundle[] = []

  async findByUserIdAndBundleId(
    userId: string,
    bundleId: string,
  ): Promise<UserBundle | null> {
    const userBundle = this.items.find(
      (item) => item.userId === userId && item.bundleId === bundleId,
    )

    if (!userBundle) {
      return null
    }

    return userBundle
  }
}
