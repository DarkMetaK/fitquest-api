import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ValueObject } from '../../core/entities/value-object'

interface StepWithExercise {
  order: number
  exerciseId: UniqueEntityId
  name: string
  targetedRegions: string[]
  estimatedCalories: number
  demonstrationUrl: string
  instructions?: string | null
  previewUrl?: string | null
  videoUrl?: string | null
  audioUrl?: string | null
  repetitions?: number | null
  duration?: number | null
  createdAt: Date | null
}

export interface WorkoutDetailsProps {
  workoutId: UniqueEntityId
  name: string
  availableExperience: number
  availableCurrency: number
  bannerUrl: string
  type: string
  bundleId?: UniqueEntityId | null
  steps: StepWithExercise[]
  expiresAt?: Date | null
  updatedAt?: Date | null
  createdAt: Date
}

export class WorkoutDetails extends ValueObject<WorkoutDetailsProps> {
  static create(props: WorkoutDetailsProps) {
    return new WorkoutDetails(props)
  }

  get workoutId() {
    return this.props.workoutId
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

  get bundleId() {
    return this.props.bundleId
  }

  get steps() {
    return this.props.steps
  }

  get estimatedTime() {
    return this.props.steps.reduce((acc, step) => {
      if (step.duration) {
        return acc + step.duration
      }

      return acc
    }, 0)
  }

  get estimatedCalories() {
    return this.props.steps.reduce(
      (acc, step) => acc + step.estimatedCalories,
      0,
    )
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
