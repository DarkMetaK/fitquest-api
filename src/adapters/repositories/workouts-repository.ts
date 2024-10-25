import { WorkoutDetails } from '@/entities/value-objects/workout-details'
import { Workout } from '@/entities/workout'

export interface WorkoutsRepository {
  findById(id: string): Promise<Workout | null>

  findByIdWithDetails(id: string): Promise<WorkoutDetails | null>

  findActiveChallenges(): Promise<Workout[]>

  create(workout: Workout): Promise<void>
}
