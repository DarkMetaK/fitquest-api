import {
  WorkoutsRepository,
  WorkoutWithExercise,
} from '@/repositories/workouts-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetWorkoutUseCaseRequest {
  id: string
}

interface GetWorkoutUseCaseResponse {
  workout: WorkoutWithExercise
}

export class GetWorkoutUseCase {
  constructor(private workoutsRepository: WorkoutsRepository) {}

  async execute({
    id,
  }: GetWorkoutUseCaseRequest): Promise<GetWorkoutUseCaseResponse> {
    const workout = await this.workoutsRepository.findByIdWithExercises(id)

    if (!workout) {
      throw new ResourceNotFoundError(id)
    }

    return { workout }
  }
}
