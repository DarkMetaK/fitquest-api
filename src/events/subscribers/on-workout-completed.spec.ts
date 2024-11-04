import { makeBundle } from 'test/factories/make-bundle'
import { makeBundleSubscription } from 'test/factories/make-bundle-subscription'
import { makeCustomer } from 'test/factories/make-customer'
import { makeCustomerMetadata } from 'test/factories/make-customer-metadata'
import { makeFinishedWorkout } from 'test/factories/make-finished-workout'
import { makeWorkout } from 'test/factories/make-workout'
import { InMemoryCustomerActivitiesRepository } from 'test/in-memory/in-memory-customer-activities-repository'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryFinishedWorkoutsRepository } from 'test/in-memory/in-memory-finished-workouts-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'
import { waitFor } from 'test/utils/waitFor'
import { MockInstance } from 'vitest'

import {
  ProvideActivityUseCase,
  ProvideActivityUseCaseRequest,
} from '@/use-cases/provide-activity'

import { OnWorkoutCompleted } from './on-workout-completed'

let customersMetadataRepository: InMemoryCustomersMetadataRepository
let streaksRepository: InMemoryStreaksRepository
let customerActivitiesRepository: InMemoryCustomerActivitiesRepository
let finishedWorkoutsRepository: InMemoryFinishedWorkoutsRepository

let provideActivityUseCase: ProvideActivityUseCase

let completeWorkouEventExecuteSpy: MockInstance<
  (request: ProvideActivityUseCaseRequest) => Promise<void>
>

describe('Event: On Workout Completed', () => {
  beforeEach(() => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customerActivitiesRepository = new InMemoryCustomerActivitiesRepository()
    finishedWorkoutsRepository = new InMemoryFinishedWorkoutsRepository()

    provideActivityUseCase = new ProvideActivityUseCase(
      customersMetadataRepository,
      customerActivitiesRepository,
      streaksRepository,
    )

    completeWorkouEventExecuteSpy = vi.spyOn(provideActivityUseCase, 'execute')

    // eslint-disable-next-line no-new
    new OnWorkoutCompleted(provideActivityUseCase)
  })

  it('should register customer streak activity when a workout is completed', async () => {
    const customer = makeCustomer()
    const bundle = makeBundle()
    const workout = makeWorkout({ bundleId: bundle.id })

    await customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: customer.id,
      }),
    )

    makeBundleSubscription({ customerId: customer.id, bundleId: bundle.id })

    const finishedWorkout = makeFinishedWorkout({
      userId: customer.id,
      workoutId: workout.id,
    })

    await finishedWorkoutsRepository.create(finishedWorkout)

    await waitFor(() => {
      expect(completeWorkouEventExecuteSpy).toHaveBeenCalled()
    })
  })
})
