import { BundlesRepository } from '@/adapters/repositories/bundles-repository'
import { Bundle } from '@/entities/bundle'
import { prisma } from '@/infra/libs/prisma'

import { PrismaBundleMapper } from '../mappers/prisma-bundle-mapper'

export class PrismaBundlesRepository implements BundlesRepository {
  async findById(id: string): Promise<Bundle | null> {
    const bundle = await prisma.bundle.findUnique({
      where: {
        id,
      },
      include: {
        workouts: {
          include: {
            steps: true,
          },
        },
      },
    })

    if (!bundle) {
      return null
    }

    return PrismaBundleMapper.toDomain(bundle)
  }

  async findAll(): Promise<Bundle[]> {
    const bundles = await prisma.bundle.findMany({
      include: {
        workouts: {
          include: {
            steps: true,
          },
        },
      },
    })

    return bundles.map(PrismaBundleMapper.toDomain)
  }

  async create(bundle: Bundle): Promise<void> {
    const data = PrismaBundleMapper.toPrisma(bundle)

    await prisma.bundle.create({
      data,
    })
  }
}
