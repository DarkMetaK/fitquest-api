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

  update(props: Partial<Omit<CustomerMetadataProps, 'customerId'>>) {
    if (props.phone) {
      this.props.phone = props.phone
    }

    if (props.age) {
      this.props.age = props.age
    }

    if (props.weight) {
      this.props.weight = props.weight
    }

    if (props.height) {
      this.props.height = props.height
    }

    if (props.goal) {
      this.props.goal = props.goal
    }

    if (props.experienceAmount) {
      this.props.experienceAmount = props.experienceAmount
    }

    if (props.currencyAmount) {
      this.props.currencyAmount = props.currencyAmount
    }

    if (props.premiumExpiresAt) {
      this.props.premiumExpiresAt = props.premiumExpiresAt
    }
  }
}
