import { randomUUID } from 'node:crypto'

import { Prisma, Workout } from '@prisma/client'
import dayjs from 'dayjs'

import { WorkoutsRepository, WorkoutWithExercise } from '../workouts-repository'

export class InMemoryWorkoutsRepository implements WorkoutsRepository {
  public items: Workout[] = []

  async findById(id: string): Promise<Workout | null> {
    const workout = this.items.find((item) => item.id === id)

    if (!workout) {
      return null
    }

    return workout
  }

  async findByIdWithExercises(id: string): Promise<WorkoutWithExercise | null> {
    const workout = this.items.find((item) => item.id === id)

    if (!workout) {
      return null
    }

    return {
      ...workout,
      exercises: [],
    }
  }

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
      bannerUrl: data.bannerUrl,
      availableCurrency: data.availableCurrency,
      availableExperience: data.availableExperience,
      type: data.type ?? 'STANDARD',
      bundleId: data.bundleId ?? randomUUID(),
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
      createdAt: new Date(),
    }

    this.items.push(workout)

    return workout
  }
}
