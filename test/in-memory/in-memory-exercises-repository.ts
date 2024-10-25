import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Exercise } from '@/entities/exercise'

import { ExercisesRepository } from '../../src/adapters/repositories/exercises-repository'

export class InMemoryExercisesRepository implements ExercisesRepository {
  public items: Exercise[] = []

  async findById(id: string): Promise<Exercise | null> {
    const exercise = this.items.find((item) =>
      item.id.equals(new UniqueEntityId(id)),
    )

    if (!exercise) {
      return null
    }

    return exercise
  }

  async create(exercise: Exercise): Promise<void> {
    this.items.push(exercise)
  }
}
