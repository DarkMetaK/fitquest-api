import { FetchAvailableRafflesUseCase } from '@/use-cases/fetch-available-raffles'

import { PrismaRafflesRepository } from '../../repositories/prisma-raffles-repository'

export class makeFetchAvailableRafflesUseCase {
  static create(): FetchAvailableRafflesUseCase {
    const rafflesRepository = new PrismaRafflesRepository()

    const fetchAvailableRafflesUseCase = new FetchAvailableRafflesUseCase(
      rafflesRepository,
    )

    return fetchAvailableRafflesUseCase
  }
}
