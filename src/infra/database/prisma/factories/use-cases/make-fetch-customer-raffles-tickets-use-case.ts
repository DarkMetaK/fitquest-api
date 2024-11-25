import { FetchCustomerRafflesTicketsUseCase } from '@/use-cases/fetch-customer-raffles-tickets'

import { PrismaCustomersRafflesRepository } from '../../repositories/prisma-customers-raffles-repository'

export class makeFetchCustomerRafflesTicketsUseCase {
  static create(): FetchCustomerRafflesTicketsUseCase {
    const customersRafflesRepository = new PrismaCustomersRafflesRepository()

    const fetchCustomerRafflesTicketsUseCase =
      new FetchCustomerRafflesTicketsUseCase(customersRafflesRepository)

    return fetchCustomerRafflesTicketsUseCase
  }
}
