import { makeBundle } from 'test/factories/make-bundle'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { BundleProps } from '@/entities/bundle'
import { PrismaBundleMapper } from '@/infra/database/prisma/mappers/prisma-bundle-mapper'
import { prisma } from '@/infra/libs/prisma'

export async function makePrismaBundle(
  data: Partial<BundleProps> = {},
  id?: UniqueEntityId,
) {
  const bundle = makeBundle(data, id)

  const prismaBundle = await prisma.bundle.create({
    data: PrismaBundleMapper.toPrisma(bundle),
  })

  return prismaBundle
}
