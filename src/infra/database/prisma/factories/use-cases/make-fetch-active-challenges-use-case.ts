import { FetchActiveChallengesUseCase } from '@/use-cases/fetch-active-challenges'

import { PrismaWorkoutsRepository } from '../../repositories/prisma-workouts-repository'

export class makeFetchActiveChallengesUseCase {
  static create(): FetchActiveChallengesUseCase {
    const workoutsRepository = new PrismaWorkoutsRepository()

    const fetchActiveChallengesUseCase = new FetchActiveChallengesUseCase(
      workoutsRepository,
    )

    return fetchActiveChallengesUseCase
  }
}
