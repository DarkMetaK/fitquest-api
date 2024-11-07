import { makeCustomer } from 'test/factories/make-customer'
import { makeCustomerMetadata } from 'test/factories/make-customer-metadata'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'
import { GetCustomerWithDetailsUseCase } from './get-customer-with-details'

let sut: GetCustomerWithDetailsUseCase
let streaksRepository: InMemoryStreaksRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let customersRepository: InMemoryCustomersRepository

describe('Use Case: Get Customer With Details', () => {
  beforeEach(async () => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
      streaksRepository,
    )
    sut = new GetCustomerWithDetailsUseCase(customersRepository)
  })

  it('should be able to get customer with details by id', async () => {
    customersRepository.create(
      makeCustomer(
        {
          name: 'Customer 1',
        },
        new UniqueEntityId('customer-1'),
      ),
    )

    customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-1'),
        age: 20,
        phone: '123456789',
      }),
    )

    const { customer } = await sut.execute({ customerId: 'customer-1' })

    expect(customer).toEqual(
      expect.objectContaining({
        name: 'Customer 1',
        age: 20,
        phone: '123456789',
      }),
    )
  })

  it('should not be able to get customer with invalid id', async () => {
    await expect(() =>
      sut.execute({ customerId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
