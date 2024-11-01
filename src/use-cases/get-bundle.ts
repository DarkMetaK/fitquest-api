import { BundlesRepository } from '@/adapters/repositories/bundles-repository'
import { Bundle } from '@/entities/bundle'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'

interface GetBundleUseCaseRequest {
  id: string
}

interface GetBundleUseCaseResponse {
  bundle: Bundle
}

export class GetBundleUseCase {
  constructor(private bundlesRepository: BundlesRepository) {}

  async execute({
    id,
  }: GetBundleUseCaseRequest): Promise<GetBundleUseCaseResponse> {
    const bundle = await this.bundlesRepository.findById(id)

    if (!bundle) {
      throw new ResourceNotFoundError(id)
    }

    return { bundle }
  }
}
