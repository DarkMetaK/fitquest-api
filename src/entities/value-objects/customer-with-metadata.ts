import { ValueObject } from '../../core/entities/value-object'

export interface CustomerWithMetadataProps {
  customerId: string
  name: string
  email: string
  passwordHash?: string | null
  metadata?: {
    metadataId: string
    phone: string
    age: number
    weight: number
    height: number
    goal: string
    experienceAmount: number
    currencyAmount: number
    premiumExpiresAt?: Date | null
  }
  createdAt: Date
}

export class CustomerWithMetadata extends ValueObject<CustomerWithMetadataProps> {
  static create(props: CustomerWithMetadataProps) {
    return new CustomerWithMetadata(props)
  }

  get customerId() {
    return this.props.customerId
  }

  get metadata() {
    return this.props.metadata
  }

  get metadataId() {
    return this.props.metadata?.metadataId
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get passwordHash() {
    return this.props.passwordHash
  }

  get phone() {
    return this.props.metadata?.phone
  }

  get age() {
    return this.props.metadata?.age
  }

  get weight() {
    return this.props.metadata?.weight
  }

  get height() {
    return this.props.metadata?.height
  }

  get goal() {
    return this.props.metadata?.goal
  }

  get experienceAmount() {
    return this.props.metadata?.experienceAmount ?? 0
  }

  set experienceAmount(value: number) {
    if (this.props.metadata) {
      this.props.metadata.experienceAmount = value
    }
  }

  get currencyAmount() {
    return this.props.metadata?.currencyAmount ?? 0
  }

  set currencyAmount(value: number) {
    if (this.props.metadata) {
      this.props.metadata.currencyAmount = value
    }
  }

  get premiumExpiresAt() {
    return this.props.metadata?.premiumExpiresAt
  }

  get createdAt() {
    return this.props.createdAt
  }
}
