import { Workout } from '@prisma/client'

import { WorkoutsRepository } from '@/repositories/workouts-repository'

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
