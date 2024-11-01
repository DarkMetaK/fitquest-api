import { BundlesRepository } from '@/adapters/repositories/bundles-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Bundle } from '@/entities/bundle'

export class InMemoryBundlesRepository implements BundlesRepository {
  public items: Bundle[] = []

  async findById(id: string): Promise<Bundle | null> {
    const bundle = this.items.find((item) =>
      item.id.equals(new UniqueEntityId(id)),
    )

    if (!bundle) {
      return null
    }

    return bundle
  }

  async create(bundle: Bundle): Promise<void> {
    this.items.push(bundle)
  }
}
