import { compare } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateAccountUseCase } from './create-account'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let sut: CreateAccountUseCase
let usersRepository: InMemoryUsersRepository

describe('Use Case: Create Account', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateAccountUseCase(usersRepository)
  })

  it('should be able to create a new account', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
      phone: '12345678',
      age: 20,
      height: 180,
      weight: 80,
      goal: 'ENHANCE_HEALTH',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
      phone: '12345678',
      age: 20,
      height: 180,
      weight: 80,
      goal: 'ENHANCE_HEALTH',
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      user.passwordHash!,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '12345678',
      phone: '12345678',
      age: 20,
      height: 180,
      weight: 80,
      goal: 'ENHANCE_HEALTH',
    })

    await expect(() =>
      sut.execute({
        name: 'Jane Doe',
        email,
        password: '12345678',
        phone: '87654321',
        age: 20,
        height: 180,
        weight: 80,
        goal: 'ENHANCE_HEALTH',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
