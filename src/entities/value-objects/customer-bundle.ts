import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ValueObject } from '../../core/entities/value-object'
import { FinishedWorkout } from '../finished-workout'
import { Workout } from '../workout'

export interface CustomerBundleProps {
  bundleId: UniqueEntityId
  customerId: UniqueEntityId
  name: string
  description?: string | null
  bannerUrl: string
  isPremium: boolean
  workouts: Workout[]
  finishedWorkouts: FinishedWorkout[]
  createdAt: Date
}

export class CustomerBundle extends ValueObject<CustomerBundleProps> {
  static create(props: CustomerBundleProps) {
    return new CustomerBundle(props)
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

  get finishedWorkouts() {
    return this.props.finishedWorkouts
  }
}
