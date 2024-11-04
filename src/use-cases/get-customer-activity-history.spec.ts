import { makeCustomer } from 'test/factories/make-customer'
import { makeCustomerActivity } from 'test/factories/make-customer-activity'
import { InMemoryCustomerActivitiesRepository } from 'test/in-memory/in-memory-customer-activities-repository'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { GetCustomerActivityHistoryUseCase } from './get-customer-activity-history'

let sut: GetCustomerActivityHistoryUseCase
let streaksRepository: InMemoryStreaksRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let customersRepository: InMemoryCustomersRepository
let customerActivitiesRepository: InMemoryCustomerActivitiesRepository

describe('Use Case: Get Customer Activity History', () => {
  beforeEach(async () => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
      streaksRepository,
    )
    customerActivitiesRepository = new InMemoryCustomerActivitiesRepository()

    sut = new GetCustomerActivityHistoryUseCase(
      customersRepository,
      customerActivitiesRepository,
    )
  })

  it('should be able to get customer activity history from last 30 days', async () => {
    const customerId = new UniqueEntityId('customer-1')

    customersRepository.create(makeCustomer({}, customerId))

    for (let i = 0; i < 30; i++) {
      customerActivitiesRepository.create(
        makeCustomerActivity({
          customerId,
          activityType: i % 2 === 0 ? 'STREAK' : 'REST',
          date: new Date(new Date().setDate(new Date().getDate() - i)),
        }),
      )
    }

    const { activities } = await sut.execute({ customerId: 'customer-1' })

    expect(activities).toHaveLength(30)
  })

  it('it should be able to get customer activity history within the specified period', async () => {
    const customerId = new UniqueEntityId('customer-1')

    customersRepository.create(makeCustomer({}, customerId))

    for (let i = 0; i < 30; i++) {
      customerActivitiesRepository.create(
        makeCustomerActivity({
          customerId,
          activityType: i % 2 === 0 ? 'STREAK' : 'REST',
          date: new Date(new Date().setDate(new Date().getDate() - i)),
        }),
      )
    }

    const { activities } = await sut.execute({
      customerId: 'customer-1',
      from: new Date(new Date().setDate(new Date().getDate() - 7)),
      until: new Date(),
    })

    expect(activities).toHaveLength(7)
  })
})
