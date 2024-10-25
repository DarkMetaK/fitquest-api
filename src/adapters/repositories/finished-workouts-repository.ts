import { FinishedWorkout } from '@/entities/finished-workout'

export interface FinishedWorkoutsRepository {
  findByUserIdAndWorkoutId(
    userId: string,
    workoutId: string,
  ): Promise<FinishedWorkout[]>

  create(finishedWorkout: FinishedWorkout): Promise<void>
}
