import { makeBundle } from 'test/factories/make-bundle'
import { InMemoryBundlesRepository } from 'test/in-memory/in-memory-bundles-repository'
import { InMemoryExercisesRepository } from 'test/in-memory/in-memory-exercises-repository'
import { InMemoryWorkoutsRepository } from 'test/in-memory/in-memory-workouts-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'
import { GetBundleUseCase } from './get-bundle'

let sut: GetBundleUseCase
let exercisesRepository: InMemoryExercisesRepository
let workoutsRepository: InMemoryWorkoutsRepository
let bundlesRepository: InMemoryBundlesRepository

describe('Use Case: Get Bundle', () => {
  beforeEach(async () => {
    exercisesRepository = new InMemoryExercisesRepository()
    workoutsRepository = new InMemoryWorkoutsRepository(exercisesRepository)
    bundlesRepository = new InMemoryBundlesRepository(workoutsRepository)
    sut = new GetBundleUseCase(bundlesRepository)
  })

  it('should be able to get bundle by id', async () => {
    bundlesRepository.create(
      makeBundle(
        {
          name: 'Bundle 1',
        },
        new UniqueEntityId('bundle-1'),
      ),
    )

    const { bundle } = await sut.execute({ id: 'bundle-1' })

    expect(bundle).toEqual(
      expect.objectContaining({
        name: 'Bundle 1',
      }),
    )
  })

  it('should not be able to get bundle with invalid id', async () => {
    await expect(() =>
      sut.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
