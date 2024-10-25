import { hash } from 'bcryptjs'
import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'

import { InvalidCredentialsError } from '../core/errors/invalid-credentials-error'
import { LoginMethodError } from '../core/errors/login-method-error'
import { AuthenticateWithPasswordUseCase } from './authenticate-with-password'

let sut: AuthenticateWithPasswordUseCase
let customersRepository: InMemoryCustomersRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository

describe('Use Case: Authenticate', () => {
  beforeEach(async () => {
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
    )
    sut = new AuthenticateWithPasswordUseCase(customersRepository)
  })

  it('should be able to authenticate', async () => {
    customersRepository.create(
      makeCustomer({
        email: 'johndoe@example.com',
        passwordHash: await hash('12345678', 8),
      }),
    )

    const { customer } = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(customer.id.toValue()).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    customersRepository.create(
      makeCustomer({
        email: 'johndoe@example.com',
        passwordHash: await hash('12345678', 8),
      }),
    )

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'incorrect_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it(`should not be able to authenticate if account don't have password`, async () => {
    customersRepository.create(
      makeCustomer({
        email: 'johndoe@example.com',
        passwordHash: null,
      }),
    )

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(LoginMethodError)
  })
})
