import dayjs from 'dayjs'

import { BundlesSubscriptionRepository } from '@/adapters/repositories/bundles-subscription-repository'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { FinishedWorkoutsRepository } from '@/adapters/repositories/finished-workouts-repository'
import { WorkoutsRepository } from '@/adapters/repositories/workouts-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerNotSubscribedToBundleError } from '@/core/errors/customer-not-subscribed-to-bundle-error'
import { FinishedWorkout } from '@/entities/finished-workout'
import { CustomerDetails } from '@/entities/value-objects/customer-details'
import { WorkoutDetails } from '@/entities/value-objects/workout-details'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'
import { UnavailableWorkoutError } from '../core/errors/unavailable-workout-error'

interface CompleteWorkoutUseCaseRequest {
  customerId: string
  workoutId: string
}

interface CompleteWorkoutUseCaseResponse {
  finishedWorkout: FinishedWorkout
}

interface HandleChallengeProps {
  customer: CustomerDetails
  workout: WorkoutDetails
  previouslyFinishedWorkouts: FinishedWorkout[]
  isFirstConclusion: boolean
}

interface HandleStandardProps {
  customer: CustomerDetails
  workout: WorkoutDetails
  customerId: string
  isFirstConclusion: boolean
}

interface HandleAssignRewardsProps {
  customer: CustomerDetails
  workout: WorkoutDetails
}

export class CompleteWorkoutUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private workoutsRepository: WorkoutsRepository,
    private finishedWorkoutsRepository: FinishedWorkoutsRepository,
    private bundlesSubscriptionRepository: BundlesSubscriptionRepository,
  ) {}

  async execute({
    customerId,
    workoutId,
  }: CompleteWorkoutUseCaseRequest): Promise<CompleteWorkoutUseCaseResponse> {
    const customer =
      await this.customersRepository.findByIdWithMetadata(customerId)

    if (!customer) {
      throw new ResourceNotFoundError(customerId)
    }

    const workout = await this.workoutsRepository.findByIdWithDetails(workoutId)

    if (!workout) {
      throw new ResourceNotFoundError(workoutId)
    }

    const previouslyFinishedWorkouts =
      await this.finishedWorkoutsRepository.findByUserIdAndWorkoutId(
        customerId,
        workoutId,
      )

    const isFirstConclusion = previouslyFinishedWorkouts.length === 0

    switch (workout.type) {
      case 'CHALLENGE':
        await this.handleChallengeType({
          customer,
          workout,
          previouslyFinishedWorkouts,
          isFirstConclusion,
        })
        break

      case 'STANDARD':
        await this.handleStandardType({
          customer,
          workout,
          customerId,
          isFirstConclusion,
        })
        break

      default:
        throw new Error('Unknown workout type')
    }

    const finishedWorkout = FinishedWorkout.create({
      userId: new UniqueEntityId(customerId),
      workoutId: workout.workoutId,
      obtainedCurrency: workout.availableCurrency,
      obtainedExperience: workout.availableExperience,
    })

    await this.finishedWorkoutsRepository.create(finishedWorkout)

    customer.totalExercises += workout.steps.length
    customer.totalWorkouts += 1
    customer.totalCalories += workout.estimatedCalories

    await this.customersRepository.update(customer)

    return { finishedWorkout }
  }

  private async handleChallengeType({
    customer,
    workout,
    previouslyFinishedWorkouts,
    isFirstConclusion,
  }: HandleChallengeProps) {
    const mostRecentConclusion =
      previouslyFinishedWorkouts[previouslyFinishedWorkouts.length - 1]

    if (!workout.expiresAt || dayjs().isAfter(workout.expiresAt)) {
      throw new UnavailableWorkoutError()
    }

    if (
      isFirstConclusion ||
      dayjs(mostRecentConclusion?.finishedAt).isBefore(workout.updatedAt)
    ) {
      this.assignRewards({ customer, workout })
    }
  }

  private async handleStandardType({
    customer,
    workout,
    isFirstConclusion,
  }: HandleStandardProps) {
    const isSubscribed =
      await this.bundlesSubscriptionRepository.findByActiveAndCustomerId(
        customer.customerId.toString(),
      )

    if (!isSubscribed || !workout.bundleId?.equals(isSubscribed.bundleId)) {
      throw new CustomerNotSubscribedToBundleError()
    }

    if (isFirstConclusion) {
      this.assignRewards({ customer, workout })
    }
  }

  private async assignRewards({ customer, workout }: HandleAssignRewardsProps) {
    customer.currencyAmount += workout.availableCurrency
    customer.experienceAmount += workout.availableExperience
  }
}
