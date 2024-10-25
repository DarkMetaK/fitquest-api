import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface WorkoutStepProps {
  workoutId: UniqueEntityId
  exerciseId: UniqueEntityId
  order: number
}

export class WorkoutStep extends Entity<WorkoutStepProps> {
  static create(props: WorkoutStepProps, id?: UniqueEntityId) {
    const step = new WorkoutStep(props, id)

    return step
  }

  get workoutId() {
    return this.props.workoutId
  }

  get exerciseId() {
    return this.props.exerciseId
  }

  get order() {
    return this.props.order
  }
}
