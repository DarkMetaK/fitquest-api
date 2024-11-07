import { makeCustomer } from 'test/factories/make-customer'
import { makeCustomerMetadata } from 'test/factories/make-customer-metadata'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { SubscribePremiumUseCase } from './subscribe-premium'

let sut: SubscribePremiumUseCase
let streaksRepository: InMemoryStreaksRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let customersRepository: InMemoryCustomersRepository

describe('Use Case: Subscribe Premium', () => {
  beforeEach(async () => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
      streaksRepository,
    )

    sut = new SubscribePremiumUseCase(customersRepository)
  })

  it('should be able to subscribe to premium membership', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-1')),
    )

    customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-1'),
        premiumExpiresAt: null,
      }),
    )

    await sut.execute({ customerId: 'customer-1', months: 12 })

    expect(customersMetadataRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('customer-1'),
        premiumExpiresAt: expect.any(Date),
      }),
    )
  })

  it('should be able to stack premium membership on renewal', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-1')),
    )

    customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-1'),
        premiumExpiresAt: new Date(2025, 5, 1, 0, 0, 0),
      }),
    )

    await sut.execute({ customerId: 'customer-1', months: 12 })

    expect(customersMetadataRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('customer-1'),
        premiumExpiresAt: new Date(2026, 5, 1, 0, 0, 0),
      }),
    )
  })
})
