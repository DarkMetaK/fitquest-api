import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvents } from '@/core/events/domain-events'
import { FinishedWorkout } from '@/entities/finished-workout'

import { FinishedWorkoutsRepository } from '../../src/adapters/repositories/finished-workouts-repository'

export class InMemoryFinishedWorkoutsRepository
  implements FinishedWorkoutsRepository
{
  public items: FinishedWorkout[] = []

  async findByUserIdAndWorkoutId(
    userId: string,
    workoutId: string,
  ): Promise<FinishedWorkout[]> {
    const finishedWorkouts = this.items.filter(
      (item) =>
        item.userId.equals(new UniqueEntityId(userId)) &&
        item.workoutId.equals(new UniqueEntityId(workoutId)),
    )

    return finishedWorkouts
  }

  async create(finishedWorkout: FinishedWorkout): Promise<void> {
    this.items.push(finishedWorkout)

    DomainEvents.dispatchEventsForAggregate(finishedWorkout.id)
  }
}
