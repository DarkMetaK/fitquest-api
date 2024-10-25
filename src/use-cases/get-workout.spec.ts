import { makeWorkout } from 'test/factories/make-workout'
import { InMemoryExercisesRepository } from 'test/in-memory/in-memory-exercises-repository'
import { InMemoryWorkoutsRepository } from 'test/in-memory/in-memory-workouts-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'
import { GetWorkoutUseCase } from './get-workout'

let sut: GetWorkoutUseCase
let exercisesRepository: InMemoryExercisesRepository
let workoutsRepository: InMemoryWorkoutsRepository

describe('Use Case: Get Workout', () => {
  beforeEach(async () => {
    exercisesRepository = new InMemoryExercisesRepository()
    workoutsRepository = new InMemoryWorkoutsRepository(exercisesRepository)
    sut = new GetWorkoutUseCase(workoutsRepository)
  })

  it('should be able to get workout by id', async () => {
    workoutsRepository.create(
      makeWorkout(
        {
          name: 'Workout 1',
        },
        new UniqueEntityId('workout-1'),
      ),
    )

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
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
