import { Bundle } from '@prisma/client'

import { BundlesRepository } from '@/repositories/bundles-repository'
import { Pagination, PaginationResponse } from '@/types/pagination'

interface FetchBundlesUseCaseRequest extends Pagination<Bundle> {}

interface FetchBundlesUseCaseResponse {
  bundles: PaginationResponse<Bundle>
}

export class FetchBundlesUseCase {
  constructor(private bundlesRepository: BundlesRepository) {}

  async execute({
    page,
    perPage,
    orderBy,
  }: FetchBundlesUseCaseRequest): Promise<FetchBundlesUseCaseResponse> {
    const bundles = await this.bundlesRepository.findMany({
      page,
      perPage,
      orderBy,
    })

    return { bundles }
  }
}
