import { Exercise, Prisma } from '@prisma/client'

export interface ExercisesRepository {
  findById(id: string): Promise<Exercise | null>
  create(data: Prisma.ExerciseCreateInput): Promise<Exercise>
}
