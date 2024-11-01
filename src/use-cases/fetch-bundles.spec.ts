import { makeBundle } from 'test/factories/make-bundle'
import { InMemoryBundlesRepository } from 'test/in-memory/in-memory-bundles-repository'

import { FetchBundlesUseCase } from './fetch-bundles'

let sut: FetchBundlesUseCase
let bundlesRepository: InMemoryBundlesRepository

describe('Use Case: Fetch Bundles', () => {
  beforeEach(async () => {
    bundlesRepository = new InMemoryBundlesRepository()

    sut = new FetchBundlesUseCase(bundlesRepository)
  })

  it('should be able to fetch bundles', async () => {
    bundlesRepository.create(
      makeBundle({
        name: 'Bundle 1',
      }),
    )

    bundlesRepository.create(
      makeBundle({
        name: 'Bundle 2',
      }),
    )

    const { bundles } = await sut.execute()

    expect(bundles).toHaveLength(2)
  })
})
