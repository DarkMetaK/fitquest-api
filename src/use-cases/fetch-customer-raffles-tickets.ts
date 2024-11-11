import { CustomersRafflesRepository } from '@/adapters/repositories/customers-raffles-repository'
import { CustomerRaffleTicket } from '@/entities/value-objects/customer-raffle-ticket'

interface FetchCustomerRafflesTicketsUseCaseRequest {
  customerId: string
  raffleId?: string
}

interface FetchCustomerRafflesTicketsUseCaseResponse {
  tickets: CustomerRaffleTicket[]
}

export class FetchCustomerRafflesTicketsUseCase {
  constructor(private customerRafflesRepository: CustomersRafflesRepository) {}

  async execute({
    customerId,
    raffleId,
  }: FetchCustomerRafflesTicketsUseCaseRequest): Promise<FetchCustomerRafflesTicketsUseCaseResponse> {
    const tickets =
      await this.customerRafflesRepository.findManyByCustomerIdWithDetails(
        customerId,
        raffleId,
      )

    return {
      tickets,
    }
  }
}
