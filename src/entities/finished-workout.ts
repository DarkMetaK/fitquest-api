import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { WorkoutCompletedEvent } from '@/events/publishers/workout-completed-event'

export interface FinishedWorkoutProps {
  userId: UniqueEntityId
  workoutId: UniqueEntityId
  obtainedExperience: number
  obtainedCurrency: number
  finishedAt: Date
}

export class FinishedWorkout extends AggregateRoot<FinishedWorkoutProps> {
  static create(
    props: Optional<FinishedWorkoutProps, 'finishedAt'>,
    id?: UniqueEntityId,
  ) {
    const finishedWorkout = new FinishedWorkout(
      {
        ...props,
        finishedAt: props.finishedAt ?? new Date(),
      },
      id,
    )

    const isNewRegister = !id

    if (isNewRegister) {
      finishedWorkout.addDomainEvent(new WorkoutCompletedEvent(finishedWorkout))
    }

    return finishedWorkout
  }

  get userId() {
    return this.props.userId
  }

  get workoutId() {
    return this.props.workoutId
  }

  get obtainedExperience() {
    return this.props.obtainedExperience
  }

  get obtainedCurrency() {
    return this.props.obtainedCurrency
  }

  get finishedAt() {
    return this.props.finishedAt
  }
}
