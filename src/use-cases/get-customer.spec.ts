import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'
import { GetCustomerUseCase } from './get-customer'

let sut: GetCustomerUseCase
let streaksRepository: InMemoryStreaksRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let customersRepository: InMemoryCustomersRepository

describe('Use Case: Get Customer', () => {
  beforeEach(async () => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
      streaksRepository,
    )
    sut = new GetCustomerUseCase(customersRepository)
  })

  it('should be able to get customer by id', async () => {
    customersRepository.create(
      makeCustomer(
        {
          name: 'Customer 1',
        },
        new UniqueEntityId('customer-1'),
      ),
    )

    const { customer } = await sut.execute({ customerId: 'customer-1' })

    expect(customer).toEqual(
      expect.objectContaining({
        name: 'Customer 1',
      }),
    )
  })

  it('should not be able to get customer with invalid id', async () => {
    await expect(() =>
      sut.execute({ customerId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
