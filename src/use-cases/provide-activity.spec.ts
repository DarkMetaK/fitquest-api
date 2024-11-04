import { makeCustomerMetadata } from 'test/factories/make-customer-metadata'
import { InMemoryCustomerActivitiesRepository } from 'test/in-memory/in-memory-customer-activities-repository'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ProvideActivityUseCase } from './provide-activity'

let sut: ProvideActivityUseCase
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let customerActivitiesRepository: InMemoryCustomerActivitiesRepository
let streaksRepository: InMemoryStreaksRepository

describe('Use Case: Provide Activity', () => {
  beforeEach(async () => {
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customerActivitiesRepository = new InMemoryCustomerActivitiesRepository()
    streaksRepository = new InMemoryStreaksRepository()

    sut = new ProvideActivityUseCase(
      customersMetadataRepository,
      customerActivitiesRepository,
      streaksRepository,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should create a streak activity if the user has no activity today', async () => {
    vi.setSystemTime(new Date(2024, 10, 3, 0, 0, 0))

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-id'),
        weeklyStreakGoal: 3,
      }),
    )

    await sut.execute({ customerId: 'customer-id', activityType: 'STREAK' })

    expect(streaksRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('customer-id'),
        currentStreak: 1,
        maximumStreak: 1,
      }),
    )

    expect(customerActivitiesRepository.items).toHaveLength(1)
  })

  it('should create a rest activity if the user has no activity today and has remaining rest days', async () => {
    vi.setSystemTime(new Date(2024, 10, 3, 0, 0, 0))

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-id'),
        weeklyStreakGoal: 3,
      }),
    )

    await sut.execute({ customerId: 'customer-id', activityType: 'INACTIVE' })

    expect(streaksRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('customer-id'),
        currentStreak: 0,
        maximumStreak: 0,
      }),
    )

    expect(customerActivitiesRepository.items).toHaveLength(1)
  })

  it('should reset the streak if the user has no activity today and has no remaining rest days', async () => {
    vi.setSystemTime(new Date(2024, 10, 3, 0, 0, 0))

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-id'),
        weeklyStreakGoal: 7,
      }),
    )

    await sut.execute({ customerId: 'customer-id', activityType: 'STREAK' })

    vi.setSystemTime(new Date(2024, 10, 4, 0, 0, 0))

    await sut.execute({ customerId: 'customer-id', activityType: 'STREAK' })

    vi.setSystemTime(new Date(2024, 10, 5, 0, 0, 0))

    await sut.execute({ customerId: 'customer-id', activityType: 'INACTIVE' })

    expect(streaksRepository.items[streaksRepository.items.length - 1]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('customer-id'),
        currentStreak: 0,
        maximumStreak: 2,
      }),
    )
  })

  it('should reset the rest days if the current week is different from the streak week start date', async () => {
    vi.setSystemTime(new Date(2024, 10, 8, 0, 0, 0))

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-id'),
        weeklyStreakGoal: 3,
      }),
    )

    await sut.execute({ customerId: 'customer-id', activityType: 'INACTIVE' })

    vi.setSystemTime(new Date(2024, 10, 9, 0, 0, 0))

    await sut.execute({ customerId: 'customer-id', activityType: 'INACTIVE' })

    expect(streaksRepository.items[streaksRepository.items.length - 1]).toEqual(
      expect.objectContaining({
        remainingRestDays: 2,
      }),
    )

    vi.setSystemTime(new Date(2024, 10, 10, 0, 0, 0))

    await sut.execute({ customerId: 'customer-id', activityType: 'STREAK' })

    expect(streaksRepository.items[streaksRepository.items.length - 1]).toEqual(
      expect.objectContaining({
        remainingRestDays: 4,
      }),
    )
  })
})
