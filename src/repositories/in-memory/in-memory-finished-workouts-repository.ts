import { FinishedWorkout } from '@prisma/client'
import { randomUUID } from 'crypto'

import {
  CreateFinishedWorkoutParams,
  FinishedWorkoutsRepository,
} from '../finished-workouts-repository'

export class InMemoryFinishedWorkoutsRepository
  implements FinishedWorkoutsRepository
{
  public items: FinishedWorkout[] = []

  async findByUserIdAndWorkoutId(
    userId: string,
    workoutId: string,
  ): Promise<FinishedWorkout[]> {
    const finishedWorkouts = this.items.filter(
      (item) => item.userId === userId && item.workoutId === workoutId,
    )

    return finishedWorkouts
  }

  async create({
    userId,
    workoutId,
    obtainedCurrency,
    obtainedExperience,
  }: CreateFinishedWorkoutParams): Promise<FinishedWorkout> {
    const finishedWorkout: FinishedWorkout = {
      id: randomUUID(),
      userId,
      workoutId,
      obtainedCurrency,
      obtainedExperience,
      finishedAt: new Date(),
    }

    this.items.push(finishedWorkout)

    return finishedWorkout
  }
}
