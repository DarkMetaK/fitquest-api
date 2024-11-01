import { BundlesRepository } from '@/adapters/repositories/bundles-repository'
import { BundleWithWorkouts } from '@/entities/value-objects/bundle-with-workouts'

import { ResourceNotFoundError } from '../core/errors/resource-not-found-error'

interface GetBundleUseCaseRequest {
  id: string
}

interface GetBundleUseCaseResponse {
  bundle: BundleWithWorkouts
}

export class GetBundleUseCase {
  constructor(private bundlesRepository: BundlesRepository) {}

  async execute({
    id,
  }: GetBundleUseCaseRequest): Promise<GetBundleUseCaseResponse> {
    const bundle = await this.bundlesRepository.findByIdWithWorkouts(id)

    if (!bundle) {
      throw new ResourceNotFoundError(id)
    }

    return { bundle }
  }
}
