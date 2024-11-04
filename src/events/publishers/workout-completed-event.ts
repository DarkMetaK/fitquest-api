import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvents } from '@/core/events/domain-events'
import { FinishedWorkout } from '@/entities/finished-workout'

export class WorkoutCompletedEvent implements DomainEvents {
  public ocurredAt: Date
  public finishedWorkout: FinishedWorkout

  constructor(finishedWorkout: FinishedWorkout) {
    this.finishedWorkout = finishedWorkout
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.finishedWorkout.id
  }
}
