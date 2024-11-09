import { Raffle } from '@/entities/raffle'

export class RafflePresenter {
  static toHTTP(raffle: Raffle) {
    return {
      id: raffle.id.toString(),
      name: raffle.name,
      bannerUrl: raffle.bannerUrl,
      price: raffle.price,
      isPremium: raffle.isPremium,
      expiresAt: raffle.expiresAt,
      createdAt: raffle.createdAt,
    }
  }
}
