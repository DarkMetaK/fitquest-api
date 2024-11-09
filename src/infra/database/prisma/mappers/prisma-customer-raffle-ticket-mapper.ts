import { CustomerRaffle, Raffle } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerRaffleTicket } from '@/entities/value-objects/customer-raffle-ticket'

type PrismaCustomerRaffleDetails = CustomerRaffle & {
  raffle: Raffle
}

export class PrismaCustomerRaffleTicketMapper {
  static toDomain(raw: PrismaCustomerRaffleDetails): CustomerRaffleTicket {
    const ticket = CustomerRaffleTicket.create({
      ticketId: new UniqueEntityId(raw.id),
      customerId: new UniqueEntityId(raw.customerId),
      raffleId: new UniqueEntityId(raw.raffleId),
      name: raw.raffle.name,
      bannerUrl: raw.raffle.bannerUrl,
      price: raw.raffle.price,
      isPremium: raw.raffle.isPremium,
      expiresAt: raw.raffle.expiresAt,
      hasWon: raw.hasWon,
      createdAt: raw.createdAt,
    })

    return ticket
  }

  // static toPrisma(ticket: CustomerRaffleTicket): PrismaCustomerRaffleDetails {
  //   return {
  //     id: ticket.ticketId.toString(),
  //     customerId: ticket.customerId.toString(),
  //     raffleId: ticket.raffleId.toString(),
  //     hasWon: ticket.hasWon ?? null,
  //     createdAt: ticket.createdAt,
  //     raffle: {
  //       id: ticket.raffleId.toString(),
  //       name: ticket.name,
  //       bannerUrl: ticket.bannerUrl,
  //       price: ticket.price,
  //       isPremium: ticket.isPremium,
  //       expiresAt: ticket.expiresAt,
  //     },
  //   }
  // }
}
