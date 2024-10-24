import { Bundle, Prisma } from '@prisma/client'

import { Pagination, PaginationResponse } from '@/types/pagination'

export interface BundlesRepository {
  findById(id: string): Promise<Bundle | null>
  findMany(params: Pagination<Bundle>): Promise<PaginationResponse<Bundle>>
  create(data: Prisma.BundleCreateInput): Promise<Bundle>
}
