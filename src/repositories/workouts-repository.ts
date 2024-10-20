import { Prisma, Workout } from '@prisma/client'

export interface WorkoutsRepository {
  findActiveChallenges(): Promise<Workout[]>
  create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout>
}
