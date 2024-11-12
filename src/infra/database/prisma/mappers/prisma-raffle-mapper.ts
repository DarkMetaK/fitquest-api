import { Prisma, Raffle as PrismaRaffle } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Raffle } from '@/entities/raffle'

export class PrismaRaffleMapper {
  static toDomain(raw: PrismaRaffle): Raffle {
    const raffle = Raffle.create(
      {
        name: raw.name,
        description: raw.description,
        bannerUrl: raw.bannerUrl,
        isPremium: raw.isPremium,
        price: raw.price,
        freeTierQuota: raw.freeTierQuota,
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
      description: raffle.description,
      bannerUrl: raffle.bannerUrl,
      isPremium: raffle.isPremium,
      price: raffle.price,
      freeTierQuota: raffle.freeTierQuota,
      expiresAt: raffle.expiresAt,
      createdAt: raffle.createdAt,
    }
  }
}
