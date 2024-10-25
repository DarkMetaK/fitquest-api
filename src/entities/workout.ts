import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { WorkoutStep } from './workout-step'

export interface WorkoutProps {
  name: string
  availableExperience: number
  availableCurrency: number
  bannerUrl: string
  type: string
  steps: WorkoutStep[]
  expiresAt?: Date | null
  updatedAt?: Date | null
  createdAt: Date
}

export class Workout extends Entity<WorkoutProps> {
  static create(
    props: Optional<WorkoutProps, 'steps' | 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const workout = new Workout(
      {
        ...props,
        steps: props.steps ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return workout
  }

  get name() {
    return this.props.name
  }

  get availableExperience() {
    return this.props.availableExperience
  }

  get availableCurrency() {
    return this.props.availableCurrency
  }

  get bannerUrl() {
    return this.props.bannerUrl
  }

  get type() {
    return this.props.type
  }

  get steps() {
    return this.props.steps
  }

  get expiresAt() {
    return this.props.expiresAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get createdAt() {
    return this.props.createdAt
  }
}
