import { Prisma, Workout } from '@prisma/client'

export type WorkoutWithSteps = Prisma.WorkoutGetPayload<{
  include: {
    steps: {
      select: {
        exercise: true
      }
      include: {
        exercise: {
          select: {
            id: true
            name: true
            targetedRegions: true
            duration: true
            repetitions: true
          }
        }
      }
    }
  }
}>

export interface WorkoutsRepository {
  findById(id: string): Promise<Workout | null>
  findByIdWithSteps(id: string): Promise<WorkoutWithSteps | null>
  findActiveChallenges(): Promise<Workout[]>
  create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout>
}
