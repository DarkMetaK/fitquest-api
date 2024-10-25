import { faker } from '@faker-js/faker'
import { hashSync } from 'bcryptjs'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Customer, CustomerProps } from '@/entities/customer'

export function makeCustomer(
  override: Partial<CustomerProps> = {},
  id?: UniqueEntityId,
) {
  const customer = Customer.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      passwordHash: hashSync(faker.internet.password(), 6),
      ...override,
    },
    id,
  )

  return customer
}
