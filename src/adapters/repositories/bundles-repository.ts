import { Bundle } from '@/entities/bundle'

export interface BundlesRepository {
  findById(id: string): Promise<Bundle | null>

  create(bundle: Bundle): Promise<void>
}
