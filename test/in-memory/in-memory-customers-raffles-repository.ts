import { CustomersRafflesRepository } from '@/adapters/repositories/customers-raffles-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerRaffle } from '@/entities/customer-raffle'
import { CustomerRaffleTicket } from '@/entities/value-objects/customer-raffle-ticket'

import { InMemoryRafflesRepository } from './in-memory-raffles-repository'

export class InMemoryCustomersRafflesRepository
  implements CustomersRafflesRepository
{
  public items: CustomerRaffle[] = []

  constructor(private rafflesRepository: InMemoryRafflesRepository) {}

  async findById(id: string): Promise<CustomerRaffle | null> {
    const ticket = this.items.find((ticket) =>
      ticket.id.equals(new UniqueEntityId(id)),
    )

    if (!ticket) {
      return null
    }

    return ticket
  }

  async findByIdWithDetails(id: string): Promise<CustomerRaffleTicket | null> {
    const ticket = this.items.find((ticket) =>
      ticket.id.equals(new UniqueEntityId(id)),
    )

    if (!ticket) {
      return null
    }

    const raffle = this.rafflesRepository.items.find((raffle) =>
      raffle.id.equals(ticket.raffleId),
    )

    if (!raffle) {
      throw new Error('Raffle not found')
    }

    return CustomerRaffleTicket.create({
      ticketId: ticket.id,
      customerId: ticket.customerId,
      raffleId: ticket.raffleId,
      name: raffle.name,
      description: raffle.description,
      bannerUrl: raffle.bannerUrl,
      price: raffle.price,
      isPremium: raffle.isPremium,
      expiresAt: raffle.expiresAt,
      hasWon: ticket.hasWon,
      createdAt: ticket.createdAt,
    })
  }

  async findManyByCustomerId(customerId: string): Promise<CustomerRaffle[]> {
    const tickets = this.items.filter((ticket) =>
      ticket.customerId.equals(new UniqueEntityId(customerId)),
    )

    return tickets
  }

  async findManyByCustomerIdWithDetails(
    customerId: string,
    raffleId?: string,
  ): Promise<CustomerRaffleTicket[]> {
    const customerRaffles = this.items.filter((ticket) =>
      raffleId
        ? ticket.customerId.equals(new UniqueEntityId(customerId)) &&
          ticket.raffleId.equals(new UniqueEntityId(raffleId))
        : ticket.customerId.equals(new UniqueEntityId(customerId)),
    )

    const tickets = customerRaffles.map((item) => {
      const raffle = this.rafflesRepository.items.find((raffle) =>
        raffle.id.equals(item.raffleId),
      )

      if (!raffle) {
        throw new Error('Raffle not found')
      }

      return CustomerRaffleTicket.create({
        ticketId: item.id,
        customerId: item.customerId,
        raffleId: item.raffleId,
        name: raffle.name,
        description: raffle.description,
        bannerUrl: raffle.bannerUrl,
        price: raffle.price,
        isPremium: raffle.isPremium,
        expiresAt: raffle.expiresAt,
        hasWon: item.hasWon,
        createdAt: item.createdAt,
      })
    })

    return tickets
  }

  async findManyByCustomerIdAndRaffleId(
    customerId: string,
    raffleId: string,
  ): Promise<CustomerRaffle[]> {
    const tickets = this.items.filter(
      (ticket) =>
        ticket.customerId.equals(new UniqueEntityId(customerId)) &&
        ticket.raffleId.equals(new UniqueEntityId(raffleId)),
    )

    return tickets
  }

  async create(customerRaffle: CustomerRaffle): Promise<void> {
    this.items.push(customerRaffle)
  }

  async createMany(
    customerRaffles: CustomerRaffle[],
  ): Promise<CustomerRaffleTicket[]> {
    this.items.push(...customerRaffles)

    const tickets = customerRaffles.map((item) => {
      const raffle = this.rafflesRepository.items.find((raffle) =>
        raffle.id.equals(item.raffleId),
      )

      if (!raffle) {
        throw new Error('Raffle not found')
      }

      return CustomerRaffleTicket.create({
        ticketId: item.id,
        customerId: item.customerId,
        raffleId: item.raffleId,
        name: raffle.name,
        description: raffle.description,
        bannerUrl: raffle.bannerUrl,
        price: raffle.price,
        isPremium: raffle.isPremium,
        expiresAt: raffle.expiresAt,
        hasWon: item.hasWon,
        createdAt: item.createdAt,
      })
    })

    return tickets
  }
}
