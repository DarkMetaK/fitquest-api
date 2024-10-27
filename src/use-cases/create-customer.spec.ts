import { FakeHasher } from 'test/gateways/cryptography/fake-hasher'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'

import { EmailAlreadyTakenError } from '@/core/errors/email-already-taken-error'

import { CreateCustomerUseCase } from './create-customer'

let sut: CreateCustomerUseCase
let customersRepository: InMemoryCustomersRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let fakeHasher: FakeHasher

describe('Use Case: Create Customer', () => {
  beforeEach(async () => {
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
    )

    fakeHasher = new FakeHasher()

    sut = new CreateCustomerUseCase(customersRepository, fakeHasher)
  })

  it('should be able to create a new customer', async () => {
    const { customer } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(customer).toBeTruthy()
    expect(customersRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
  })

  it('should hash customer password upon registration', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const hashedPassword = await fakeHasher.hash('12345678')

    expect(customersRepository.items[0].passwordHash).toEqual(hashedPassword)
  })

  it('should not be able to register with the same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name: 'Jane Doe',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyTakenError)
  })
})
