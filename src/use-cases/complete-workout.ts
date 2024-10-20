import { FinishedWorkout } from '@prisma/client'
import dayjs from 'dayjs'

import { FinishedWorkoutsRepository } from '@/repositories/finished-workouts-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { WorkoutsRepository } from '@/repositories/workouts-repository'

import { BadRequestError } from './errors/bad-request-error'
import { NotFoundError } from './errors/not-found-error'

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
  ) {}

  async execute({
    userId,
    workoutId,
  }: CompleteWorkoutUseCaseRequest): Promise<CompleteWorkoutUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundError(`User with id '${userId}' not found.`)
    }

    const workout = await this.workoutsRepository.findById(workoutId)

    if (!workout) {
      throw new NotFoundError(`Workout with id '${workoutId}' not found.`)
    }

    const previouslyFinishedWorkouts =
      await this.finishedWorkoutsRepository.findByUserIdAndWorkoutId(
        userId,
        workoutId,
      )

    const isFirstConclusion = previouslyFinishedWorkouts.length === 0
    const mostRecentConclusion =
      previouslyFinishedWorkouts[previouslyFinishedWorkouts.length - 1]

    switch (workout.type) {
      case 'CHALLENGE':
        if (!workout.expiresAt || dayjs().isAfter(workout.expiresAt)) {
          throw new BadRequestError('This challenge is currently unavailable.')
        }

        if (
          isFirstConclusion ||
          dayjs(mostRecentConclusion?.finishedAt).isBefore(workout.updatedAt)
        ) {
          user.currencyAmount += workout.availableCurrency
          user.experienceAmount += workout.availableExperience
        }
        break
      case 'LEVEL':
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
