import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Bundle, BundleProps } from '@/entities/bundle'

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
