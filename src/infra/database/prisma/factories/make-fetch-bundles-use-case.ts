import { FetchBundlesUseCase } from '@/use-cases/fetch-bundles'

import { PrismaBundlesRepository } from '../repositories/prisma-bundles-repository'

export class makeFetchBundlesUseCase {
  static create(): FetchBundlesUseCase {
    const bundlesRepository = new PrismaBundlesRepository()

    const fetchBundlesUseCase = new FetchBundlesUseCase(bundlesRepository)

    return fetchBundlesUseCase
  }
}
