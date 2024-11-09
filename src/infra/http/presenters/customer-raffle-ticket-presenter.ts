import { CustomerRaffleTicket } from '@/entities/value-objects/customer-raffle-ticket'

export class CustomerRaffleTicketPresenter {
  static toHTTP(ticket: CustomerRaffleTicket) {
    return {
      id: ticket.raffleId.toString(),
      raffleId: ticket.raffleId.toString(),
      hasWon: ticket.hasWon,
      name: ticket.name,
      bannerUrl: ticket.bannerUrl,
      price: ticket.price,
      isPremium: ticket.isPremium,
      expiresAt: ticket.expiresAt,
      purchasedAt: ticket.createdAt,
    }
  }
}
