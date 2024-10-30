import { GetWorkoutUseCase } from '@/use-cases/get-workout'

import { PrismaWorkoutsRepository } from '../repositories/prisma-workouts-repository'

export class makeGetWorkoutUseCase {
  static create(): GetWorkoutUseCase {
    const workoutsRepository = new PrismaWorkoutsRepository()

    const getWorkoutUseCase = new GetWorkoutUseCase(workoutsRepository)

    return getWorkoutUseCase
  }
}
