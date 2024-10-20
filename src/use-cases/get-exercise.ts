import { Exercise } from '@prisma/client'

import { ExercisesRepository } from '@/repositories/exercises-repository'

import { NotFoundError } from './errors/not-found-error'

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
      throw new NotFoundError(`Exercise with id '${id}' not found.`)
    }

    return { exercise }
  }
}
