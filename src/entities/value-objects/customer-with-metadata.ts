import { ValueObject } from '../../core/entities/value-object'

export interface CustomerWithMetadataProps {
  customerId: string
  metadataId: string
  name: string
  email: string
  passwordHash?: string | null
  phone: string
  age: number
  weight: number
  height: number
  goal: string
  experienceAmount: number
  currencyAmount: number
  premiumExpiresAt?: Date | null
  createdAt: Date
}

export class CustomerWithMetadata extends ValueObject<CustomerWithMetadataProps> {
  static create(props: CustomerWithMetadataProps) {
    return new CustomerWithMetadata(props)
  }

  get customerId() {
    return this.props.customerId
  }

  get metadataId() {
    return this.props.metadataId
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

  set experienceAmount(value: number) {
    this.props.experienceAmount = value
  }

  get currencyAmount() {
    return this.props.currencyAmount
  }

  set currencyAmount(value: number) {
    this.props.currencyAmount = value
  }

  get premiumExpiresAt() {
    return this.props.premiumExpiresAt
  }

  get createdAt() {
    return this.props.createdAt
  }
}
