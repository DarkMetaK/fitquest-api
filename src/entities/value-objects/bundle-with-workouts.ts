import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ValueObject } from '../../core/entities/value-object'
import { Workout } from '../workout'

export interface BundleWithWorkoutsProps {
  bundleId: UniqueEntityId
  name: string
  description?: string | null
  bannerUrl: string
  isPremium: boolean
  workouts: Workout[]
  createdAt: Date
}

export class BundleWithWorkouts extends ValueObject<BundleWithWorkoutsProps> {
  static create(props: BundleWithWorkoutsProps) {
    return new BundleWithWorkouts(props)
  }

  get bundleId() {
    return this.props.bundleId
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
}
