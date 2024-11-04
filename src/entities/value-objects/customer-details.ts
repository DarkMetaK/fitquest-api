import { ValueObject } from '../../core/entities/value-object'

export interface CustomerDetailsProps {
  customerId: string
  name: string
  email: string
  metadataId: string
  phone: string
  age: number
  weight: number
  height: number
  goal: string
  weeklyStreakGoal: number
  experienceAmount: number
  currencyAmount: number
  totalWorkouts: number
  totalExercises: number
  totalCalories: number
  highestStreak: number
  premiumExpiresAt?: Date | null
  createdAt: Date
}

export class CustomerDetails extends ValueObject<CustomerDetailsProps> {
  static create(props: CustomerDetailsProps) {
    return new CustomerDetails(props)
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

  get phone() {
    return this.props.phone
  }

  set phone(value: string) {
    this.props.phone = value
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

  get weeklyStreakGoal() {
    return this.props.weeklyStreakGoal
  }

  get experienceAmount() {
    return this.props.experienceAmount ?? 0
  }

  set experienceAmount(value: number) {
    this.props.experienceAmount = value
  }

  get currencyAmount() {
    return this.props.currencyAmount ?? 0
  }

  set currencyAmount(value: number) {
    this.props.currencyAmount = value
  }

  get totalWorkouts() {
    return this.props.totalWorkouts ?? 0
  }

  get totalExercises() {
    return this.props.totalExercises ?? 0
  }

  get totalCalories() {
    return this.props.totalCalories ?? 0
  }

  get premiumExpiresAt() {
    return this.props.premiumExpiresAt
  }

  get highestStreak() {
    return this.props.highestStreak ?? 0
  }

  get createdAt() {
    return this.props.createdAt
  }
}