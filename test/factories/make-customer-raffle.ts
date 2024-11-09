import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerRaffle, CustomerRaffleProps } from '@/entities/customer-raffle'

export function makeCustomerRaffle(
  override: Partial<CustomerRaffleProps> = {},
  id?: UniqueEntityId,
) {
  const ticket = CustomerRaffle.create(
    {
      customerId: new UniqueEntityId(faker.string.uuid()),
      raffleId: new UniqueEntityId(faker.string.uuid()),
      hasWon: null,
      ...override,
    },
    id,
  )

  return ticket
}
