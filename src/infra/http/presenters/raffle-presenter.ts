import { Raffle } from '@/entities/raffle'

export class RafflePresenter {
  static toHTTP(raffle: Raffle) {
    return {
      id: raffle.id.toString(),
      name: raffle.name,
      description: raffle.description,
      bannerUrl: raffle.bannerUrl,
      price: raffle.price,
      isPremium: raffle.isPremium,
      freeTierQuota: raffle.freeTierQuota,
      expiresAt: raffle.expiresAt,
      createdAt: raffle.createdAt,
    }
  }
}
