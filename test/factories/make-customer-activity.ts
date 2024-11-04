import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  CustomerActivity,
  CustomerActivityProps,
} from '@/entities/customer-activity'

export function makeCustomerActivity(
  override: Partial<CustomerActivityProps> = {},
  id?: UniqueEntityId,
) {
  const activity = CustomerActivity.create(
    {
      customerId: new UniqueEntityId(faker.string.uuid()),
      activityType: faker.helpers.arrayElement(['STREAK', 'REST', 'INACTIVE']),
      date: new Date(),
      ...override,
    },
    id,
  )

  return activity
}
