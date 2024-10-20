import { FinishedWorkout } from '@prisma/client'

export interface CreateFinishedWorkoutParams {
  userId: string
  workoutId: string
  obtainedCurrency: number
  obtainedExperience: number
}

export interface FinishedWorkoutsRepository {
  findByUserIdAndWorkoutId(
    userId: string,
    workoutId: string,
  ): Promise<FinishedWorkout[]>
  create(params: CreateFinishedWorkoutParams): Promise<FinishedWorkout>
}
