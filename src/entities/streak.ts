import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface StreakProps {
  customerId: UniqueEntityId
  currentStreak: number
  maximumStreak: number
  streakGoal: number
  weekStartDate: Date
  remainingRestDays: number
  createdAt: Date
}

export class Streak extends Entity<StreakProps> {
  static create(
    props: Optional<StreakProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const streak = new Streak(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return streak
  }

  get customerId() {
    return this.props.customerId
  }

  get currentStreak() {
    return this.props.currentStreak
  }

  set currentStreak(value: number) {
    this.props.currentStreak = value

    if (value > this.maximumStreak) {
      this.maximumStreak = value
    }
  }

  get maximumStreak() {
    return this.props.maximumStreak
  }

  set maximumStreak(value: number) {
    this.props.maximumStreak = value
  }

  get streakGoal() {
    return this.props.streakGoal
  }

  get weekStartDate() {
    return this.props.weekStartDate
  }

  set weekStartDate(value: Date) {
    this.props.weekStartDate = value
  }

  get remainingRestDays() {
    return this.props.remainingRestDays
  }

  set remainingRestDays(value: number) {
    this.props.remainingRestDays = value
  }

  get createdAt() {
    return this.props.createdAt
  }
}
