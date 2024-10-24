import { InMemoryBundlesRepository } from '@/repositories/in-memory/in-memory-bundles-repository'
import { InMemoryUserBundlesRepository } from '@/repositories/in-memory/in-memory-user-bundles-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { PremiumActionError } from './errors/premium-action-error'
import { SubscribeBundleUseCase } from './subscribe-bundle'

let sut: SubscribeBundleUseCase
let usersRepository: InMemoryUsersRepository
let bundlesRepository: InMemoryBundlesRepository
let userBundlesRepository: InMemoryUserBundlesRepository

describe('Use Case: Subscribe Bundle', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    bundlesRepository = new InMemoryBundlesRepository()
    userBundlesRepository = new InMemoryUserBundlesRepository()
    sut = new SubscribeBundleUseCase(
      usersRepository,
      bundlesRepository,
      userBundlesRepository,
    )
  })

  it('should be able to subscribe a bundle', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '12345678',
      phone: '12345678',
      age: 24,
      height: 180,
      weight: 80,
      goal: 'ENHANCE_HEALTH',
    })

    const bundle = await bundlesRepository.create({
      name: 'Bundle 1',
      description: 'Description',
      bannerUrl: '',
      isPremium: false,
    })

    await sut.execute({
      userId: user.id,
      bundleId: bundle.id,
    })

    expect(userBundlesRepository.items[0]).toEqual(
      expect.objectContaining({
        userId: user.id,
        bundleId: bundle.id,
      }),
    )
  })

  it('should not be able to subscribe premium bundle if user dont has a premium subscription', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '12345678',
      phone: '12345678',
      age: 24,
      height: 180,
      weight: 80,
      goal: 'ENHANCE_HEALTH',
    })

    const bundle = await bundlesRepository.create({
      name: 'Bundle 1',
      description: 'Description',
      bannerUrl: '',
      isPremium: true,
    })

    await expect(() =>
      sut.execute({
        userId: user.id,
        bundleId: bundle.id,
      }),
    ).rejects.toBeInstanceOf(PremiumActionError)
  })
})
