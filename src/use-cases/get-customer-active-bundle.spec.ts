import { makeBundle } from 'test/factories/make-bundle'
import { makeBundleSubscription } from 'test/factories/make-bundle-subscription'
import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryBundlesRepository } from 'test/in-memory/in-memory-bundles-repository'
import { InMemoryBundlesSubscriptionRepository } from 'test/in-memory/in-memory-bundles-subscription-repository'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { GetCustomerActiveBundleUseCase } from './get-customer-active-bundle'

let sut: GetCustomerActiveBundleUseCase
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let customersRepository: InMemoryCustomersRepository
let bundlesSubscriptionRepository: InMemoryBundlesSubscriptionRepository
let bundlesRepository: InMemoryBundlesRepository

describe('Use Case: Get Customer Active Bundle', () => {
  beforeEach(async () => {
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
    )
    bundlesSubscriptionRepository = new InMemoryBundlesSubscriptionRepository()
    bundlesRepository = new InMemoryBundlesRepository()

    sut = new GetCustomerActiveBundleUseCase(
      customersRepository,
      bundlesSubscriptionRepository,
      bundlesRepository,
    )
  })

  it('should be able to get customer current bundle', async () => {
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

    const { activeBundle } = await sut.execute({ customerId: 'customer-1' })

    expect(activeBundle).toEqual(
      expect.objectContaining({
        name: 'Bundle 1',
      }),
    )
  })
})
