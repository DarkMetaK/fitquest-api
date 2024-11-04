import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CustomerMetadataProps {
  customerId: UniqueEntityId
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
  premiumExpiresAt?: Date | null
}

export class CustomerMetadata extends Entity<CustomerMetadataProps> {
  static create(
    props: Optional<
      CustomerMetadataProps,
      'totalWorkouts' | 'totalExercises' | 'totalCalories'
    >,
    id?: UniqueEntityId,
  ) {
    const metadata = new CustomerMetadata(
      {
        ...props,
        totalWorkouts: props.totalWorkouts ?? 0,
        totalExercises: props.totalExercises ?? 0,
        totalCalories: props.totalCalories ?? 0,
      },
      id,
    )

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

  get weeklyStreakGoal() {
    return this.props.weeklyStreakGoal
  }

  get experienceAmount() {
    return this.props.experienceAmount
  }

  get currencyAmount() {
    return this.props.currencyAmount
  }

  get totalWorkouts() {
    return this.props.totalWorkouts
  }

  get totalExercises() {
    return this.props.totalExercises
  }

  get totalCalories() {
    return this.props.totalCalories
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

    if (props.weeklyStreakGoal) {
      this.props.weeklyStreakGoal = props.weeklyStreakGoal
    }

    if (props.experienceAmount) {
      this.props.experienceAmount = props.experienceAmount
    }

    if (props.currencyAmount) {
      this.props.currencyAmount = props.currencyAmount
    }

    if (props.totalWorkouts) {
      this.props.totalWorkouts = props.totalWorkouts
    }

    if (props.totalExercises) {
      this.props.totalExercises = props.totalExercises
    }

    if (props.premiumExpiresAt) {
      this.props.premiumExpiresAt = props.premiumExpiresAt
    }
  }
}
