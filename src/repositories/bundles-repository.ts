import { Bundle, Prisma } from '@prisma/client'

import { Pagination, PaginationResponse } from '@/types/pagination'

export interface BundlesRepository {
  findMany(params: Pagination<Bundle>): Promise<PaginationResponse<Bundle>>
  create(data: Prisma.BundleCreateInput): Promise<Bundle>
}
