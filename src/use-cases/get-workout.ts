import { WorkoutsRepository } from '@/adapters/repositories/workouts-repository'
import { WorkoutDetails } from '@/entities/value-objects/workout-details'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'

interface GetWorkoutUseCaseRequest {
  id: string
}

interface GetWorkoutUseCaseResponse {
  workout: WorkoutDetails
}

// TODO: Block when user dont has required bundle
export class GetWorkoutUseCase {
  constructor(private workoutsRepository: WorkoutsRepository) {}

  async execute({
    id,
  }: GetWorkoutUseCaseRequest): Promise<GetWorkoutUseCaseResponse> {
    const workout = await this.workoutsRepository.findByIdWithDetails(id)

    if (!workout) {
      throw new ResourceNotFoundError(id)
    }

    return { workout }
  }
}
