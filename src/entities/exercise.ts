import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ExerciseProps {
  name: string
  targetedRegions: string[]
  estimatedCalories: number
  demonstrationUrl: string
  instructions: string[]
  previewUrl?: string | null
  videoUrl?: string | null
  audioUrl?: string | null
  repetitions?: number | null
  duration?: number | null
  workoutId?: string | null
  createdAt: Date | null
}

export class Exercise extends Entity<ExerciseProps> {
  static create(
    props: Optional<ExerciseProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const exercise = new Exercise(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return exercise
  }

  get name() {
    return this.props.name
  }

  get targetedRegions() {
    return this.props.targetedRegions
  }

  get estimatedCalories() {
    return this.props.estimatedCalories
  }

  get demonstrationUrl() {
    return this.props.demonstrationUrl
  }

  get instructions() {
    return this.props.instructions
  }

  get previewUrl() {
    return this.props.previewUrl
  }

  get videoUrl() {
    return this.props.videoUrl
  }

  get audioUrl() {
    return this.props.audioUrl
  }

  get repetitions() {
    return this.props.repetitions
  }

  get duration() {
    return this.props.duration
  }

  get workoutId() {
    return this.props.workoutId
  }

  get createdAt() {
    return this.props.createdAt
  }
}
