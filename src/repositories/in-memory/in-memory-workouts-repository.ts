import { randomUUID } from 'node:crypto'

import { Prisma, Workout } from '@prisma/client'
import dayjs from 'dayjs'

import { WorkoutsRepository } from '../workouts-repository'

export class InMemoryWorkoutsRepository implements WorkoutsRepository {
  public items: Workout[] = []

  async findActiveChallenges(): Promise<Workout[]> {
    const challenges = this.items.filter(
      (item) =>
        item.type === 'CHALLENGE' && dayjs(new Date()).isBefore(item.expiresAt),
    )

    return challenges
  }

  async create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout> {
    const workout: Workout = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      bannerUrl: data.bannerUrl,
      availableCurrency: data.availableCurrency,
      availableExperience: data.availableExperience,
      bundleId: data.bundleId || randomUUID(),
      type: data.type || 'LEVEL',
      createdAt: new Date(),
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    }

    this.items.push(workout)

    return workout
  }
}
