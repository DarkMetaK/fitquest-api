import { PurchaseRaffleTicketsUseCase } from '@/use-cases/purchase-raffle-tickets'

import { PrismaCustomersRafflesRepository } from '../../repositories/prisma-customers-raffles-repository'
import { PrismaCustomersRepository } from '../../repositories/prisma-customers-repository'
import { PrismaRafflesRepository } from '../../repositories/prisma-raffles-repository'

export class makePurchaseRaffleTicketsUseCase {
  static create(): PurchaseRaffleTicketsUseCase {
    const customersRepository = new PrismaCustomersRepository()
    const rafflesRepository = new PrismaRafflesRepository()
    const customersRafflesRepository = new PrismaCustomersRafflesRepository()

    const purchaseRaffleTicketsUseCase = new PurchaseRaffleTicketsUseCase(
      customersRepository,
      rafflesRepository,
      customersRafflesRepository,
    )

    return purchaseRaffleTicketsUseCase
  }
}
