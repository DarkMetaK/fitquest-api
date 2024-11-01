import { BundlesRepository } from '@/adapters/repositories/bundles-repository'
import { Bundle } from '@/entities/bundle'

interface FetchBundlesUseCaseResponse {
  bundles: Bundle[]
}

export class FetchBundlesUseCase {
  constructor(private bundlesRepository: BundlesRepository) {}

  async execute(): Promise<FetchBundlesUseCaseResponse> {
    const bundles = await this.bundlesRepository.findAll()

    return { bundles }
  }
}
