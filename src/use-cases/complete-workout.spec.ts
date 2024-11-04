import { makeBundleSubscription } from 'test/factories/make-bundle-subscription'
import { makeCustomer } from 'test/factories/make-customer'
import { makeCustomerMetadata } from 'test/factories/make-customer-metadata'
import { makeFinishedWorkout } from 'test/factories/make-finished-workout'
import { makeWorkout } from 'test/factories/make-workout'
import { InMemoryBundlesSubscriptionRepository } from 'test/in-memory/in-memory-bundles-subscription-repository'
import { InMemoryCustomerActivitiesRepository } from 'test/in-memory/in-memory-customer-activities-repository'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryExercisesRepository } from 'test/in-memory/in-memory-exercises-repository'
import { InMemoryFinishedWorkoutsRepository } from 'test/in-memory/in-memory-finished-workouts-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'
import { InMemoryWorkoutsRepository } from 'test/in-memory/in-memory-workouts-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerNotSubscribedToBundleError } from '@/core/errors/customer-not-subscribed-to-bundle-error'

import { UnavailableWorkoutError } from '../core/errors/unavailable-workout-error'
import { CompleteWorkoutUseCase } from './complete-workout'
import { ProvideActivityUseCase } from './provide-activity'

let sut: CompleteWorkoutUseCase
let streaksRepository: InMemoryStreaksRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let customersRepository: InMemoryCustomersRepository
let exercisesRepository: InMemoryExercisesRepository
let workoutsRepository: InMemoryWorkoutsRepository
let finishedWorkoutsRepository: InMemoryFinishedWorkoutsRepository
let bundlesSubscriptionRepository: InMemoryBundlesSubscriptionRepository

let customerActivitiesRepository: InMemoryCustomerActivitiesRepository
let provideActivityUseCase: ProvideActivityUseCase

