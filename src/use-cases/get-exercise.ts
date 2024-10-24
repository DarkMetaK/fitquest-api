import { Exercise } from '@prisma/client'

import { ExercisesRepository } from '@/repositories/exercises-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetExerciseUseCaseRequest {
  id: string
}

interface GetExerciseUseCaseResponse {
  exercise: Exercise
}

export class GetExerciseUseCase {
  constructor(private exercisesRepository: ExercisesRepository) {}

  async execute({
    id,
  }: GetExerciseUseCaseRequest): Promise<GetExerciseUseCaseResponse> {
    const exercise = await this.exercisesRepository.findById(id)

    if (!exercise) {
      throw new ResourceNotFoundError(id)
    }

    return { exercise }
  }
}
