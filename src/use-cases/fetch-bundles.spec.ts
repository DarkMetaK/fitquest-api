import { InMemoryBundlesRepository } from '@/repositories/in-memory/in-memory-bundles-repository'

import { FetchBundlesUseCase } from './fetch-bundles'

let sut: FetchBundlesUseCase
let bundlesRepository: InMemoryBundlesRepository

describe('Use Case: Fetch Bundles', () => {
  beforeEach(async () => {
    bundlesRepository = new InMemoryBundlesRepository()
    sut = new FetchBundlesUseCase(bundlesRepository)
  })

  it('should be able to fetch bundles', async () => {
    bundlesRepository.create({
      name: 'Bundle 1',
      description: '',
      bannerUrl: '',
      price: 0,
    })

    bundlesRepository.create({
      name: 'Bundle 2',
      description: '',
      bannerUrl: '',
      price: 0,
    })

    const { bundles } = await sut.execute({ page: 1, perPage: 10 })

    expect(bundles.total).toEqual(2)
    expect(bundles.data).toEqual([
      expect.objectContaining({ name: 'Bundle 1' }),
      expect.objectContaining({ name: 'Bundle 2' }),
    ])
  })

  it('should be able to fetch paginated bundles', async () => {
    for (let i = 1; i <= 20; i++) {
      bundlesRepository.create({
        name: `Bundle ${i}`,
        description: '',
        bannerUrl: '',
        price: 0,
      })
    }

    const { bundles } = await sut.execute({ page: 2, perPage: 10 })

    expect(bundles.total).toEqual(20)
    expect(bundles.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Bundle 11' }),
        expect.objectContaining({ name: 'Bundle 20' }),
      ]),
    )
  })

  it('should be able to fetch paginated bundles sorted by desc price', async () => {
    for (let i = 1; i <= 20; i++) {
      bundlesRepository.create({
        name: `Bundle ${i}`,
        description: '',
        bannerUrl: '',
        price: i,
      })
    }

    const { bundles } = await sut.execute({
      page: 1,
      perPage: 10,
      orderBy: { price: 'desc' },
    })

    expect(bundles.total).toEqual(20)
    expect(bundles.data[0]).toEqual(
      expect.objectContaining({ name: 'Bundle 20' }),
    )
    expect(bundles.data[9]).toEqual(
      expect.objectContaining({ name: 'Bundle 11' }),
    )
  })
})
