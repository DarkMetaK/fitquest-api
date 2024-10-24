import { Prisma, Workout } from '@prisma/client'

export type WorkoutWithExercise = Prisma.WorkoutGetPayload<{
  include: {
    exercises: true
  }
}>

export interface WorkoutsRepository {
  findById(id: string): Promise<Workout | null>
  findByIdWithExercises(id: string): Promise<WorkoutWithExercise | null>
  findActiveChallenges(): Promise<Workout[]>
  create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout>
}
