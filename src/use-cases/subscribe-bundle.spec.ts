import { makeBundle } from 'test/factories/make-bundle'
import { makeBundleSubscription } from 'test/factories/make-bundle-subscription'
import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryBundlesRepository } from 'test/in-memory/in-memory-bundles-repository'
import { InMemoryBundlesSubscriptionRepository } from 'test/in-memory/in-memory-bundles-subscription-repository'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ActiveSubscriptionError } from '@/core/errors/active-subscription-error'

import { SubscribeBundleUseCase } from './subscribe-bundle'

let sut: SubscribeBundleUseCase
let streaksRepository: InMemoryStreaksRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let customersRepository: InMemoryCustomersRepository
let bundlesSubscriptionRepository: InMemoryBundlesSubscriptionRepository
let bundlesRepository: InMemoryBundlesRepository

describe('Use Case: Subscribe Bundle', () => {
  beforeEach(async () => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
      streaksRepository,
    )
    bundlesSubscriptionRepository = new InMemoryBundlesSubscriptionRepository()
    bundlesRepository = new InMemoryBundlesRepository()

    sut = new SubscribeBundleUseCase(
      customersRepository,
      bundlesRepository,
      bundlesSubscriptionRepository,
    )
  })

  it('should be able to subscribe a customer to a bundle', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-1')),
    )

    bundlesRepository.create(
      makeBundle(
        {
          name: 'Bundle 1',
        },
        new UniqueEntityId('bundle-1'),
      ),
    )

    await sut.execute({ customerId: 'customer-1', bundleId: 'bundle-1' })

    expect(bundlesSubscriptionRepository.items).toHaveLength(1)
    expect(bundlesSubscriptionRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('customer-1'),
        bundleId: new UniqueEntityId('bundle-1'),
        isActive: true,
      }),
    )
  })

  it('should not be able to subscribe a customer while they are already subscribed to an unfinished bundle', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-1')),
    )

    bundlesRepository.create(
      makeBundle(
        {
          name: 'Bundle 1',
        },
        new UniqueEntityId('bundle-1'),
      ),
    )

    bundlesSubscriptionRepository.create(
      makeBundleSubscription({
        bundleId: new UniqueEntityId('bundle-1'),
        customerId: new UniqueEntityId('customer-1'),
        isActive: true,
        finishedAt: null,
      }),
    )

    await expect(() =>
      sut.execute({ customerId: 'customer-1', bundleId: 'bundle-1' }),
    ).rejects.toBeInstanceOf(ActiveSubscriptionError)
  })
})
