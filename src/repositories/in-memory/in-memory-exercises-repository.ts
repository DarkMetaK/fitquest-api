import { randomUUID } from 'node:crypto'

import { Exercise, Prisma } from '@prisma/client'

import { ExercisesRepository } from '../exercises-repository'

export class InMemoryExercisesRepository implements ExercisesRepository {
  public items: Exercise[] = []

  async findById(id: string): Promise<Exercise | null> {
    const exercise = this.items.find((item) => item.id === id)

    if (!exercise) {
      return null
    }

    return exercise
  }

  async create(data: Prisma.ExerciseCreateInput): Promise<Exercise> {
    const exercise: Exercise = {
      id: data.id ?? randomUUID(),
      name: data.name,
      instructions: data.instructions ?? '',
      targetedRegions: Array.isArray(data.targetedRegions)
        ? data.targetedRegions
        : [],
      estimatedCalories: data.estimatedCalories,
      demonstrationUrl: data.demonstrationUrl,
      previewUrl: data.previewUrl ?? null,
      videoUrl: data.videoUrl ?? null,
      audioUrl: data.audioUrl ?? null,
      duration: data.duration ?? null,
      repetitions: data.repetitions ?? null,
      workoutId: null,
      createdAt: new Date(),
    }

    this.items.push(exercise)

    return exercise
  }
}
