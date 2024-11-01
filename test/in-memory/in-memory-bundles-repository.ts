import { BundlesRepository } from '@/adapters/repositories/bundles-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Bundle } from '@/entities/bundle'
import { BundleWithWorkouts } from '@/entities/value-objects/bundle-with-workouts'

import { InMemoryWorkoutsRepository } from './in-memory-workouts-repository'

export class InMemoryBundlesRepository implements BundlesRepository {
  public items: Bundle[] = []

  constructor(private workoutsRepository: InMemoryWorkoutsRepository) {}

  async findById(id: string): Promise<Bundle | null> {
    const bundle = this.items.find((item) =>
      item.id.equals(new UniqueEntityId(id)),
    )

    if (!bundle) {
      return null
    }

    return bundle
  }

  async findByIdWithWorkouts(id: string): Promise<BundleWithWorkouts | null> {
    const bundle = this.items.find((item) =>
      item.id.equals(new UniqueEntityId(id)),
    )

    if (!bundle) {
      return null
    }

    const workouts = this.workoutsRepository.items.filter((item) =>
      item.bundleId?.equals(bundle.id),
    )

    const bundleWithWorkouts = BundleWithWorkouts.create({
      bundleId: bundle.id,
      name: bundle.name,
      description: bundle.description,
      bannerUrl: bundle.bannerUrl,
      isPremium: bundle.isPremium,
      workouts,
      createdAt: bundle.createdAt,
    })

    return bundleWithWorkouts
  }

  async create(bundle: Bundle): Promise<void> {
    this.items.push(bundle)
  }
}
