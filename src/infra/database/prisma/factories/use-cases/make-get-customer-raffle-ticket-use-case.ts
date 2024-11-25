import { GetCustomerRaffleTicketUseCase } from '@/use-cases/get-customer-raffle-ticket'

import { PrismaCustomersRafflesRepository } from '../../repositories/prisma-customers-raffles-repository'

export class makeGetCustomerRaffleTicketUseCase {
  static create(): GetCustomerRaffleTicketUseCase {
    const customersRafflesRepository = new PrismaCustomersRafflesRepository()

    const getCustomerRaffleTicketUseCase = new GetCustomerRaffleTicketUseCase(
      customersRafflesRepository,
    )

    return getCustomerRaffleTicketUseCase
  }
}
