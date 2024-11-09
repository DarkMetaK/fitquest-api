import { CustomerRaffle as PrismaCustomerRaffle, Prisma } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerRaffle } from '@/entities/customer-raffle'

export class PrismaCustomerRaffleMapper {
  static toDomain(raw: PrismaCustomerRaffle): CustomerRaffle {
    const raffle = CustomerRaffle.create(
      {
        customerId: new UniqueEntityId(raw.customerId),
        raffleId: new UniqueEntityId(raw.raffleId),
        hasWon: raw.hasWon,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )

    return raffle
  }

  static toPrisma(
    ticket: CustomerRaffle,
  ): Prisma.CustomerRaffleUncheckedCreateInput {
    return {
      id: ticket.id.toString(),
      customerId: ticket.customerId.toString(),
      raffleId: ticket.raffleId.toString(),
      hasWon: ticket.hasWon,
      createdAt: ticket.createdAt,
    }
  }
}
