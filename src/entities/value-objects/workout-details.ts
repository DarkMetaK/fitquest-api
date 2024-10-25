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
  name: string
  availableExperience: number
  availableCurrency: number
  bannerUrl: string
  type: string
  steps: StepWithExercise[]
  expiresAt?: Date | null
  updatedAt?: Date | null
  createdAt: Date
}

export class WorkoutDetails extends ValueObject<WorkoutDetailsProps> {
  static create(props: WorkoutDetailsProps) {
    return new WorkoutDetails(props)
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
