import { CustomersRafflesRepository } from '@/adapters/repositories/customers-raffles-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { UnauthorizedError } from '@/core/errors/unauthorized-error'
import { CustomerRaffleTicket } from '@/entities/value-objects/customer-raffle-ticket'

interface GetCustomerRaffleTicketUseCaseRequest {
  customerId: string
  ticketId: string
}

interface GetCustomerRaffleTicketUseCaseResponse {
  ticket: CustomerRaffleTicket
}

export class GetCustomerRaffleTicketUseCase {
  constructor(private customerRafflesRepository: CustomersRafflesRepository) {}

  async execute({
    customerId,
    ticketId,
  }: GetCustomerRaffleTicketUseCaseRequest): Promise<GetCustomerRaffleTicketUseCaseResponse> {
    const ticket =
      await this.customerRafflesRepository.findByIdWithDetails(ticketId)

    if (!ticket) {
      throw new ResourceNotFoundError(ticketId)
    }

    if (ticket.customerId.toString() !== customerId) {
      throw new UnauthorizedError()
    }

    return {
      ticket,
    }
  }
}
