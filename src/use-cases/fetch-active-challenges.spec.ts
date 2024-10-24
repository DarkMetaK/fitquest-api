import { InMemoryWorkoutsRepository } from '@/repositories/in-memory/in-memory-workouts-repository'

import { FetchActiveChallengesUseCase } from './fetch-active-challenges'

let sut: FetchActiveChallengesUseCase
let workoutsRepository: InMemoryWorkoutsRepository

describe('Use Case: Fetch Active Challenges', () => {
  beforeEach(async () => {
    workoutsRepository = new InMemoryWorkoutsRepository()
    sut = new FetchActiveChallengesUseCase(workoutsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch active challenges', async () => {
    vi.setSystemTime(new Date(2024, 9, 20, 0, 0, 0))

    workoutsRepository.create({
      name: 'Active challenge',
      bannerUrl: '',
      availableCurrency: 1000,
      availableExperience: 1000,
      type: 'CHALLENGE',
      expiresAt: new Date(2024, 9, 21, 0, 0, 0),
    })

    workoutsRepository.create({
      name: 'Expired challenge',
      bannerUrl: '',
      availableCurrency: 1000,
      availableExperience: 1000,
      type: 'CHALLENGE',
      expiresAt: new Date(2024, 9, 19, 0, 0, 0),
    })

    const { activechallenges } = await sut.execute()

    expect(activechallenges).toHaveLength(1)
    expect(activechallenges[0]).toEqual(
      expect.objectContaining({
        name: 'Active challenge',
      }),
    )
  })
})
