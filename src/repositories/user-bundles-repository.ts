import { UserBundle } from '@prisma/client'

export interface UserBundlesRepository {
  findByUserIdAndBundleId(
    userId: string,
    bundleId: string,
  ): Promise<UserBundle | null>
}
