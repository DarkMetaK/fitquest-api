import dayjs from 'dayjs'

import { CustomersRafflesRepository } from '@/adapters/repositories/customers-raffles-repository'
import { CustomersRepository } from '@/adapters/repositories/customers-repository'
import { RafflesRepository } from '@/adapters/repositories/raffles-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ExpiredRaffleError } from '@/core/errors/expired-raffle-error'
import { InsufficientBalanceError } from '@/core/errors/insufficient-balance-error'
import { MaxTicketsReachedError } from '@/core/errors/max-tickets-reached-error'
import { PremiumRequiredError } from '@/core/errors/premium-required-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { CustomerRaffle } from '@/entities/customer-raffle'

interface PurchaseRaffleTicketsUseCaseRequest {
  customerId: string
  raffleId: string
  amount?: number
}

interface PurchaseRaffleTicketsUseCaseResponse {
  tickets: CustomerRaffle[]
}

export class PurchaseRaffleTicketsUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private rafflesRepository: RafflesRepository,
    private customerRafflesRepository: CustomersRafflesRepository,
  ) {}

  async execute({
    customerId,
    raffleId,
    amount = 1,
  }: PurchaseRaffleTicketsUseCaseRequest): Promise<PurchaseRaffleTicketsUseCaseResponse> {
    const customer =
      await this.customersRepository.findByIdWithMetadata(customerId)

    if (!customer) {
      throw new ResourceNotFoundError(customerId)
    }

    const raffle = await this.rafflesRepository.findById(raffleId)

    if (!raffle) {
      throw new ResourceNotFoundError(raffleId)
    }

    const customerHasPremiumMembership =
      customer.premiumExpiresAt &&
      dayjs(customer.premiumExpiresAt).isAfter(dayjs())

    if (!customerHasPremiumMembership && raffle.isPremium) {
      throw new PremiumRequiredError()
    }

    const previousTickets =
      await this.customerRafflesRepository.findManyByCustomerIdAndRaffleId(
        customerId,
        raffleId,
      )

    if (
      !customerHasPremiumMembership &&
      previousTickets.length >= raffle.freeTierQuota
    ) {
      throw new MaxTicketsReachedError()
    }

    const totalPrice = raffle.price * amount
    const hasEnoughBalance = customer.currencyAmount >= totalPrice

    if (dayjs(raffle.expiresAt).isBefore(dayjs())) {
      throw new ExpiredRaffleError()
    }

    if (!hasEnoughBalance) {
      throw new InsufficientBalanceError()
    }

    customer.currencyAmount -= totalPrice

    const tickets: CustomerRaffle[] = []

    for (let i = 0; i < amount; i++) {
      const ticket = CustomerRaffle.create({
        customerId: new UniqueEntityId(customer.customerId),
        raffleId: raffle.id,
        hasWon: null,
      })

      tickets.push(ticket)
    }

    await this.customerRafflesRepository.createMany(tickets)

    await this.customersRepository.update(customer)

    return {
      tickets,
    }
  }
}
