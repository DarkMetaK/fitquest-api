import { CustomersRafflesRepository } from '@/adapters/repositories/customers-raffles-repository'
import { RafflesRepository } from '@/adapters/repositories/raffles-repository'
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
  constructor(
    private rafflesRepository: RafflesRepository,
    private customerRafflesRepository: CustomersRafflesRepository,
  ) {}

  async execute({
    customerId,
    ticketId,
  }: GetCustomerRaffleTicketUseCaseRequest): Promise<GetCustomerRaffleTicketUseCaseResponse> {
    const customerRaffle =
      await this.customerRafflesRepository.findById(ticketId)

    if (!customerRaffle) {
      throw new ResourceNotFoundError(ticketId)
    }

    if (customerRaffle.customerId.toString() !== customerId) {
      throw new UnauthorizedError()
    }

    const raffle = await this.rafflesRepository.findById(
      customerRaffle.raffleId.toString(),
    )

    if (!raffle) {
      throw new ResourceNotFoundError(customerRaffle.raffleId.toString())
    }

    const ticket = CustomerRaffleTicket.create({
      ticketId: customerRaffle.id,
      customerId: customerRaffle.customerId,
      raffleId: customerRaffle.raffleId,
      name: raffle.name,
      bannerUrl: raffle.bannerUrl,
      price: raffle.price,
      isPremium: raffle.isPremium,
      expiresAt: raffle.expiresAt,
      hasWon: customerRaffle.hasWon,
      createdAt: customerRaffle.createdAt,
    })

    return {
      ticket,
    }
  }
}
