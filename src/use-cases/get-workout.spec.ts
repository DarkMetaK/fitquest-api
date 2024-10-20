import { InMemoryWorkoutsRepository } from '@/repositories/in-memory/in-memory-workouts-repository'

import { NotFoundError } from './errors/not-found-error'
import { GetWorkoutUseCase } from './get-workout'

let sut: GetWorkoutUseCase
let workoutsRepository: InMemoryWorkoutsRepository

describe('Use Case: Get Workout', () => {
  beforeEach(async () => {
    workoutsRepository = new InMemoryWorkoutsRepository()
    sut = new GetWorkoutUseCase(workoutsRepository)
  })

  it('should be able to get workout by id', async () => {
    workoutsRepository.create({
      id: 'workout-1',
      name: 'Workout 1',
      description: '',
      bannerUrl: '',
      availableCurrency: 1000,
      availableExperience: 1000,
    })

    const { workout } = await sut.execute({ id: 'workout-1' })

    expect(workout).toEqual(
      expect.objectContaining({
        name: 'Workout 1',
      }),
    )
  })

  it('should not be able to get workout with invalid id', async () => {
    await expect(() =>
      sut.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(NotFoundError)
  })
})
