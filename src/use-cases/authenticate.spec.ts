import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateUseCase } from './authenticate'
import { BadRequestError } from './errors/bad-request-error'

let sut: AuthenticateUseCase
let usersRepository: InMemoryUsersRepository

describe('Use Case: Authenticate', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 6),
      birthDate: new Date(10, 10, 2000),
      height: 180,
      weight: 80,
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '12345678',
      birthDate: new Date(10, 10, 2000),
      height: 180,
      weight: 80,
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'incorrect_password',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })

  it(`should not be able to authenticate if account don't have password`, async () => {
    usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: new Date(10, 10, 2000),
      height: 180,
      weight: 80,
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '12345678',
      }),
    ).rejects.toThrow('User does not have a password, use social login.')
  })
})
