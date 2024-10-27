import { makeCustomer } from 'test/factories/make-customer'
import { makeCustomerMetadata } from 'test/factories/make-customer-metadata'
import { FakeHasher } from 'test/gateways/cryptography/fake-hasher'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { UpdateCustomerUseCase } from './update-customer'

let sut: UpdateCustomerUseCase
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let customersRepository: InMemoryCustomersRepository
let fakeHasher: FakeHasher

describe('Use Case: Update Customer', () => {
  beforeEach(async () => {
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
    )

    fakeHasher = new FakeHasher()

    sut = new UpdateCustomerUseCase(customersRepository, fakeHasher)
  })

  it('should be able to update customer', async () => {
    customersRepository.create(
      makeCustomer(
        {
          name: 'John Doe',
          passwordHash: null,
        },
        new UniqueEntityId('customer-id'),
      ),
    )

    customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-id'),
        age: 20,
        height: 180,
      }),
    )

    await sut.execute({
      customerId: 'customer-id',
      name: 'Jane Doe',
      password: 'new-password',
      age: 21,
      height: 160,
    })

    expect(customersRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Jane Doe',
        passwordHash: expect.any(String),
      }),
    )

    expect(customersMetadataRepository.items[0]).toEqual(
      expect.objectContaining({
        age: 21,
        height: 160,
      }),
    )
  })
})
