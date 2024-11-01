import { Bundle } from '@/entities/bundle'
import { BundleWithWorkouts } from '@/entities/value-objects/bundle-with-workouts'

export interface BundlesRepository {
  findById(id: string): Promise<Bundle | null>

  findByIdWithWorkouts(id: string): Promise<BundleWithWorkouts | null>

  create(bundle: Bundle): Promise<void>
}
