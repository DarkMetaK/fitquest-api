import { InMemoryFinishedWorkoutsRepository } from '@/repositories/in-memory/in-memory-finished-workouts-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWorkoutsRepository } from '@/repositories/in-memory/in-memory-workouts-repository'

import { CompleteWorkoutUseCase } from './complete-workout'
import { UnavailableWorkoutError } from './errors/unavailable-workout-error'

let sut: CompleteWorkoutUseCase
let usersRepository: InMemoryUsersRepository
let workoutsRepository: InMemoryWorkoutsRepository
let finishedWorkoutsRepository: InMemoryFinishedWorkoutsRepository

describe('Use Case: Complete Workout', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    workoutsRepository = new InMemoryWorkoutsRepository()
    finishedWorkoutsRepository = new InMemoryFinishedWorkoutsRepository()
    sut = new CompleteWorkoutUseCase(
      usersRepository,
      workoutsRepository,
      finishedWorkoutsRepository,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to mark a workout as completed', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '12345678',
      phone: '12345678',
      age: 24,
      height: 180,
      weight: 80,
      goal: 'ENHANCE_HEALTH',
    })

    const workout = await workoutsRepository.create({
      id: 'workout-1',
      name: 'Workout 1',
      bannerUrl: '',
      availableCurrency: 1000,
      availableExperience: 1000,
      type: 'STANDARD',
    })

    await sut.execute({
      userId: user.id,
      workoutId: workout.id,
    })

    expect(finishedWorkoutsRepository.items[0]).toEqual(
      expect.objectContaining({
        userId: user.id,
        workoutId: workout.id,
      }),
    )
  })

  it('should correctly update user balance after completing a workout', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '12345678',
      phone: '12345678',
      age: 24,
      height: 180,
      weight: 80,
      currencyAmount: 0,
      experienceAmount: 0,
      goal: 'ENHANCE_HEALTH',
    })

    const workout = await workoutsRepository.create({
      id: 'workout-1',
      name: 'Workout 1',
      bannerUrl: '',
      availableCurrency: 1000,
      availableExperience: 1000,
      type: 'STANDARD',
    })

    await sut.execute({
      userId: user.id,
      workoutId: workout.id,
    })

    expect(usersRepository.items[0]).toEqual(
      expect.objectContaining({
        currencyAmount: 1000,
        experienceAmount: 1000,
      }),
    )
  })

  it('should not reward user for subsequent completions of a level workout', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '12345678',
      phone: '12345678',
      age: 24,
      height: 180,
      weight: 80,
      currencyAmount: 0,
      experienceAmount: 0,
      goal: 'ENHANCE_HEALTH',
    })

    const workout = await workoutsRepository.create({
      id: 'workout-1',
      name: 'Workout 1',
      bannerUrl: '',
      availableCurrency: 1000,
      availableExperience: 1000,
      type: 'STANDARD',
    })

    await sut.execute({
      userId: user.id,
      workoutId: workout.id,
    })

    await sut.execute({
      userId: user.id,
      workoutId: workout.id,
    })

    expect(usersRepository.items[0]).toEqual(
      expect.objectContaining({
        currencyAmount: 1000,
        experienceAmount: 1000,
      }),
    )
  })

  it('should not be able to mark a workout as completed if the challenge workout is unavailable', async () => {
    vi.setSystemTime(new Date(2024, 9, 20, 0, 0, 0))

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '12345678',
      phone: '12345678',
      age: 24,
      height: 180,
      weight: 80,
      goal: 'ENHANCE_HEALTH',
      currencyAmount: 0,
      experienceAmount: 0,
    })

    const workout = await workoutsRepository.create({
      id: 'workout-1',
      name: 'Workout 1',
      bannerUrl: '',
      availableCurrency: 1000,
      availableExperience: 1000,
      type: 'CHALLENGE',
      expiresAt: new Date(2024, 9, 19, 0, 0, 0),
    })

    await expect(() =>
      sut.execute({
        userId: user.id,
        workoutId: workout.id,
      }),
    ).rejects.toBeInstanceOf(UnavailableWorkoutError)
  })

  it('should reward user only once for a challenge workout after it is updated', async () => {
    vi.setSystemTime(new Date(2024, 9, 21, 12, 0, 0))

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '12345678',
      phone: '12345678',
      age: 24,
      height: 180,
      weight: 80,
      goal: 'ENHANCE_HEALTH',
      currencyAmount: 1000,
      experienceAmount: 1000,
    })

    const workout = await workoutsRepository.create({
      id: 'workout-1',
      name: 'Workout 1',
      bannerUrl: '',
      availableCurrency: 1000,
      availableExperience: 1000,
      type: 'CHALLENGE',
      expiresAt: new Date(2024, 9, 22, 0, 0, 0),
      updatedAt: new Date(2024, 9, 21, 0, 0, 0),
    })

    finishedWorkoutsRepository.items.push({
      id: '',
      userId: user.id,
      workoutId: workout.id,
      obtainedExperience: 1000,
      obtainedCurrency: 1000,
      finishedAt: new Date(2024, 9, 19, 12, 0, 0),
    })

    // First try after new expire date -> Should reward
    await sut.execute({
      userId: user.id,
      workoutId: workout.id,
    })

    // Second try after new expire date -> Should not reward
    await sut.execute({
      userId: user.id,
      workoutId: workout.id,
    })

    expect(usersRepository.items[0]).toEqual(
      expect.objectContaining({
        currencyAmount: 2000,
        experienceAmount: 2000,
      }),
    )
  })
})
