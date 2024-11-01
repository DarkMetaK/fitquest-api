import { Bundle } from '@/entities/bundle'

export interface BundlesRepository {
  findById(id: string): Promise<Bundle | null>

  findAll(): Promise<Bundle[]>

  create(bundle: Bundle): Promise<void>
}
