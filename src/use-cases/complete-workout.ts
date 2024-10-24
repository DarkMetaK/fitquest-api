import { FinishedWorkout } from '@prisma/client'
import dayjs from 'dayjs'

import { FinishedWorkoutsRepository } from '@/repositories/finished-workouts-repository'
import { UserBundlesRepository } from '@/repositories/user-bundles-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { WorkoutsRepository } from '@/repositories/workouts-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnavailableWorkoutError } from './errors/unavailable-workout-error'

interface CompleteWorkoutUseCaseRequest {
  userId: string
  workoutId: string
}

interface CompleteWorkoutUseCaseResponse {
  finishedWorkout: FinishedWorkout
}

export class CompleteWorkoutUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private workoutsRepository: WorkoutsRepository,
    private finishedWorkoutsRepository: FinishedWorkoutsRepository,
    private userBundlesRepository: UserBundlesRepository,
  ) {}

  async execute({
    userId,
    workoutId,
  }: CompleteWorkoutUseCaseRequest): Promise<CompleteWorkoutUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError(userId)
    }

    const workout = await this.workoutsRepository.findById(workoutId)

    if (!workout) {
      throw new ResourceNotFoundError(workoutId)
    }

    const previouslyFinishedWorkouts =
      await this.finishedWorkoutsRepository.findByUserIdAndWorkoutId(
        userId,
        workoutId,
      )

    const isFirstConclusion = previouslyFinishedWorkouts.length === 0

    switch (workout.type) {
      case 'CHALLENGE':
        const mostRecentConclusion =
          previouslyFinishedWorkouts[previouslyFinishedWorkouts.length - 1]

        if (!workout.expiresAt || dayjs().isAfter(workout.expiresAt)) {
          throw new UnavailableWorkoutError()
        }

        if (
          isFirstConclusion ||
          dayjs(mostRecentConclusion?.finishedAt).isBefore(workout.updatedAt)
        ) {
          user.currencyAmount += workout.availableCurrency
          user.experienceAmount += workout.availableExperience
        }
        break
      case 'STANDARD':
        const bundleSubscription =
          await this.userBundlesRepository.findByUserIdAndBundleId(
            userId,
            workout.bundleId!,
          )

        if (!bundleSubscription) {
          throw new UnavailableWorkoutError(
            'The user is not subscribed to the bundle',
          )
        }

        if (isFirstConclusion) {
          user.currencyAmount += workout.availableCurrency
          user.experienceAmount += workout.availableExperience
        }
        break
      default:
        break
    }

    const finishedWorkout = await this.finishedWorkoutsRepository.create({
      userId,
      workoutId,
      obtainedCurrency: workout.availableCurrency,
      obtainedExperience: workout.availableExperience,
    })

    await this.usersRepository.update(user)

    return { finishedWorkout }
  }
}
