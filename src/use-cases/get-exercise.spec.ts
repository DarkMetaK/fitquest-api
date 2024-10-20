import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'

import { NotFoundError } from './errors/not-found-error'
import { GetExerciseUseCase } from './get-exercise'

let sut: GetExerciseUseCase
let exercisesRepository: InMemoryExercisesRepository

describe('Use Case: Get Exercise', () => {
  beforeEach(async () => {
    exercisesRepository = new InMemoryExercisesRepository()
    sut = new GetExerciseUseCase(exercisesRepository)
  })

  it('should be able to get exercise by id', async () => {
    exercisesRepository.create({
      id: 'exercise-1',
      name: 'Exercise 1',
      description: '',
      demoUrl: '',
    })

    const { exercise } = await sut.execute({ id: 'exercise-1' })

    expect(exercise).toEqual(
      expect.objectContaining({
        name: 'Exercise 1',
      }),
    )
  })

  it('should not be able to get exercise with invalid id', async () => {
    await expect(() =>
      sut.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(NotFoundError)
  })
})
