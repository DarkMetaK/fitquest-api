import { makeBundle } from 'test/factories/make-bundle'
import { makeBundleSubscription } from 'test/factories/make-bundle-subscription'
import { makeCustomer } from 'test/factories/make-customer'
import { makeFinishedWorkout } from 'test/factories/make-finished-workout'
import { makeWorkout } from 'test/factories/make-workout'
import { InMemoryBundlesRepository } from 'test/in-memory/in-memory-bundles-repository'
import { InMemoryBundlesSubscriptionRepository } from 'test/in-memory/in-memory-bundles-subscription-repository'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryExercisesRepository } from 'test/in-memory/in-memory-exercises-repository'
import { InMemoryFinishedWorkoutsRepository } from 'test/in-memory/in-memory-finished-workouts-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'
import { InMemoryWorkoutsRepository } from 'test/in-memory/in-memory-workouts-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { GetCustomerActiveBundleUseCase } from './get-customer-active-bundle'

let sut: GetCustomerActiveBundleUseCase
let streaksRepository: InMemoryStreaksRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let customersRepository: InMemoryCustomersRepository
let bundlesSubscriptionRepository: InMemoryBundlesSubscriptionRepository
let bundlesRepository: InMemoryBundlesRepository
let finishedWorkoutsRepository: InMemoryFinishedWorkoutsRepository
let exercisesRepository: InMemoryExercisesRepository
let workoutsRepository: InMemoryWorkoutsRepository

describe('Use Case: Get Customer Active Bundle', () => {
  beforeEach(async () => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
      streaksRepository,
    )
    bundlesSubscriptionRepository = new InMemoryBundlesSubscriptionRepository()
    bundlesRepository = new InMemoryBundlesRepository()
    finishedWorkoutsRepository = new InMemoryFinishedWorkoutsRepository(
      bundlesRepository,
    )

    exercisesRepository = new InMemoryExercisesRepository()
    workoutsRepository = new InMemoryWorkoutsRepository(exercisesRepository)

    sut = new GetCustomerActiveBundleUseCase(
      customersRepository,
      finishedWorkoutsRepository,
      bundlesSubscriptionRepository,
      bundlesRepository,
    )
  })

  it('should be able to get customer current bundle with finished workouts information', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-1')),
    )

    bundlesSubscriptionRepository.create(
      makeBundleSubscription({
        bundleId: new UniqueEntityId('bundle-1'),
        customerId: new UniqueEntityId('customer-1'),
        isActive: true,
        finishedAt: null,
      }),
    )

    const firstWorkout = makeWorkout(
      {
        type: 'STANDARD',
        bundleId: new UniqueEntityId('bundle-1'),
      },
      new UniqueEntityId('workout-1'),
    )

    const secondWorkout = makeWorkout(
      {
        type: 'STANDARD',
        bundleId: new UniqueEntityId('bundle-1'),
      },
      new UniqueEntityId('workout-2'),
    )

    workoutsRepository.create(firstWorkout)

    workoutsRepository.create(secondWorkout)

    bundlesRepository.create(
      makeBundle(
        {
          name: 'Bundle 1',
          workouts: [firstWorkout, secondWorkout],
        },
        new UniqueEntityId('bundle-1'),
      ),
    )

    finishedWorkoutsRepository.create(
      makeFinishedWorkout({
        userId: new UniqueEntityId('customer-1'),
        workoutId: new UniqueEntityId('workout-1'),
      }),
    )

    const { activeBundle } = await sut.execute({ customerId: 'customer-1' })

    expect(activeBundle).toEqual(
      expect.objectContaining({
        name: 'Bundle 1',
        finishedWorkouts: expect.arrayContaining([
          expect.objectContaining({
            workoutId: new UniqueEntityId('workout-1'),
          }),
        ]),
      }),
    )
  })
})
