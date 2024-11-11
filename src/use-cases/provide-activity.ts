import dayjs from 'dayjs'

import { CustomerActivitiesRepository } from '@/adapters/repositories/customer-activities-repository'
import { CustomersMetadataRepository } from '@/adapters/repositories/customers-metadata-repository'
import { StreaksRepository } from '@/adapters/repositories/streaks-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerActivity } from '@/entities/customer-activity'
import { Streak } from '@/entities/streak'

export interface ProvideActivityUseCaseRequest {
  customerId: string
  activityType: 'STREAK' | 'REST' | 'INACTIVE'
  date?: Date
}

export class ProvideActivityUseCase {
  constructor(
    private customersMetadataRepository: CustomersMetadataRepository,
    private customerActivitiesRepository: CustomerActivitiesRepository,
    private streaksRepository: StreaksRepository,
  ) {}

  async execute({
    customerId,
    activityType,
    date = new Date(),
  }: ProvideActivityUseCaseRequest): Promise<void> {
    const today = dayjs(date).startOf('day')

    await this.checkWeeklyReset(customerId)

    const existingActivity =
      await this.customerActivitiesRepository.findByCustomerIdAndDate(
        customerId,
        today.toDate(),
      )

    if (existingActivity) {
      return
    }

    if (activityType === 'STREAK') {
      await this.customerActivitiesRepository.create(
        CustomerActivity.create({
          customerId: new UniqueEntityId(customerId),
          date: today.toDate(),
          activityType,
        }),
      )

      await this.increaseStreak(customerId)
    } else if (activityType === 'INACTIVE') {
      await this.handleInactive(customerId, today.toDate())
    }
  }

  private async checkWeeklyReset(customerId: string): Promise<void> {
    let streak = await this.streaksRepository.findByCustomerId(customerId)
    const currentWeekStart = dayjs().startOf('week')

    if (!streak) {
      const customerMetadata =
        await this.customersMetadataRepository.findByCustomerId(customerId)

      if (!customerMetadata) {
        throw new Error()
      }

      streak = Streak.create({
        customerId: new UniqueEntityId(customerId),
        currentStreak: 0,
        maximumStreak: 0,
        streakGoal: customerMetadata.weeklyStreakGoal,
        weekStartDate: currentWeekStart.toDate(),
        remainingRestDays: 7 - customerMetadata.weeklyStreakGoal,
        createdAt: new Date(),
      })

      await this.streaksRepository.create(streak)
    }

    if (!currentWeekStart.isSame(streak.weekStartDate)) {
      streak.remainingRestDays = 7 - streak.streakGoal

      streak.weekStartDate = currentWeekStart.toDate()

      await this.streaksRepository.update(streak)
    }
  }

  private async increaseStreak(customerId: string): Promise<void> {
    const userStreak = await this.streaksRepository.findByCustomerId(customerId)

    if (!userStreak) {
      throw new Error()
    }

    userStreak.currentStreak += 1

    await this.streaksRepository.update(userStreak)
  }

  private async handleInactive(customerId: string, date: Date): Promise<void> {
    const userStreak = await this.streaksRepository.findByCustomerId(customerId)

    if (!userStreak) {
      throw new Error()
    }

    if (userStreak.remainingRestDays > 0) {
      await this.customerActivitiesRepository.create(
        CustomerActivity.create({
          customerId: new UniqueEntityId(customerId),
          date,
          activityType: 'REST',
        }),
      )

      userStreak.remainingRestDays -= 1
    } else {
      await this.customerActivitiesRepository.create(
        CustomerActivity.create({
          customerId: new UniqueEntityId(customerId),
          date,
          activityType: 'INACTIVE',
        }),
      )

      userStreak.currentStreak = 0
    }

    await this.streaksRepository.update(userStreak)
  }
}
