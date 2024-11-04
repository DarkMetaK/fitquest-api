import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CustomerActivityProps {
  customerId: UniqueEntityId
  date: Date
  activityType: string
}

export class CustomerActivity extends Entity<CustomerActivityProps> {
  static create(props: CustomerActivityProps, id?: UniqueEntityId) {
    const activity = new CustomerActivity(props, id)

    return activity
  }

  get customerId() {
    return this.props.customerId
  }

  get date() {
    return this.props.date
  }

  get activityType() {
    return this.props.activityType
  }
}
