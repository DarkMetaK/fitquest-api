import { randomUUID } from 'node:crypto'

import { Bundle, Prisma } from '@prisma/client'

import { Pagination, PaginationResponse } from '@/types/pagination'

import { BundlesRepository } from '../bundles-repository'

export class InMemoryBundlesRepository implements BundlesRepository {
  public items: Bundle[] = []

  async findMany({
    page,
    perPage,
    orderBy,
  }: Pagination<Bundle>): Promise<PaginationResponse<Bundle>> {
    const total = this.items.length
    let sortedItems = [...this.items]

    if (orderBy) {
      sortedItems = this.items.sort((a, b) => {
        for (const key in orderBy) {
          const typedKey = key as keyof Bundle

          if (orderBy[typedKey] === 'asc') {
            if (a[typedKey] < b[typedKey]) return -1
            if (a[typedKey] > b[typedKey]) return 1
          } else if (orderBy[typedKey] === 'desc') {
            if (a[typedKey] > b[typedKey]) return -1
            if (a[typedKey] < b[typedKey]) return 1
          }
        }
        return 0
      })
    }

    const bundles = sortedItems.slice((page - 1) * perPage, page * perPage)

    return {
      page,
      perPage,
      total,
      data: bundles,
    }
  }

  async create(data: Prisma.BundleCreateInput): Promise<Bundle> {
    const bundle: Bundle = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      bannerUrl: data.bannerUrl,
      price: data.price,
      isPremium: data.isPremium || false,
      createdAt: new Date(),
    }

    this.items.push(bundle)

    return bundle
  }
}
