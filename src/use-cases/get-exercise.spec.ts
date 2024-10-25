import { makeExercise } from 'test/factories/make-exercise'
import { InMemoryExercisesRepository } from 'test/in-memory/in-memory-exercises-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'
import { GetExerciseUseCase } from './get-exercise'

let sut: GetExerciseUseCase
let exercisesRepository: InMemoryExercisesRepository

describe('Use Case: Get Exercise', () => {
  beforeEach(async () => {
    exercisesRepository = new InMemoryExercisesRepository()
    sut = new GetExerciseUseCase(exercisesRepository)
  })

  it('should be able to get exercise by id', async () => {
    exercisesRepository.create(
      makeExercise(
        {
          name: 'Exercise 1',
        },
        new UniqueEntityId('exercise-1'),
      ),
    )

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
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
