import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface FinishedWorkoutProps {
  userId: UniqueEntityId
  workoutId: UniqueEntityId
  obtainedExperience: number
  obtainedCurrency: number
  finishedAt: Date
}

export class FinishedWorkout extends Entity<FinishedWorkoutProps> {
  static create(
    props: Optional<FinishedWorkoutProps, 'finishedAt'>,
    id?: UniqueEntityId,
  ) {
    const step = new FinishedWorkout(
      {
        ...props,
        finishedAt: props.finishedAt ?? new Date(),
      },
      id,
    )

    return step
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
