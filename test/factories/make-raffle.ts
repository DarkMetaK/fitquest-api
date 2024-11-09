import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Raffle, RaffleProps } from '@/entities/raffle'

export function makeRaffle(
  override: Partial<RaffleProps> = {},
  id?: UniqueEntityId,
) {
  const raffle = Raffle.create(
    {
      name: faker.person.fullName(),
      bannerUrl: faker.image.url(),
      isPremium: false,
      price: faker.number.int({ min: 1, max: 1000 }),
      expiresAt: faker.date.future(),
      ...override,
    },
    id,
  )

  return raffle
}
