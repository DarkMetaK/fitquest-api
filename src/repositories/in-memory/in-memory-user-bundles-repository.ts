import { randomUUID } from 'node:crypto'

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

  async create(userId: string, bundleId: string): Promise<UserBundle> {
    const userBundle: UserBundle = {
      id: randomUUID(),
      userId,
      bundleId,
      isActive: true,
      finishedAt: null,
      createdAt: new Date(),
    }

    this.items.push(userBundle)

    return userBundle
  }
}
