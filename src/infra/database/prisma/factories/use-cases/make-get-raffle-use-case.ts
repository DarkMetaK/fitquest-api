import { GetRaffleUseCase } from '@/use-cases/get-raffle'

import { PrismaRafflesRepository } from '../../repositories/prisma-raffles-repository'

export class makeGetRaffleUseCase {
  static create(): GetRaffleUseCase {
    const rafflesRepository = new PrismaRafflesRepository()

    const getRaffleUseCase = new GetRaffleUseCase(rafflesRepository)

    return getRaffleUseCase
  }
}