describe('Use Case: Complete Workout', () => {
  beforeEach(async () => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
      streaksRepository,
    )
    exercisesRepository = new InMemoryExercisesRepository()
    workoutsRepository = new InMemoryWorkoutsRepository(exercisesRepository)
    finishedWorkoutsRepository = new InMemoryFinishedWorkoutsRepository()
    bundlesSubscriptionRepository = new InMemoryBundlesSubscriptionRepository()

    customerActivitiesRepository = new InMemoryCustomerActivitiesRepository()
    provideActivityUseCase = new ProvideActivityUseCase(
      customersMetadataRepository,
      customerActivitiesRepository,
      streaksRepository,
    )

    sut = new CompleteWorkoutUseCase(
      customersRepository,
      workoutsRepository,
      finishedWorkoutsRepository,
      bundlesSubscriptionRepository,
      provideActivityUseCase,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to mark a workout as completed', async () => {
    await customersRepository.create(
      makeCustomer({}, new UniqueEntityId('user-1')),
    )

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('user-1'),
      }),
    )

    await bundlesSubscriptionRepository.create(
      makeBundleSubscription({
        bundleId: new UniqueEntityId('bundle-1'),
        customerId: new UniqueEntityId('user-1'),
      }),
    )

    await workoutsRepository.create(
      makeWorkout(
        {
          type: 'STANDARD',
          bundleId: new UniqueEntityId('bundle-1'),
        },
        new UniqueEntityId('workout-1'),
      ),
    )

    await sut.execute({
      customerId: 'user-1',
      workoutId: 'workout-1',
    })

    expect(finishedWorkoutsRepository.items[0]).toEqual(
      expect.objectContaining({
        userId: new UniqueEntityId('user-1'),
        workoutId: new UniqueEntityId('workout-1'),
      }),
    )
  })

  it('should correctly update user balance after completing a workout', async () => {
    await customersRepository.create(
      makeCustomer({}, new UniqueEntityId('user-1')),
    )

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('user-1'),
        currencyAmount: 0,
        experienceAmount: 0,
      }),
    )

    await bundlesSubscriptionRepository.create(
      makeBundleSubscription({
        bundleId: new UniqueEntityId('bundle-1'),
        customerId: new UniqueEntityId('user-1'),
      }),
    )

    await workoutsRepository.create(
      makeWorkout(
        {
          type: 'STANDARD',
          availableCurrency: 1000,
          availableExperience: 1000,
          bundleId: new UniqueEntityId('bundle-1'),
        },
        new UniqueEntityId('workout-1'),
      ),
    )

    await sut.execute({
      customerId: 'user-1',
      workoutId: 'workout-1',
    })

    expect(customersMetadataRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('user-1'),
        currencyAmount: 1000,
        experienceAmount: 1000,
      }),
    )
  })

  it('should not allow user to complete a workout if they are not subscribed to the required bundle.', async () => {
    await customersRepository.create(
      makeCustomer({}, new UniqueEntityId('user-1')),
    )

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('user-1'),
        currencyAmount: 0,
        experienceAmount: 0,
      }),
    )

    await workoutsRepository.create(
      makeWorkout(
        {
          type: 'STANDARD',
          availableCurrency: 1000,
          availableExperience: 1000,
          bundleId: new UniqueEntityId('bundle-1'),
        },
        new UniqueEntityId('workout-1'),
      ),
    )

    await expect(() =>
      sut.execute({
        customerId: 'user-1',
        workoutId: 'workout-1',
      }),
    ).rejects.toBeInstanceOf(CustomerNotSubscribedToBundleError)
  })

  it('should not reward user for subsequent completions of a level workout', async () => {
    await customersRepository.create(
      makeCustomer({}, new UniqueEntityId('user-1')),
    )

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('user-1'),
        currencyAmount: 0,
        experienceAmount: 0,
      }),
    )

    await bundlesSubscriptionRepository.create(
      makeBundleSubscription({
        bundleId: new UniqueEntityId('bundle-1'),
        customerId: new UniqueEntityId('user-1'),
      }),
    )

    await workoutsRepository.create(
      makeWorkout(
        {
          type: 'STANDARD',
          availableCurrency: 1000,
          availableExperience: 1000,
          bundleId: new UniqueEntityId('bundle-1'),
        },
        new UniqueEntityId('workout-1'),
      ),
    )

    await sut.execute({
      customerId: 'user-1',
      workoutId: 'workout-1',
    })

    await sut.execute({
      customerId: 'user-1',
      workoutId: 'workout-1',
    })

    expect(customersMetadataRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('user-1'),
        currencyAmount: 1000,
        experienceAmount: 1000,
      }),
    )
  })

  it('should not be able to mark a workout as completed if the challenge workout is unavailable', async () => {
    vi.setSystemTime(new Date(2024, 9, 20, 0, 0, 0))

    await customersRepository.create(
      makeCustomer({}, new UniqueEntityId('user-1')),
    )

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('user-1'),
        currencyAmount: 0,
        experienceAmount: 0,
      }),
    )

    await workoutsRepository.create(
      makeWorkout(
        {
          type: 'CHALLENGE',
          availableCurrency: 1000,
          availableExperience: 1000,
          expiresAt: new Date(2024, 9, 19, 0, 0, 0),
        },
        new UniqueEntityId('workout-1'),
      ),
    )

    await expect(() =>
      sut.execute({
        customerId: 'user-1',
        workoutId: 'workout-1',
      }),
    ).rejects.toBeInstanceOf(UnavailableWorkoutError)
  })

  it('should reward user only once for a challenge workout after it is updated', async () => {
    vi.setSystemTime(new Date(2024, 9, 21, 12, 0, 0))

    await customersRepository.create(
      makeCustomer({}, new UniqueEntityId('user-1')),
    )

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('user-1'),
        currencyAmount: 1000,
        experienceAmount: 1000,
      }),
    )

    await workoutsRepository.create(
      makeWorkout(
        {
          type: 'CHALLENGE',
          availableCurrency: 1000,
          availableExperience: 1000,
          expiresAt: new Date(2024, 9, 22, 0, 0, 0),
          updatedAt: new Date(2024, 9, 21, 0, 0, 0),
        },
        new UniqueEntityId('workout-1'),
      ),
    )

    await finishedWorkoutsRepository.create(
      makeFinishedWorkout({
        userId: new UniqueEntityId('user-1'),
        workoutId: new UniqueEntityId('workout-1'),
        finishedAt: new Date(2024, 9, 19, 12, 0, 0),
      }),
    )

    // First try after new expire date -> Should reward
    await sut.execute({
      customerId: 'user-1',
      workoutId: 'workout-1',
    })

    // Second try after new expire date -> Should not reward
    await sut.execute({
      customerId: 'user-1',
      workoutId: 'workout-1',
    })

    expect(customersMetadataRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('user-1'),
        currencyAmount: 2000,
        experienceAmount: 2000,
      }),
    )
  })

  it('should increase user streak if they complete the first workout of the day', async () => {
    vi.setSystemTime(new Date(2024, 10, 3, 0, 0, 0))

    await customersRepository.create(
      makeCustomer({}, new UniqueEntityId('user-1')),
    )

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('user-1'),
        weeklyStreakGoal: 3,
      }),
    )

    await bundlesSubscriptionRepository.create(
      makeBundleSubscription({
        bundleId: new UniqueEntityId('bundle-1'),
        customerId: new UniqueEntityId('user-1'),
      }),
    )

    await workoutsRepository.create(
      makeWorkout(
        {
          type: 'STANDARD',
          bundleId: new UniqueEntityId('bundle-1'),
        },
        new UniqueEntityId('workout-1'),
      ),
    )

    await sut.execute({
      customerId: 'user-1',
      workoutId: 'workout-1',
    })

    console.log(streaksRepository.items)

    expect(streaksRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityId('user-1'),
        currentStreak: 1,
        maximumStreak: 1,
      }),
    )
  })
})
