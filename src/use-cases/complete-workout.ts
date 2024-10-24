import { FinishedWorkout, User, Workout } from '@prisma/client'
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

interface HandleChallengeProps {
  user: User
  workout: Workout
  previouslyFinishedWorkouts: FinishedWorkout[]
  isFirstConclusion: boolean
}

interface HandleStandardProps {
  user: User
  workout: Workout
  userId: string
  isFirstConclusion: boolean
}

interface HandleAssignRewardsProps {
  user: User
  workout: Workout
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
    if (!user) throw new ResourceNotFoundError(userId)

    const workout = await this.workoutsRepository.findById(workoutId)
    if (!workout) throw new ResourceNotFoundError(workoutId)

    const previouslyFinishedWorkouts =
      await this.finishedWorkoutsRepository.findByUserIdAndWorkoutId(
        userId,
        workoutId,
      )
    const isFirstConclusion = previouslyFinishedWorkouts.length === 0

    switch (workout.type) {
      case 'CHALLENGE':
        await this.handleChallengeType({
          user,
          workout,
          previouslyFinishedWorkouts,
          isFirstConclusion,
        })
        break
      case 'STANDARD':
        await this.handleStandardType({
          user,
          workout,
          userId,
          isFirstConclusion,
        })
        break
      default:
        throw new Error('Unknown workout type')
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

  private async handleChallengeType({
    user,
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
      this.assignRewards({ user, workout })
    }
  }

  private async handleStandardType({
    user,
    workout,
    userId,
    isFirstConclusion,
  }: HandleStandardProps) {
    const bundleSubscription =
      await this.userBundlesRepository.findByUserIdAndBundleId(
        userId,
        workout.bundleId!,
      )

    if (!bundleSubscription || !bundleSubscription.isActive) {
      throw new UnavailableWorkoutError(
        'The user is not subscribed to the bundle',
      )
    }

    if (isFirstConclusion) {
      this.assignRewards({ user, workout })
    }
  }

  private assignRewards({ user, workout }: HandleAssignRewardsProps) {
    user.currencyAmount += workout.availableCurrency
    user.experienceAmount += workout.availableExperience
  }
}
