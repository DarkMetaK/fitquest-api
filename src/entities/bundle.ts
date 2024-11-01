import { Workout } from '@prisma/client'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface BundleProps {
  name: string
  description?: string | null
  bannerUrl: string
  isPremium: boolean
  workouts: Workout[]
  createdAt: Date
}

export class Bundle extends Entity<BundleProps> {
  static create(
    props: Optional<BundleProps, 'workouts' | 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const workout = new Bundle(
      {
        ...props,
        workouts: props.workouts ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return workout
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get bannerUrl() {
    return this.props.bannerUrl
  }

  get isPremium() {
    return this.props.isPremium
  }

  get workouts() {
    return this.props.workouts
  }

  get createdAt() {
    return this.props.createdAt
  }
}
