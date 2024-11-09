import { RafflesRepository } from '@/adapters/repositories/raffles-repository'
import { Raffle } from '@/entities/raffle'
import { prisma } from '@/infra/libs/prisma'

import { PrismaRaffleMapper } from '../mappers/prisma-raffle-mapper'

export class PrismaRafflesRepository implements RafflesRepository {
  async findById(id: string): Promise<Raffle | null> {
    const raffle = await prisma.raffle.findUnique({
      where: {
        id,
      },
    })

    if (!raffle) {
      return null
    }

    return PrismaRaffleMapper.toDomain(raffle)
  }

  async findManyNotExpired(): Promise<Raffle[]> {
    const raffles = await prisma.raffle.findMany({
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    return raffles.map(PrismaRaffleMapper.toDomain)
  }

  async create(raffle: Raffle): Promise<void> {
    const data = PrismaRaffleMapper.toPrisma(raffle)

    await prisma.raffle.create({
      data,
    })
  }
}
