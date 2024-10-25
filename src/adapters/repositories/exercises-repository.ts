import { Exercise } from '@/entities/exercise'

export interface ExercisesRepository {
  findById(id: string): Promise<Exercise | null>

  create(exercise: Exercise): Promise<void>
}
