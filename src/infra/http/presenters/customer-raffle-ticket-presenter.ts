import { CustomerRaffleTicket } from '@/entities/value-objects/customer-raffle-ticket'

export class CustomerRaffleTicketPresenter {
  static toHTTP(ticket: CustomerRaffleTicket) {
    return {
      id: ticket.ticketId.toString(),
      raffleId: ticket.raffleId.toString(),
      hasWon: ticket.hasWon,
      name: ticket.name,
      description: ticket.description,
      bannerUrl: ticket.bannerUrl,
      price: ticket.price,
      isPremium: ticket.isPremium,
      expiresAt: ticket.expiresAt,
      purchasedAt: ticket.createdAt,
    }
  }
}
