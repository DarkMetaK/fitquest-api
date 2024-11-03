import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Bundle, BundleProps } from '@/entities/bundle'
import { PrismaBundleMapper } from '@/infra/database/prisma/mappers/prisma-bundle-mapper'
import { prisma } from '@/infra/libs/prisma'

export function makeBundle(
  override: Partial<BundleProps> = {},
  id?: UniqueEntityId,
) {
  const bundle = Bundle.create(
    {
      name: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      bannerUrl: faker.image.url(),
      isPremium: false,
      ...override,
    },
    id,
  )

  return bundle
}

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
