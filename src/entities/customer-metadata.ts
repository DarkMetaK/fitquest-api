import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CustomerMetadataProps {
  customerId: UniqueEntityId
  phone: string
  age: number
  weight: number
  height: number
  goal: string
  experienceAmount: number
  currencyAmount: number
  premiumExpiresAt?: Date | null
}

export class CustomerMetadata extends Entity<CustomerMetadataProps> {
  static create(props: CustomerMetadataProps, id?: UniqueEntityId) {
    const metadata = new CustomerMetadata(props, id)

    return metadata
  }

  get customerId() {
    return this.props.customerId
  }

  get phone() {
    return this.props.phone
  }

  get age() {
    return this.props.age
  }

  get weight() {
    return this.props.weight
  }

  get height() {
    return this.props.height
  }

  get goal() {
    return this.props.goal
  }

  get experienceAmount() {
    return this.props.experienceAmount
  }

  get currencyAmount() {
    return this.props.currencyAmount
  }

  get premiumExpiresAt() {
    return this.props.premiumExpiresAt
  }
}
