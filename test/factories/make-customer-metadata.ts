import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  CustomerMetadata,
  CustomerMetadataProps,
} from '@/entities/customer-metadata'

export function makeCustomerMetadata(
  override: Partial<CustomerMetadataProps> = {},
  id?: UniqueEntityId,
) {
  const customer = CustomerMetadata.create(
    {
      customerId: new UniqueEntityId(faker.string.uuid()),
      age: faker.number.int({ min: 18, max: 100 }),
      height: faker.number.int({ min: 140, max: 220 }),
      weight: faker.number.int({ min: 40, max: 200 }),
      currencyAmount: faker.number.int({ min: 0, max: 1000 }),
      experienceAmount: faker.number.int({ min: 0, max: 1000 }),
      goal: faker.helpers.arrayElement([
        'LOSE_WEIGHT',
        'GAIN_MUSCLE_MASS',
        'ENHANCE_HEALTH',
        'INCREASE_FLEXIBILITY',
      ]),
      weeklyStreakGoal: faker.number.int({ min: 1, max: 7 }),
      phone: faker.phone.number(),
      ...override,
    },
    id,
  )

  return customer
}
