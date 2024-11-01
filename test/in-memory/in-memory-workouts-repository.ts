import dayjs from 'dayjs'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { WorkoutDetails } from '@/entities/value-objects/workout-details'
import { Workout } from '@/entities/workout'

import { WorkoutsRepository } from '../../src/adapters/repositories/workouts-repository'
import { InMemoryExercisesRepository } from './in-memory-exercises-repository'

export class InMemoryWorkoutsRepository implements WorkoutsRepository {
  public items: Workout[] = []

  constructor(private exercisesRepository: InMemoryExercisesRepository) {}

  async findById(id: string): Promise<Workout | null> {
    const workout = this.items.find((item) =>
      item.id.equals(new UniqueEntityId(id)),
    )

    if (!workout) {
      return null
    }

    return workout
  }

  async findByIdWithDetails(id: string): Promise<WorkoutDetails | null> {
    const workout = this.items.find((item) =>
      item.id.equals(new UniqueEntityId(id)),
    )

    if (!workout) {
      return null
    }

    const steps = await Promise.all(
      workout.steps.map((step) => {
        const exercise = this.exercisesRepository.items.find((item) =>
          item.id.equals(step.exerciseId),
        )

        if (!exercise) {
          throw new Error(
            `Exercise with id "${step.exerciseId.toString()}" does not exist.`,
          )
        }

        return {
          order: step.order,
          exerciseId: exercise.id,
          name: exercise.name,
          targetedRegions: exercise.targetedRegions,
          estimatedCalories: exercise.estimatedCalories,
          demonstrationUrl: exercise.demonstrationUrl,
          instructions: exercise.instructions,
          previewUrl: exercise.previewUrl,
          videoUrl: exercise.videoUrl,
          audioUrl: exercise.audioUrl,
          repetitions: exercise.repetitions,
          duration: exercise.duration,
          createdAt: exercise.createdAt,
        }
      }),
    )

    return WorkoutDetails.create({
      workoutId: workout.id,
      name: workout.name,
      availableExperience: workout.availableExperience,
      availableCurrency: workout.availableCurrency,
      bannerUrl: workout.bannerUrl,
      type: workout.type,
      bundleId: workout.bundleId,
      steps,
      expiresAt: workout.expiresAt,
      updatedAt: workout.updatedAt,
      createdAt: workout.createdAt,
    })
  }

  async findActiveChallenges(): Promise<Workout[]> {
    const challenges = this.items.filter(
      (item) =>
        item.type === 'CHALLENGE' && dayjs(new Date()).isBefore(item.expiresAt),
    )

    return challenges
  }

  async create(workout: Workout): Promise<void> {
    this.items.push(workout)
  }
}
