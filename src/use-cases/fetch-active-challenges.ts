import { WorkoutsRepository } from '@/adapters/repositories/workouts-repository'
import { Workout } from '@/entities/workout'

interface FetchActiveChallengesUseCaseResponse {
  activechallenges: Workout[]
}

export class FetchActiveChallengesUseCase {
  constructor(private workoutsRepository: WorkoutsRepository) {}

  async execute(): Promise<FetchActiveChallengesUseCaseResponse> {
    const activechallenges =
      await this.workoutsRepository.findActiveChallenges()

    return { activechallenges }
  }
}
