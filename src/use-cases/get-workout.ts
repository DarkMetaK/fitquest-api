import {
  WorkoutsRepository,
  WorkoutWithSteps,
} from '@/repositories/workouts-repository'

import { NotFoundError } from './errors/not-found-error'

interface GetWorkoutUseCaseRequest {
  id: string
}

interface GetWorkoutUseCaseResponse {
  workout: WorkoutWithSteps
}

export class GetWorkoutUseCase {
  constructor(private workoutsRepository: WorkoutsRepository) {}

  async execute({
    id,
  }: GetWorkoutUseCaseRequest): Promise<GetWorkoutUseCaseResponse> {
    const workout = await this.workoutsRepository.findByIdWithSteps(id)

    if (!workout) {
      throw new NotFoundError(`Workout with id '${id}' not found.`)
    }

    return { workout }
  }
}
