import { Prisma, Raffle as PrismaRaffle } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Raffle } from '@/entities/raffle'

export class PrismaRaffleMapper {
  static toDomain(raw: PrismaRaffle): Raffle {
    const raffle = Raffle.create(
      {
        name: raw.name,
        bannerUrl: raw.bannerUrl,
        isPremium: raw.isPremium,
        price: raw.price,
        expiresAt: raw.expiresAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )

    return raffle
  }

  static toPrisma(raffle: Raffle): Prisma.RaffleUncheckedCreateInput {
    return {
      id: raffle.id.toString(),
      name: raffle.name,
      bannerUrl: raffle.bannerUrl,
      isPremium: raffle.isPremium,
      price: raffle.price,
      expiresAt: raffle.expiresAt,
      createdAt: raffle.createdAt,
    }
  }
}
