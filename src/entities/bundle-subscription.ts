import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface BundleSubscriptionProps {
  customerId: UniqueEntityId
  bundleId: UniqueEntityId
  isActive: boolean
  finishedAt?: Date | null
  createdAt: Date
}

export class BundleSubscription extends Entity<BundleSubscriptionProps> {
  static create(
    props: Optional<BundleSubscriptionProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const workout = new BundleSubscription(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return workout
  }

  get customerId() {
    return this.props.customerId
  }

  get bundleId() {
    return this.props.bundleId
  }

  get isActive() {
    return this.props.isActive
  }

  get finishedAt() {
    return this.props.finishedAt
  }

  get createdAt() {
    return this.props.createdAt
  }
}
