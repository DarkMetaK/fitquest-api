import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerAlreadyHasMetadataError } from '@/core/errors/customer-already-has-metadata-error'

import { CreateCustomerMetadataUseCase } from './create-customer-metadata'

let sut: CreateCustomerMetadataUseCase
let streaksRepository: InMemoryStreaksRepository
let customersRepository: InMemoryCustomersRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository

describe('Use Case: Create Customer Metadata', () => {
  beforeEach(async () => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
      streaksRepository,
    )

    sut = new CreateCustomerMetadataUseCase(
      customersRepository,
      customersMetadataRepository,
    )
  })

  it('should be able to register customer metadata', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-id')),
    )

    const { customerMetadata } = await sut.execute({
      customerId: 'customer-id',
      phone: '12345678',
      age: 25,
      weight: 80,
      height: 180,
      goal: 'LOSE_WEIGHT',
      weeklyStreakGoal: 3,
    })

    expect(customerMetadata.id.toString).toBeTruthy()
    expect(customersMetadataRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('customer-id'),
        phone: '12345678',
      }),
    )
  })

  it('should not be able to register customer metadata twice', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-id')),
    )

    await sut.execute({
      customerId: 'customer-id',
      phone: '12345678',
      age: 25,
      weight: 80,
      height: 180,
      goal: 'LOSE_WEIGHT',
      weeklyStreakGoal: 3,
    })

    await expect(() =>
      sut.execute({
        customerId: 'customer-id',
        phone: '12345678',
        age: 25,
        weight: 80,
        height: 180,
        goal: 'LOSE_WEIGHT',
        weeklyStreakGoal: 3,
      }),
    ).rejects.toBeInstanceOf(CustomerAlreadyHasMetadataError)
  })
})
